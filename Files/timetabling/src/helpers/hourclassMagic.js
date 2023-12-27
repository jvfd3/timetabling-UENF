/* A ideia é que seja um trocadilho com hourglass */

function insertNewTurmaInTurmas(turmas, setTurmas, turma) {
  let currentId = turma.idTurma;
  let newTurmas = turmas.map((turmaAtual) => {
    return turmaAtual.idTurma === currentId ? turma : turmaAtual;
  });
  console.log(newTurmas[0]?.horarios);
  // setTurmas(newTurmas);
}

function createTurma(turmas, setTurmas) {
  let newTurma = {
    nome: null,
    horarios: [
      {
        sala: null,
        dia: null,
        horaInicio: null,
        duracao: 2,
      },
    ],
  };
  let newTurmas = [...turmas, newTurma];
  setTurmas(newTurmas);
}

function deleteTurma(turmas, setTurmas, turma) {
  let newTurmas = [...turmas];
  let turmaIndex = turmas.indexOf(turma);
  newTurmas.splice(turmaIndex, 1);
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
  insertNewTurmaInTurmas,
};
