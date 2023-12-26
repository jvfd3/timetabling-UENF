/* A ideia é que seja um trocadilho com hourglass */

function adicionarHorario(turma, setTurma) {
  let newTurma = { ...turma };
  let newHorarios = [...newTurma.horarios];
  console.log(newHorarios);
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

function removerHorario(horaIndex, turma, setTurma) {
  let newTurma = { ...turma };
  let newHorarios = [...newTurma.horarios];
  newHorarios.splice(horaIndex, 1);
  newTurma.horarios = newHorarios;
  setTurma(newTurma);
}

function removerTurma(id) {
  let newTurmas = [...turmas];
  newTurmas.splice(id, 1);
  setTurmas(newTurmas);
}

function adicionarTurma() {
  let newTurmas = [...turmas];
  newTurmas.push({
    nome: null,
    horarios: [
      {
        sala: null,
        dia: null,
        horaInicio: null,
        duracao: 2,
      },
    ],
  });
  setTurmas(newTurmas);
}

export { removerHorario, adicionarHorario, removerTurma, adicionarTurma };
