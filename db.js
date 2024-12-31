import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "railway",
  "postgres",
  "TAIhHEGOwyPcdXiiCdzTAhbxXzHJCxVq",

  {
    host: "postgres.railway.internal",
    dialect: "postgres",
    port: "5432",
  }
);

export default sequelize;
