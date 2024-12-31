import { Sequelize } from "sequelize";

const sequelize = new Sequelize("data_analysis", "postgres", "1", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
