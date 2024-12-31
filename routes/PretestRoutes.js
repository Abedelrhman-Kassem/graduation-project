import express from "express";
import PretestQuestions from "../models/PretestQuestions.js";
import PretestAnswers from "../models/PretestAnswers.js";
import Students from "../models/Students.js";
import StudentPretestAnswers from "../models/StudentPretestAnswers.js";
import validateFields from "../helper/validateFields.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const questions = await PretestQuestions.findAll({
      attributes: ["id", "question"],
      include: [
        {
          model: PretestAnswers,
          as: "answers",
          attributes: ["id", "answerText"],
        },
      ],
    });
    res.json(questions);
  } catch (error) {
    console.error("Error fetching pretest questions:", error);
    res.status(500).json({
      error: "An error occurred while fetching pretest questions.",
    });
  }
});

router.post("/", validateFields(["studentId", "answers"]), async (req, res) => {
  try {
    const { studentId, answers } = req.body;

    const student = await Students.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    let totalCorrect = 0;
    const studentPretestAnswers = [];

    for (const answer of answers) {
      const question = await PretestQuestions.findByPk(answer.questionId);
      if (!question)
        return res.status(400).json({
          error: "there is no question with this id " + answer.questionId,
        });

      const pretestAnswer = await PretestAnswers.findByPk(answer.answerId);
      if (!pretestAnswer)
        return res.status(400).json({
          error: "there is no answer with this id " + answer.answerId,
        });

      if (pretestAnswer.isCorrect) totalCorrect += 1;

      studentPretestAnswers.push({
        studentId,
        questionId: answer.questionId,
        answerId: answer.answerId,
      });
    }

    if (studentPretestAnswers.length > 0) {
      await StudentPretestAnswers.bulkCreate(studentPretestAnswers);
    }

    student.pretestTotalResult = totalCorrect;
    await student.save();

    res.json({
      success: true,
      totalCorrect,
    });
  } catch (error) {
    console.error("Error submitting pretest answers:", error);
    res.status(500).json({
      error: "An error occurred while submitting pretest answers.",
    });
  }
});

router.post(
  "/createQuestions",
  validateFields(["question", "answers"]), // Middleware to validate required fields
  async (req, res) => {
    try {
      const { question, answers } = req.body;

      // Validate at least one answer is provided
      if (!Array.isArray(answers) || answers.length === 0) {
        return res.status(400).json({
          error: "At least one answer must be provided.",
        });
      }

      // Validate that at least one answer is marked as correct
      const hasCorrectAnswer = answers.some(
        (answer) => answer.isCorrect === true
      );
      if (!hasCorrectAnswer) {
        return res.status(400).json({
          error: "At least one answer must be marked as correct.",
        });
      }

      // Create the question
      const pretestQuestion = await PretestQuestions.create({ question });

      // Create the answers
      const pretestAnswers = answers.map((answer) => ({
        questionId: pretestQuestion.id,
        answerText: answer.answerText,
        isCorrect: answer.isCorrect,
      }));
      await PretestAnswers.bulkCreate(pretestAnswers);

      res.status(201).json({
        success: true,
        message: "Pretest question and answers created successfully.",
        question: pretestQuestion,
        answers: pretestAnswers,
      });
    } catch (error) {
      console.error("Error creating pretest question and answers:", error);
      res.status(500).json({
        error: "An error occurred while creating the pretest question.",
      });
    }
  }
);

export default router;
