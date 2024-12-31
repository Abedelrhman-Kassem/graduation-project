import express from "express";
import Students from "../models/Students.js";
import bcrypt from "bcrypt";
import validateFields from "../helper/validateFields.js";

const router = express.Router();

router.post(
  "/",
  validateFields(["username", "password", "code"]),
  async (req, res) => {
    try {
      const { username, password, code } = req.body;

      const existingStudent = await Students.findOne({
        where: {
          code,
        },
      });

      if (existingStudent) {
        return res.status(400).json({
          error: "Code is already in use.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const student = await Students.create({
        username,
        password: hashedPassword,
        code,
      });

      res.status(201).json({
        id: student.id,
        username: student.username,
        code: student.code,
        pretestTotalResult: student.pretestTotalResult,
      });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({
        error: "An error occurred during signup.",
      });
    }
  }
);

export default router;
