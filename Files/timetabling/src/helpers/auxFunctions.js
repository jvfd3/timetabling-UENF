import { allLocalJsonData } from "../DB/local/dataFromJSON";

function splittedToUnified(splittedTurmas) {
  let arr = splittedTurmas;
  // console.log(arr);
  let result = arr.reduce((acc, {
    ano,
    idTurma,
    semestre,
    NomeProfessor,
    CursoProfessor,
    NomeDisciplina,
    demandaEstimada,
    ApelidoProfessor,
    CodigoDisciplina,
    PeriodoDisciplina,
    ApelidoDisciplina,
    LaboratorioProfessor,
    ...rest
  }) => {
    let key = idTurma;
    if (!acc[key]) {
      acc[key] = {
        ano: ano,
        idTurma: idTurma,
        semestre: semestre,
        NomeProfessor: NomeProfessor,
        CursoProfessor: CursoProfessor,
        NomeDisciplina: NomeDisciplina,
        demandaEstimada: demandaEstimada,
        CodigoDisciplina: CodigoDisciplina,
        ApelidoProfessor: ApelidoProfessor,
        PeriodoDisciplina: PeriodoDisciplina,
        ApelidoDisciplina: ApelidoDisciplina,
        LaboratorioProfessor: LaboratorioProfessor,
        horarios: []
      };
    }
    acc[key].horarios.push(rest);
    return acc;
  }, {});
  return Object.values(result);
}

function max(array) {
  return Math.max.apply(null, array);
}

function getPeriodoEsperado(codigoDisciplina) {

  // let disciplina = allLocalJsonData.static.infoDisciplinasCC.find(
  let disciplina = allLocalJsonData.SQL.disciplinas.find(
    (disciplina) => disciplina.codigo === codigoDisciplina
  );
  return disciplina.periodo;
}

function getNomeDisciplina(codigoDisciplina) {
  // let disciplina = allLocalJsonData.static.infoDisciplinasCC.find(
  let disciplina = allLocalJsonData.SQL.disciplinas.find(
    (disciplina) => disciplina.codigo === codigoDisciplina
  );
  return disciplina.nome;
}

function getApelidoDisciplina(codigoDisciplina) {
  // let disciplina = allLocalJsonData.static.infoDisciplinasCC.find(
  let disciplina = allLocalJsonData.SQL.disciplinas.find(
    (disciplina) => disciplina.codigo === codigoDisciplina
  );
  return disciplina.apelido;
}

function getApelidoProfessor(nomeProfessor) {
  // let professor = allLocalJsonData.static.infoProfessores.find(
  let professor = allLocalJsonData.SQL.professores.find(
    (professor) => professor.nome === nomeProfessor
  );
  return professor.apelido;
}

function getTurmasDoAnoSemestre(turmas, ano, semestre) {
  let turmasDoAnoSemestre = turmas.filter((turma) => {
    return turma.ano === ano.value && turma.semestre === semestre.value;
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

function getNomesDasDisciplinas(listaDeCodigos) {
  let listaDeCodigosNomes = [];
  for (let i = 0; i < listaDeCodigos.length; i++) {
    let codigoDisciplina = listaDeCodigos[i];
    let nomeDisciplina = getNomeDisciplina(codigoDisciplina);
    listaDeCodigosNomes.push({
      codigo: codigoDisciplina,
      nome: nomeDisciplina,
    });
  }
  return listaDeCodigosNomes;
}

function updateProfessorFromList(oldArray, newProfessor) {
  const newArray = oldArray.map((professorAntigo) => {
    return professorAntigo.idprofessor === newProfessor.idprofessor
      ? newProfessor
      : professorAntigo;
  });
  return newArray;
}

export {
  max,
  splittedToUnified,
  getPeriodoEsperado,
  getNomeDisciplina,
  getApelidoDisciplina,
  getNomesDasDisciplinas,
  getApelidoProfessor,
  getTurmasDoAnoSemestre,
  getTurmasDaHora,
  getTurmasDoDia,
  updateProfessorFromList,
};
