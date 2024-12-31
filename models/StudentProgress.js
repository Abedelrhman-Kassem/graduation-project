// import { DataTypes } from "sequelize";
// import sequelize from "../db.js";

// const StudentProgress = sequelize.define(
//   "StudentProgress",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     studentId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "students",
//         key: "id",
//       },
//       onDelete: "CASCADE",
//     },
//     moduleId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "modules",
//         key: "id",
//       },
//       onDelete: "CASCADE",
//     },
//     isCompleted: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//   },
//   {
//     timestamps: true,
//     tableName: "student_progress",
//   }
// );

// export default StudentProgress;
