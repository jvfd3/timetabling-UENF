import options from "../../DB/local/options";
// import { allLocalJsonData } from "../../../DB/dataFromJSON";

function testingTurmas2022_1(turmas) {
  let anos = options.constantValues.years;
  let ano = anos[8].value;

  let semestres = options.constantValues.semesters;
  let semestre = semestres[0].value;

  let turmas2022_1 = getTurmasPorAnoESemestre(turmas, ano, semestre);
  return turmas2022_1;
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

/* Post refactor \/ */

// 5
function searchSameDayAndHour(horarios, horario) {
  /* Horarios tem a seguinte estrutura:
  [
    {
      dia: "SEG",
      duracao: 2,
      horaInicio: 8,
      idHorario: 1,
      idTurma: 1,
      ordem: 1,
    },
    {
      dia: "QUA",
      duracao: 2,
      horaInicio: 8,
      idHorario: 2,
      idTurma: 1,
      ordem: 2,
    },
    {
      dia: "TER",
      duracao: 2,
      horaInicio: 8,
      idHorario: 3,
      idTurma: 2,
      ordem: 1,
    },
    {
      dia: "QUI",
      duracao: 2,
      horaInicio: 8,
      idHorario: 4,
      idTurma: 2,
      ordem: 2,
    },
  ]
  Essa função deve reconhecer os valores de hora início, dia e duração do horário passado como parâmetro para verificar se há conflitos com o horário de cada um dos horários da lista.
  Lembre de considerar que com uma horaInicio de 8 e uma duração de 2, o horário vai até 10, ou seja, os horários de 8 e 9 estão ocupados, mas o de 10 não.
  O objeto retornado deve ser da seguinte forma:
    Caso não haja conflitos: null
    Caso haja conflitos: {
      numeroDeConflitos: 1, // o número de conflitos encontrados
      conflitos: [
        {
          dia: "SEG",
          horaComConflito: 8,
        },
      ],
    }

  */
  let conflitos = {
    numeroDeConflitos: 0,
    conflitos: [],
  };

  horarios.forEach((iterHorario) => {
    let mesmoDia = horario.dia === iterHorario.dia;
    let mesmaHora = horario.horaInicio === iterHorario.horaInicio;
    let duracaoConflito =
      horario.horaInicio < iterHorario.horaInicio + iterHorario.duracao &&
      horario.horaInicio + horario.duracao > iterHorario.horaInicio;

    if (mesmoDia && mesmaHora && duracaoConflito) {
      conflitos.numeroDeConflitos += 1;
      conflitos.conflitos.push({
        dia: iterHorario.dia,
        horaComConflito: iterHorario.horaInicio,
      });
    }
  });

  return conflitos.numeroDeConflitos > 0 ? conflitos : null;
}

// 4
/* function getTurmasDoProfessor(turmas, professor) {
  let outrasTurmasDoProfessor = [];
  turmas.forEach((iterTurma) => {
    let profIgual = iterTurma.professor === professor;
    let profNaoNulo = professor !== null;
    let profNaoVazio = professor !== "";
    let profNaoUndefined = professor !== undefined;
    let profValido =
      profIgual && profNaoNulo && profNaoVazio && profNaoUndefined;
    if (profValido) {
      outrasTurmasDoProfessor.push(iterTurma);
    }
  });
  return outrasTurmasDoProfessor;
} */

function getTurmasDoProfessor(turmas, professor) {
  return turmas.filter((turma) => turma.professor === professor);
}

// 3
function removeSameId(turmas, turma) {
  // console.log("Quantidade de Turmas", turmas.length);
  let turmasListadasSemTurmaOriginal = turmas.filter((iterTurma) => {
    let found = iterTurma.idTurma !== turma.idTurma;
    return found;
  });
  return turmasListadasSemTurmaOriginal;
}

// 2
function flattenTurma(turma, horario) {
  let newTurma = {
    ...turma,
    ...horario,
  };
  delete newTurma.horarios;
  // delete newTurma.id;
  // console.log("turmaHorario", turmaHorario);
  // console.log("newTurma", newTurma);
  // console.log("turma", turma);
  // console.log("newTurma", newTurma);
  return newTurma;
}

/* function flattenTurma(turma, horario) {
  const { horarios, ...rest } = turma;
  return {
    ...rest,
    ...horario,
  };
} */

/* function splitTurmas(turmas) {
  return turmas.flatMap((turma) =>
    turma.horarios.map((horario) => flattenTurma(turma, horario))
  );
} */

// 1
function splitTurmas(turmas) {
  let newSplittedTurmas = [];
  turmas.forEach((turma) => {
    turma.horarios.forEach((horario) => {
      let newTurma = flattenTurma(turma, horario);
      newSplittedTurmas.push(newTurma);
    });
  });
  return newSplittedTurmas;
}

export {
  andamentoToDemanda,
  testingTurmas2022_1,
  getTurmasDaSalaPorValorDoHorario,
  getTurmasPorAnoESemestre,
  searchListForKeyWithValue,
  getNumeroDeConflitos,
  getAtendimentoDeDemandas,
  /* Refactored: */
  searchSameDayAndHour, // 5
  getTurmasDoProfessor, // 4
  removeSameId, // 3
  flattenTurma, // 2
  splitTurmas, // 1
};
