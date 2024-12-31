import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Activities = sequelize.define(
  "Activities",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    moduleId: {
      type: DataTypes.INTEGER,
      field: "module_id",
      references: {
        model: "modules",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.TEXT,
      field: "title",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "description",
    },
    summaryGuidance: {
      type: DataTypes.TEXT,
      field: "summary_guidance",
    },
    activityType: {
      type: DataTypes.ENUM("true_false", "sql_input"),
      allowNull: false,
      field: "activity_type",
    },
    expectedAnswer: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "expected_answer",
    },
  },
  {
    timestamps: true,
    tableName: "activities",
  }
);

export default Activities;
