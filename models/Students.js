import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Students = sequelize.define(
  "Students",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      field: "username",
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password",
    },
    code: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false,
      field: "code",
    },
    pretestTotalResult: {
      type: DataTypes.INTEGER,
      field: "pretest_total_result",
    },
  },
  {
    timestamps: true,
    tableName: "students",
  }
);

export default Students;
