import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const ActivitySubmissions = sequelize.define(
  "ActivitySubmissions",
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
    activityId: {
      type: DataTypes.INTEGER,
      field: "activity_id",
      references: {
        model: "activities",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    studentAnswer: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "student_answer",
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: "is_correct",
    },
    attemptCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "attempt_count",
    },
    hintLevel: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "hint_level",
    },
  },
  {
    timestamps: true,
    tableName: "activity_submissions",
  }
);

export default ActivitySubmissions;
