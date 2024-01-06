/* A ideia é que seja um trocadilho com hourglass */
import options from "../DB/local/options";

function createTurma({ ano, semestre, turmas, setTurmas, classIndex }) {
  let blankTurma = options.emptyObjects.turma;
  let blankHorario = options.emptyObjects.horario;
  let year = ano.value;
  let semester = semestre.value;
  blankHorario.duracao = 2;
  blankHorario.ordem = 1;
  console.log("createTurma>3", classIndex);
  classIndex.current += 1;

  let newTurma = {
    ...blankTurma,
    idTurma: `${ano.value}0${semestre.value}-${classIndex.current}`,
    ano: year,
    semestre: semester,
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
  console.log("Turmas:", turmas);
  console.log("Turma to delete:", turma);
  let newTurmas = [...turmas];
  let turmaIndex = turmas.indexOf(turma);
  console.log("Index:", turmaIndex);
  newTurmas.splice(turmaIndex, 1);
  console.log("New turmas:", newTurmas);
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
