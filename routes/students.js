import express from "express";
import Students from "../models/Students.js";

const router = express.Router();

router.get("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Students.findByPk(studentId, {
      attributes: [
        "id",
        "username",
        "code",
        "pretestTotalResult",
        "createdAt",
        "updatedAt",
      ],
    });
    if (!student) {
      return res.status(404).json({
        error: "Student not found.",
      });
    }

    res.status(200).json({
      student,
    });

    // Format response
  } catch (error) {
    console.error("Error fetching student progress:", error);
    res.status(500).json({
      error: error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await Students.findAll({
      attributes: [
        "id",
        "username",
        "code",
        "pretestTotalResult",
        "createdAt",
        "updatedAt",
      ],
    });

    res.status(200).json({
      students,
    });

    // Format response
  } catch (error) {
    console.error("Error fetching student progress:", error);
    res.status(500).json({
      error: error,
    });
  }
});

export default router;
