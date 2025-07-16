const Aluno = require("./modules/aluno/models/aluno.model");
const Checkin = require("./modules/checkin/models/checkin.model");

// Um Aluno tem muitos Checkins
Aluno.hasMany(Checkin, {
  foreignKey: "alunoId",
  sourceKey: "matricula",
});

// Um Checkin pertence a um Aluno
Checkin.belongsTo(Aluno, {
  foreignKey: "alunoId",
  targetKey: "matricula",
});
