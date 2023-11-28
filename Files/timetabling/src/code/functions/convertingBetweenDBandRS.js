import {
  getNomesDasDisciplinas,
  // getCodigoNomeDisciplinas,
} from "../functions/getListaDisciplinas";

function professorRStoDB(professorRS) {
  let formattedProfessor = {
    laboratorio: professorRS.label,
    curso: professorRS.curso,
    nome: professorRS.value,
    disciplinas: professorRS.disciplinas.map((disciplina) => disciplina.value),
  };
  return formattedProfessor;
}

function professorDBtoRS(professorDB) {
  let formattedProfessor = {
    label: professorDB.laboratorio,
    curso: professorDB.curso,
    value: professorDB.nome,
    disciplinas: getNomesDasDisciplinas(professorDB.disciplinas),
  };
  return formattedProfessor;
}

function disciplinaDBtoRS(disciplina) {
  let disciplinas_RS = {
    value: disciplina.codigo,
    label: disciplina.nome,
    periodo: disciplina.periodo,
    requisitos: getNomesDasDisciplinas(disciplina.codigo_requisitos),
    // codigo_requisitos: disciplina.codigo_requisitos,
  };
  return disciplinas_RS;
}

export { professorRStoDB, professorDBtoRS, disciplinaDBtoRS };
