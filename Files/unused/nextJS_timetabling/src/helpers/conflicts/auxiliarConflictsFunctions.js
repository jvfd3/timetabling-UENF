import options from "@/helpers/options.js";

function testingTurmas2022_1(turmas) {
  let anos = options.constantValues.years;
  let ano = anos[8].value;

  let semestres = options.constantValues.semesters;
  let semestre = semestres[0].value;

  let turmas2022_1 = getTurmasPorAnoESemestre(turmas, ano, semestre);
  return turmas2022_1;
}

function flattenTurma(turma, horarioIndex) {
  let turmaHorario = turma.horarios[horarioIndex];
  let newTurma = { ...turmaHorario, ...turma };
  /* Essa parte daqui de baixo não tá repetindo o que essa linha acima faz? Tô confuso. */
  newTurma.horaInicio = turmaHorario.horaInicio;
  newTurma.duracao = turmaHorario.duracao;
  newTurma.idHorario = turmaHorario.id;
  newTurma.sala = turmaHorario.sala;
  newTurma.dia = turmaHorario.dia;
  delete newTurma.horarios;
  // console.log("turma", turma);
  // console.log("newTurma", newTurma);
  return newTurma;
}

function splitTurmas(turmas) {
  let newSplittedTurmas = [];
  turmas.forEach((turma) => {
    turma.horarios.forEach((horario, idxHorario) => {
      let newTurma = flattenTurma(turma, idxHorario);
      newSplittedTurmas.push(newTurma);
    });
  });
  return newSplittedTurmas;
}

function getTurmasPorAnoESemestre(turmas, ano, semestre, splitted = false) {
  /*
    Essa função retorna um array de turmas que acontecem no ano e semestre passados como parâmetro.
    Ela também expande os horários de cada turma em um objeto separado, para facilitar a análise de conflitos.
  */

  /* // How it was done before
  turmas.forEach((turma) => {
    if (turma.ano === ano && turma.semestre === semestre) {
      turma.horarios.forEach((horario) => {
        let newTurma = { ...turma, ...horario };
        delete newTurma.horarios;
        turmasDesseSemestre.push(newTurma);
      });
    }
  });
  */
  let turmasDoAno = searchListForKeyWithValue(turmas, ["ano"], ano);
  let turmasDoSemestre = searchListForKeyWithValue(
    turmasDoAno,
    ["semestre"],
    semestre
  );

  if (!splitted) {
    return turmasDoSemestre;
  }
  let splittedTurmas = splitTurmas(turmasDoSemestre);

  return splittedTurmas;
}

function searchListForKeyWithValue(
  lista,
  chavesDaLista,
  valorAComparar,
  verbose = false
) {
  /*
  O primeiro valor é uma lista de objetos
  O segundo valor é uma string que representa uma chave de cada um dos objetos da lista
  O terceiro valor é o valor que a chave deve ter para que o objeto seja retornado
  */
  let listaFiltrada = [];

  lista.forEach((elemento) => {
    // Obter valor da lista
    let valorDoElemento = elemento;
    if (verbose) console.log("valorDoElemento", valorDoElemento);
    // console.log("chavesDaLista", elemento[chavesDaLista[0]])
    for (let indexChave in chavesDaLista) {
      let chave = chavesDaLista[indexChave];
      valorDoElemento = valorDoElemento[chave];
      if (verbose) console.log("valorDoElemento", valorDoElemento);
    }
    if (verbose) console.log("valorAComparar", valorAComparar);
    if (valorDoElemento === valorAComparar) {
      listaFiltrada.push(elemento);
    }
  });
  return listaFiltrada;
}

function getNumeroDeConflitos(conflitos) {
  /* Alguma outra lógica de cálculo de conflitos pode ser usada posteriormente, mas por enquanto isso está bom por mim */
  let numeroDeConflitos = conflitos.length;
  return numeroDeConflitos;
}

function andamentoToDemanda(andamentos) {
  let disciplinasSendoCursadas = {};

  for (let matricula in andamentos) {
    let disciplinas = andamentos[matricula].cursando;
    disciplinas.forEach((disciplina) => {
      if (!disciplinasSendoCursadas[disciplina]) {
        disciplinasSendoCursadas[disciplina] = {
          alunosDemandando: [matricula],
        };
      } else {
        disciplinasSendoCursadas[disciplina].alunosDemandando.push(matricula);
      }
    });
  }
  return disciplinasSendoCursadas;
}

function getTurmasDaSalaPorValorDoHorario(turmas, chaves, valorAComparar) {
  let newTurmasDaSala = [];
  // console.log("a", turmas);
  turmas.forEach((turma) => {
    for (let indexHorario in turma[chaves[0]]) {
      let valorDoElemento = turma[chaves[0]][indexHorario][chaves[1]];
      // console.log("valorDoElemento", valorDoElemento);
      // console.log("valorAComparar", valorAComparar);
      if (valorDoElemento === valorAComparar) {
        newTurmasDaSala.push({ ...turma });
      }
    }
  });

  return newTurmasDaSala;
}

function getAtendimentoDeDemandas(turmas, disciplinasDemandadas) {
  /* Essa função deve percorrer a lista de disciplinas demandadas e verificar quantas turmas existem para cada uma delas
    Depois vai preencher o objeto de disciplinas demandadas com o número de turmas
    Com o seguinte formato:
    disciplinasDemandadas = {
      codigoDisciplina: {
        alunosDemandando: [matricula],
        numeroDeTurmas: 0
      }
    }
  */
  let atendimentoDeDisciplinas = { ...disciplinasDemandadas };
  for (let codigoDisciplina in disciplinasDemandadas) {
    // console.log("codigoDisciplina", codigoDisciplina);
    let turmasDessaDisciplina = searchListForKeyWithValue(
      turmas,
      ["disciplina", "codigo"],
      codigoDisciplina
    );
    // console.log("turmasDessaDisciplina", turmasDessaDisciplina);
    atendimentoDeDisciplinas[codigoDisciplina].turmas = turmasDessaDisciplina;
    atendimentoDeDisciplinas[codigoDisciplina].numeroDeTurmas =
      turmasDessaDisciplina.length;
  }
  return atendimentoDeDisciplinas;
}

export {
  andamentoToDemanda,
  testingTurmas2022_1,
  splitTurmas,
  getTurmasDaSalaPorValorDoHorario,
  getTurmasPorAnoESemestre,
  searchListForKeyWithValue,
  getNumeroDeConflitos,
  flattenTurma,
  getAtendimentoDeDemandas,
};
