import { DataTypes } from "sequelize";
import sequelize from "../db.js";
const StudentPretestAnswers = sequelize.define(
  "StudentPretestAnswers",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      field: "student_id",
      references: {
        model: "students",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    questionId: {
      type: DataTypes.INTEGER,
      field: "question_id",
      references: {
        model: "pretest_questions",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    answerId: {
      type: DataTypes.INTEGER,
      field: "answer_id",
      references: {
        model: "pretest_answers",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
    tableName: "student_pretest_answers",
  }
);

export default StudentPretestAnswers;
