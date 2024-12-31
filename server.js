import express from "express";
import cors from "cors";
import defineAssociations from "./models/associateModels.js";
import syncTables from "./syncTables.js";

import pg from "pg";

import activitiesRoute from "./routes/activitiesRoute.js";
import loginRoute from "./routes/loginRoute.js";
import moduleRoute from "./routes/moduleRoutes.js";
import pretestRoute from "./routes/PretestRoutes.js";
import signupRoute from "./routes/signupRoute.js";
import students from "./routes/students.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(express.json());

defineAssociations();

syncTables();

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/activities", activitiesRoute);
app.use("/api/login", loginRoute);
app.use("/api/modules", moduleRoute);
app.use("/api/pretest", pretestRoute);
app.use("/api/signup", signupRoute);
app.use("/api/students", students);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
