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
    idTurma: turmas.length,
    professor: null,
    horarios: [
      {
        ...blankHorario,
        ordem: 1,
        idHorario: turmas.length,
        idTurma: turmas.length,
      },
      {
        ...blankHorario,
        ordem: 2,
        idHorario: turmas.length + 1,
        idTurma: turmas.length,
      },
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
  // console.log("Horarios", turma.horarios);
  let newTurma = { ...turma };
  let newHorarios = [...newTurma.horarios];
  console.log("newHorarios", newHorarios);
  let blankHorario = options.emptyObjects.horario;
  blankHorario.duracao = 2;
  blankHorario.ordem = newHorarios.length + 1;
  blankHorario.idTurma = newTurma.idTurma;
  blankHorario.idHorario = newHorarios.length + 1;
  // newHorarios.push(blankHorario);
  newTurma.horarios = [...newHorarios, blankHorario];
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

function deleteHorario(myProps) {
  const { turma, setTurma, indexHorario } = myProps;
  let newTurma = { ...turma };
  let newHorarios = [...newTurma.horarios];
  newHorarios.splice(indexHorario, 1);
  newTurma.horarios = newHorarios;
  let newNewTurma = {
    ...newTurma,
    horarios: newHorarios,
  };

  setTurma(newNewTurma);
}

export {
  createTurma,
  deleteTurma,
  createHorario,
  deleteHorario,
  insertNewTurmaInTurmas,
};
