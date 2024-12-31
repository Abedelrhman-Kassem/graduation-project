import { DataTypes } from "sequelize";
import sequelize from "../db.js";
const Modules = sequelize.define(
  "Modules",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "order",
    },
  },
  {
    timestamps: true,
    tableName: "modules",
  }
);

export default Modules;
