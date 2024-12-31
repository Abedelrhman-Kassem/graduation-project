import sequelize from "./db.js";
import PretestQuestions from "./models/PretestQuestions.js";
import StudentPretestAnswers from "./models/StudentPretestAnswers.js";
// import StudentProgress from "./models/StudentProgress.js";
import Activities from "./models/Activities.js";
import PretestAnswers from "./models/PretestAnswers.js";
import ActivitySubmissions from "./models/ActivitySubmissions.js";
import Module from "./models/Module.js";
import Students from "./models/Students.js";
import DetailedGuidance from "./models/DetailedGuidance.js";

export default function syncTables() {
  sequelize.authenticate().then(async () => {
    try {
      await Students.sync();
      await Module.sync();
      await PretestQuestions.sync();
      // await StudentProgress.sync();
      await Activities.sync();
      await PretestAnswers.sync();
      await StudentPretestAnswers.sync();
      await ActivitySubmissions.sync();
      await DetailedGuidance.sync();
    } catch (error) {
      console.error("Failed to synchronize database: ", error);
    }
  });
}
