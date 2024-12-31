import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const DetailedGuidance = sequelize.define(
  "DetailedGuidance",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    key: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "key",
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "value",
    },
  },
  {
    timestamps: true,
    tableName: "detailed_guidance",
  }
);

export default DetailedGuidance;
