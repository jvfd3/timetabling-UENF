import { allLocalJsonData } from "../../DB/dataFromJSON";

function getPeriodoEsperado(codigoDisciplina) {
  let disciplina = allLocalJsonData.static.infoDisciplinasCC.find(
    (disciplina) => disciplina.codigo === codigoDisciplina
  );
  return disciplina.periodo;
}

function getNomeDisciplina(codigoDisciplina) {
  let disciplina = allLocalJsonData.static.infoDisciplinasCC.find(
    (disciplina) => disciplina.codigo === codigoDisciplina
  );
  return disciplina.nome;
}

function getApelidoDisciplina(codigoDisciplina) {
  let disciplina = allLocalJsonData.static.infoDisciplinasCC.find(
    (disciplina) => disciplina.codigo === codigoDisciplina
  );
  return disciplina.apelido;
}

function getApelidoProfessor(nomeProfessor) {
  let professor = allLocalJsonData.static.infoProfessores.find(
    (professor) => professor.nome === nomeProfessor
  );
  return professor.apelido;
}

function getTurmasDoAnoSemestre(turmas, ano, semestre) {
  let turmasDoAnoSemestre = turmas.filter((turma) => {
    return turma.ano === ano && turma.semestre === semestre;
  });
  return turmasDoAnoSemestre;
}

function getTurmasDaHora(turmas, hora) {
  /* Turmas splitted */
  let turmasDaHora = turmas.filter((turma) => {
    return turma.horaInicio === hora;
  });
  return turmasDaHora;
}

function getTurmasDoDia(turmas, dia) {
  /* Turmas splitted */
  let turmasDoDia = turmas.filter((turma) => {
    return turma.dia === dia;
  });
  return turmasDoDia;
}

export {
  getPeriodoEsperado,
  getNomeDisciplina,
  getApelidoDisciplina,
  getApelidoProfessor,
  getTurmasDoAnoSemestre,
  getTurmasDaHora,
  getTurmasDoDia,
};
