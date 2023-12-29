/* A ideia é que seja um trocadilho com hourglass */
import options from "../DB/local/options";

function createTurma({ ano, semestre, turmas, setTurmas }) {
  let blankHorario = options.emptyObjects.horario;
  blankHorario.duracao = 2;
  blankHorario.ordem = 1;

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

function createHorario(turmasStates) {
  const { turmas, setTurmas, turma, setTurma } = turmasStates;

  let newTurma = { ...turma };
  let newHorarios = [...newTurma.horarios];
  let blankHorario = options.emptyObjects.horario;
  blankHorario.duracao = 2;
  newHorarios.push(blankHorario);
  newTurma.horarios = newHorarios;
  setTurma(newTurma);
  if (turmas !== undefined && setTurmas !== undefined) {
    insertNewTurmaInTurmas(turmas, setTurmas, newTurma);
  }
}

function insertNewTurmaInTurmas(turmas, setTurmas, turma) {
  let currentId = turma.idTurma;
  let newTurmas = [...turmas];
  newTurmas = newTurmas.map((turmaAtual) => {
    return turmaAtual.idTurma === currentId ? turma : turmaAtual;
  });
  setTurmas(newTurmas);
}

function deleteHorario(turma, setTurma, horaIndex) {
  let newTurma = { ...turma };
  let newHorarios = [...newTurma.horarios];
  newHorarios.splice(horaIndex, 1);
  newTurma.horarios = newHorarios;
  setTurma(newTurma);
}

export {
  createTurma,
  deleteTurma,
  createHorario,
  deleteHorario,
  insertNewTurmaInTurmas,
};
