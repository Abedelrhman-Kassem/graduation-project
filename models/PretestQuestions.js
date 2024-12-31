import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const PretestQuestions = sequelize.define(
  "PretestQuestions",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "question",
    },
  },
  {
    timestamps: true,
    tableName: "pretest_questions",
  }
);

export default PretestQuestions;
