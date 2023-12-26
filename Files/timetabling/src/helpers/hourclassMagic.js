/* A ideia é que seja um trocadilho com hourglass */

function removerHorario(id) {
  let newTurma = { ...turma1 };
  let newHorarios = [...newTurma.horarios];
  newHorarios.splice(id, 1);
  newTurma.horarios = newHorarios;
  setTurma1(newTurma);
}

function adicionarHorario(turma, setTurma) {
  let newTurma = { ...turma };
  let newHorarios = [...newTurma.horarios];
  newHorarios.push({
    sala: null,
    dia: null,
    horaInicio: null,
    duracao: 2,
  });

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
