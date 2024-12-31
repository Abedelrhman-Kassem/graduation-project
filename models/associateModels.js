import Students from "./Students.js";
import PretestQuestions from "./PretestQuestions.js";
import Modules from "./Module.js";
import Activities from "./Activities.js";
import StudentPretestAnswers from "./StudentPretestAnswers.js";
import PretestAnswers from "./PretestAnswers.js";
import ActivitySubmission from "./ActivitySubmissions.js";
// import StudentProgress from "./StudentProgress.js";
import DetailedGuidance from "./DetailedGuidance.js";

const defineAssociations = () => {
  Students.hasMany(StudentPretestAnswers, {
    foreignKey: "studentId",
    as: "pretestAnswers",
  });
  StudentPretestAnswers.belongsTo(Students, {
    foreignKey: "studentId",
    as: "student",
  });

  PretestQuestions.hasMany(StudentPretestAnswers, {
    foreignKey: "questionId",
    as: "studentAnswers",
  });
  StudentPretestAnswers.belongsTo(PretestQuestions, {
    foreignKey: "questionId",
    as: "question",
  });

  PretestAnswers.hasMany(StudentPretestAnswers, {
    foreignKey: "answerId",
    as: "studentAnswers",
  });
  StudentPretestAnswers.belongsTo(PretestAnswers, {
    foreignKey: "questionId",
    as: "answer",
  });

  PretestQuestions.hasMany(PretestAnswers, {
    foreignKey: "questionId",
    as: "answers",
  });
  PretestAnswers.belongsTo(PretestQuestions, {
    foreignKey: "questionId",
    as: "question",
  });

  Modules.hasMany(Activities, {
    foreignKey: "moduleId",
    as: "activities",
  });
  Activities.belongsTo(Modules, {
    foreignKey: "moduleId",
    as: "module",
  });

  Activities.hasMany(DetailedGuidance, {
    foreignKey: "activityId",
    as: "detailedGuidance",
  });
  DetailedGuidance.belongsTo(Activities, {
    foreignKey: "activityId",
    as: "activity",
  });

  Activities.hasMany(ActivitySubmission, {
    foreignKey: "activityId",
    as: "submissions",
  });
  ActivitySubmission.belongsTo(Activities, {
    foreignKey: "activityId",
    as: "activity",
  });

  Students.hasMany(ActivitySubmission, {
    foreignKey: "studentId",
    as: "activitySubmissions",
  });
  ActivitySubmission.belongsTo(Students, {
    foreignKey: "studentId",
    as: "student",
  });

  // Students.belongsToMany(Modules, {
  //   through: StudentProgress,
  //   foreignKey: "studentId",
  //   otherKey: "moduleId",
  //   as: "enrolledModules",
  // });
  // Modules.belongsToMany(Students, {
  //   through: StudentProgress,
  //   foreignKey: "moduleId",
  //   otherKey: "studentId",
  //   as: "students",
  // });

  // StudentProgress.belongsTo(Modules, {
  //   foreignKey: "moduleId",
  //   as: "module",
  // });
  // Modules.hasMany(StudentProgress, {
  //   foreignKey: "moduleId",
  //   as: "progressEntries",
  // });

  // StudentProgress.belongsTo(Students, {
  //   foreignKey: "studentId",
  //   as: "student",
  // });
  // Students.hasMany(StudentProgress, {
  //   foreignKey: "studentId",
  //   as: "progressEntries",
  // });
};

export default defineAssociations;
