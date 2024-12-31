import { DataTypes } from "sequelize";
import sequelize from "../db.js";
const PretestAnswers = sequelize.define(
  "PretestAnswers",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    answerText: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "answer_text",
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "is_correct",
    },
  },
  {
    timestamps: true,
    tableName: "pretest_answers",
  }
);

export default PretestAnswers;
