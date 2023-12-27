/* A ideia é que seja um trocadilho com hourglass */

function createTurma({ ano, semestre, turmas, setTurmas }) {
  let blankHorario = {
    horaInicio: null,
    idHorario: null,
    duracao: 2,
    sala: null,
    dia: null,
    ordem: 1,
  };

  let newTurma = {
    ano: ano,
    semestre: semestre,
    demandaEstimada: null,
    disciplina: null,
    idTurma: null,
    professor: null,
    horarios: [
      { ...blankHorario, ordem: 1 },
      { ...blankHorario, ordem: 2 },
    ],
  };
  let newTurmas = [newTurma, ...turmas];
  setTurmas(newTurmas);
}

function deleteTurma(turmas, setTurmas, turma) {
  let newTurmas = [...turmas];
  let turmaIndex = turmas.indexOf(turma);
  newTurmas.splice(turmaIndex, 1);
  setTurmas(newTurmas);
}

function createHorarioInTurmas(turmas, setTurmas, turma, setTurma) {
  let newTurma = { ...turma };
  let newHorarios = [...newTurma.horarios];
  let blankHorario = {
    horaInicio: null,
    idHorario: null,
    duracao: 2,
    sala: null,
    dia: null,
    ordem: 1,
  };
  newHorarios.push(blankHorario);
  newTurma.horarios = newHorarios;
  setTurma(newTurma);
  insertNewTurmaInTurmas(turmas, setTurmas, newTurma);
}

function insertNewTurmaInTurmas(turmas, setTurmas, turma) {
  let currentId = turma.idTurma;
  let newTurmas = [...turmas];
  newTurmas = newTurmas.map((turmaAtual) => {
    return turmaAtual.idTurma === currentId ? turma : turmaAtual;
  });
  console.log("inTurmas", turmas[0]?.demandaEstimada);
  console.log("inTurma", turma?.demandaEstimada);
  console.log("inTurma", turma);
  console.log("inNewTurmas", newTurmas[0]?.demandaEstimada);
  setTurmas(newTurmas);
}

function createHorario(turma, setTurma) {
  let newTurma = { ...turma };
  let newHorarios = [...newTurma.horarios];
  let blankHorario = {
    sala: null,
    dia: null,
    duracao: 2,
    horaInicio: null,
  };
  newHorarios.push(blankHorario);
  newTurma.horarios = newHorarios;
  setTurma(newTurma);
}

function deleteHorario(turma, setTurma, horaIndex) {
  let newTurma = { ...turma };
  let newHorarios = [...newTurma.horarios];
  newHorarios.splice(horaIndex, 1);
  newTurma.horarios = newHorarios;
  console.log("turma", turma);
  console.log("newTurma", newTurma);
  setTurma(newTurma);
}

export {
  createTurma,
  deleteTurma,
  createHorario,
  deleteHorario,
  createHorarioInTurmas,
  insertNewTurmaInTurmas,
};
