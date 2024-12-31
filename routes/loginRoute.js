import express from "express";
import Students from "../models/Students.js";
import bcrypt from "bcryptjs";
import validateFields from "../helper/validateFields.js";

const router = express.Router();

router.post("/", validateFields(["code", "password"]), async (req, res) => {
  try {
    const { code, password } = req.body;

    if (isNaN(parseInt(code))) {
      return res.status(400).json({ error: "Code must be a number" });
    }

    const student = await Students.findOne({ where: { code } });
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid code or password.",
      });
    }

    res.status(200).json({
      id: student.id,
      username: student.username,
      code: student.code,
      pretestTotalResult: student.pretestTotalResult,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      error: "An error occurred during login.",
    });
  }
});

export default router;
