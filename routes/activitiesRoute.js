import express from "express";
import Modules from "../models/Module.js";
import Activities from "../models/Activities.js";
import ActivitySubmission from "../models/ActivitySubmissions.js";
import validateFields from "../helper/validateFields.js";
import validateSQLInput from "../helper/validateSql.js";
import DetailedGuidance from "../models/DetailedGuidance.js";

import { Op } from "sequelize";
import Students from "../models/Students.js";

const router = express.Router();

router.get("/moduleId/:moduleId", async (req, res) => {
  try {
    const { moduleId } = req.params;

    const module = await Modules.findByPk(moduleId, {
      include: [
        {
          model: Activities,
          as: "activities",
          include: [
            {
              model: DetailedGuidance,
              as: "detailedGuidance",
              attributes: ["id", "key", "value"],
            },
          ],
        },
      ],
    });

    if (!module) {
      return res.status(404).json({
        error: "Module not found.",
      });
    }

    res.status(200).json({
      module,
    });
  } catch (error) {
    console.error("Error fetching activities with module info:", error);
    res.status(500).json({
      error: "An error occurred while fetching module activities.",
    });
  }
});

router.get("/filter/moduleId/:moduleId", async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { student_id } = req.query; // Expecting student_id to be passed as a query parameter.

    if (!student_id) {
      return res.status(400).json({
        error: "Student ID is required.",
      });
    }

    const module = await Modules.findByPk(moduleId, {
      include: [
        {
          model: Activities,
          as: "activities",
          required: false,
          include: [
            {
              model: ActivitySubmission,
              as: "submissions",
              where: {
                studentId: student_id,
              },
              required: false,
            },
            {
              model: DetailedGuidance,
              as: "detailedGuidance",
              attributes: ["id", "key", "value"],
            },
          ],
        },
      ],
    });

    if (!module) {
      return res.status(404).json({
        error: "Module not found.",
      });
    }

    res.status(200).json({
      module,
    });
  } catch (error) {
    console.error("Error fetching activities with module info:", error);
    res.status(500).json({
      error: "An error occurred while fetching module activities.",
    });
  }
});

router.post(
  "/createActivity",
  validateFields(["moduleId", "description", "activityType", "expectedAnswer"]),
  async (req, res) => {
    try {
      const {
        moduleId,
        description,
        activityType,
        expectedAnswer,
        title,
        summaryGuidance,
        detailedGuidance,
      } = req.body;

      const validActivityTypes = ["true_false", "sql_input"];
      if (!validActivityTypes.includes(activityType)) {
        return res.status(400).json({
          error: `Invalid activity type. Allowed types: ${validActivityTypes.join(
            ", "
          )}`,
        });
      }

      const module = await Modules.findByPk(moduleId);
      if (!module) {
        return res.status(404).json({
          error: "Module not found.",
        });
      }

      let activity;
      let detailed_guidance;

      if (activityType === "sql_input") {
        validateFields(["title", "summaryGuidance", "detailedGuidance"]);

        activity = await Activities.create({
          moduleId,
          title,
          description,
          summaryGuidance,
          activityType,
          expectedAnswer,
        });

        if (Array.isArray(detailedGuidance) && detailedGuidance.length > 0) {
          const guidanceEntries = detailedGuidance.map((guidance) => ({
            activityId: activity.id,
            key: guidance.key,
            value: guidance.value,
          }));

          detailed_guidance = await DetailedGuidance.bulkCreate(
            guidanceEntries
          );
        }
      } else {
        activity = await Activities.create({
          moduleId,
          description,
          activityType,
          expectedAnswer,
        });
      }

      res.status(201).json({
        success: true,
        message: "Activity created successfully.",
        activity,
        detailedGuidance: detailedGuidance ?? [],
      });
    } catch (error) {
      console.error("Error creating activity:", error);
      res.status(500).json({
        error: "An error occurred while creating the activity.",
      });
    }
  }
);

// API for submitting True/False activities
router.post(
  "/moduleId/:moduleId/true_false",
  validateFields(["studentId", "submissions"]),
  async (req, res) => {
    try {
      const { moduleId } = req.params;
      const { studentId, submissions } = req.body;

      const module = await Modules.findByPk(moduleId);
      if (!module) {
        return res.status(404).json({ error: "Module not found." });
      }

      const results = [];

      for (const submission of submissions) {
        const { activityId, studentAnswer } = submission;

        const activity = await Activities.findOne({
          where: { id: activityId, moduleId, activityType: "true_false" },
        });

        if (!activity) {
          results.push({
            activityId,
            success: false,
            error: `True/False activity id ${activityId} not found in the specified module.`,
          });
          continue;
        }

        const isCorrect = studentAnswer === activity.expectedAnswer.toString();

        const newSubmission = await ActivitySubmission.create({
          studentId,
          activityId,
          studentAnswer,
          isCorrect,
        });

        results.push({
          newSubmission,
        });
      }

      res.status(200).json({ results });
    } catch (error) {
      console.error("Error submitting True/False activities:", error);
      res
        .status(500)
        .json({ error: "An error occurred while submitting activities." });
    }
  }
);

// API for submitting SQL Input activities
router.post(
  "/moduleId/:moduleId/sql_input",
  validateFields(["studentId", "activityId", "studentAnswer"]),
  async (req, res) => {
    try {
      const { moduleId } = req.params;
      const { studentId, activityId, studentAnswer, hintLevel } = req.body;

      const student = await Students.findByPk(studentId);
      if (!student) {
        return res.status(404).json({ error: "Student not found." });
      }

      const module = await Modules.findByPk(moduleId);
      if (!module) {
        return res.status(404).json({ error: "Module not found." });
      }

      const activity = await Activities.findOne({
        where: { id: activityId, moduleId, activityType: "sql_input" },
      });

      if (!activity) {
        return res.status(404).json({
          error: "SQL Input activity not found in the specified module.",
        });
      }

      const isCorrect = validateSQLInput(
        studentAnswer,
        activity.expectedAnswer.toString()
      );

      const existingSubmission = await ActivitySubmission.findAll({
        where: { studentId, activityId },
      });

      const attemptCount = existingSubmission.length + 1;

      const newSubmission = await ActivitySubmission.create({
        studentId,
        activityId,
        studentAnswer,
        isCorrect,
        attemptCount,
        hintLevel,
      });

      res.status(200).json(newSubmission);
    } catch (error) {
      console.error("Error submitting SQL Input activity:", error);
      res
        .status(500)
        .json({ error: "An error occurred while submitting the activity." });
    }
  }
);

export default router;
