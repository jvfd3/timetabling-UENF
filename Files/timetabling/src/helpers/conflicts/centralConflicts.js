import {
  flattenTurma,
  getTurmasDoProfessor,
  removeSameId,
  splitTurmas,
} from "./auxiliarConflictsFunctions";
import { sqlDataFromJson } from "../../DB/local/dataFromJSON";
import {
  getSingleClassDemandConflict,
  searchSameDayAndHour,
} from "./conflictCalculation";
import { getStyledConflict } from "./visualConflicts";

/*
## Visualizar conflitos impeditivos #30

- [ ] Reanalisar e separar as funções de conflitos já feitas
- [ ] Representar os conflitos de mesmo horário
  - [ ] para cada turma:
    - [ ] Enviar como parâmetros a turma e as turmasListadas
    - [ ] Verificar se há conflito de com todas as outras turmas:
      - [ ] De mesmo período
      - [ ] Que não tenham o mesmo id
      - [ ] Professores
        - [ ] Filtrar todas que tenham o mesmo professor:
          - [ ] conferir se o dia e horário são iguais.
          - [ ] Se sim, há conflito
      - [ ] Disciplinas de mesmo período
        - [ ] Filtrar todas turmas cuja disciplina seja do mesmo periodo esperado:
          - [ ] conferir se o dia e horário são iguais.
          - [ ] Se sim, há conflito
    - [ ] Retornar um objeto com todos os conflitos encontrados.
*/

// Discarded (?)
function centralConflicts(turmasListadas, turmaLinear) {
  const encounteredConflicts = {};
  const filteredTurmas = removeSameId(
    splittedTurmas,
    turmaLinear.id,
    turmaLinear.idHorario
  );
  const splittedTurmas = splitTurmas(turmasListadas);
  // console.log("splittedTurmas", splittedTurmas);
  // console.log("filteredTurmas", filteredTurmas);
  // const filteredTurmas = turmasListadas;
  const conflitosProfessor = conflictsProfessor(filteredTurmas, turmaLinear);
  encounteredConflicts.professor = conflitosProfessor;
  // console.log(conflitosProfessor);
  return encounteredConflicts;
}

function conflictsDisciplinaPeriodo(turmasListadas, turma) {
  /*
  
- [ ] Disciplinas de mesmo período
  - [ ] Filtrar todas turmas cuja disciplina seja do mesmo periodo esperado
    - [ ] conferir se o dia e horário são iguais
    - [ ] Se sim, há conflito
- [ ] Retornar um objeto com todos os conflitos encontrados.

- [ ] No loop de turmas
  - [ ] Enviar para o cálculo de conflitos a turma e as turmas
    - [ ] flatten turma and turmas
    - [ ] remove turma from turmas
    - [ ] get full info from disciplina
    - [ ] get periodoEsperado
    - [ ] filter all other disciplinas with the same periodoEsperado
    - [ ] filter all other turmas with the same periodoEsperado
    - [ ] forEach turma
      - [ ] Se turma1.horaInicio == turma.horaIncio && turma1.dia == turma.dia
        - [ ] conflito = 2
- [ ] retorno esperado:

```json
{
    "conflito": {
        "0": {
            "nivelConflitoHora": 0,
            "nivelConflitoDia": 0
        },
        "1": {
            "nivelConflitoHora": 0,
            "nivelConflitoDia": 0
        },
        "2": {
            "nivelConflitoHora": 0,
            "nivelConflitoDia": 0
        },
    }
}
```

  */

  const disciplinaDaTurma = turma.disciplina.codigo;
  const disciplinas = sqlDataFromJson.subjects;

  // console.log("disciplinaDaTurma", disciplinaDaTurma);

  /* Obter lista de disciplinas que tenham o mesmo período da disciplinaDaTurma */
  const periodoEsperado = "";
  disciplinas.forEach((disciplina) => {
    if (disciplina.codigo === disciplinaDaTurma) {
      periodoEsperado = disciplina.periodo;
    }
  });
  // console.log("periodoEsperado", periodoEsperado);
  const disciplinasDoMesmoPeriodo = [];
  disciplinas.forEach((disciplina) => {
    if (disciplina.periodo === periodoEsperado) {
      disciplinasDoMesmoPeriodo.push(disciplina.codigo);
    }
  });
  // console.log("disciplinasDoMesmoPeriodo", disciplinasDoMesmoPeriodo);
  const turmasListadasSemTurmaOriginal = turmasListadas.filter(
    (turmaListada) => {
      return turmaListada.id !== turma.id;
    }
  );
  // console.log("turmasListadasSemTurmaOriginal", turmasListadasSemTurmaOriginal);

  /* Filtrar de turmasListadasSemTurmaOriginal todas todas as turmas que possuem seu disciplina.codigo percencente à lista "disciplinasDoMesmoPeriodo" */
  const turmasDoMesmoPeriodo = [];
  turmasListadasSemTurmaOriginal.forEach((turmaListada) => {
    if (disciplinasDoMesmoPeriodo.includes(turmaListada.disciplina.codigo)) {
      turmasDoMesmoPeriodo.push(turmaListada);
    }
  });
  // console.log("turmasDoMesmoPeriodo", turmasDoMesmoPeriodo);

  const splittedTurmas = splitTurmas(turmasDoMesmoPeriodo);
  // console.log("disciplinas", disciplinas);
  // console.log("splittedTurmas", splittedTurmas);

  const flattenedTurma = [];
  turma.horarios.forEach((_, index) => {
    flattenedTurma.push(flattenTurma(turma, index));
  });
  const conflitosDisciplinaPeriodo = { disciplinaPeriodo: {} };

  // console.log("flattenedTurma", flattenedTurma);
  flattenedTurma.forEach((turma, indexHorario) => {
    const maxConflito = 0;
    splittedTurmas.forEach((turmaDoMesmoPeriodo, index) => {
      // console.log("(DiaHora, ", turma.dia, turma.horaInicio,")", "(DiaHora, ", turmaDoMesmoPeriodo.dia, turmaDoMesmoPeriodo.horaInicio,")");
      const mesmoDia = turma.dia === turmaDoMesmoPeriodo.dia;
      const mesmaHora = turma.horaInicio === turmaDoMesmoPeriodo.horaInicio;
      const nivelDeConflito = mesmoDia && mesmaHora ? 2 : 0;
      maxConflito =
        nivelDeConflito > maxConflito ? nivelDeConflito : maxConflito;
    });
    const newConflitos = {
      nivelConflitoDia: maxConflito,
      nivelConflitoHora: maxConflito,
    };

    conflitosDisciplinaPeriodo.disciplinaPeriodo[indexHorario] = newConflitos;
  });
  function maxConflito(conflitosDisciplina) {
    const maxConflito = 0;
    for (const index in conflitosDisciplina.disciplinaPeriodo) {
      const conflito = conflitosDisciplina.disciplinaPeriodo[index];
      const conflitoHora = conflito.nivelConflitoHora;
      const conflitoDia = conflito.nivelConflitoDia;
      if (conflitoHora > maxConflito) {
        maxConflito = conflitoHora;
      }
      if (conflitoDia > maxConflito) {
        maxConflito = conflitoDia;
      }
    }
    return maxConflito;
  }
  conflitosDisciplinaPeriodo.maxConflito = maxConflito(
    conflitosDisciplinaPeriodo
  );
  // console.log("conflitosDisciplinaPeriodo", conflitosDisciplinaPeriodo);
  return conflitosDisciplinaPeriodo;
}

/* Post Refactor \/ */

function cleanTurmas(turmas, turma) {
  /* The current turma is being constanylt filtered:
      - First it removes the turma that have the same idTurma.
        - Maybe it should only remove the turma that have the same idTurma and idHorario.
      - Then it gets all the turmas that have the same professor.
      - Then it splits the turmas by horario. Flattening the horarios
      - Then it removes the data that are not used for now.
  */

  let currentTurmas = turmas;
  // Isso daqui impede que um conflito (SEGUNDA 8h) seja encontrado com um outro horário da mesma turma.
  currentTurmas = removeSameId(currentTurmas, turma);
  currentTurmas = getTurmasDoProfessor(currentTurmas, turma.professor);
  currentTurmas = splitTurmas(currentTurmas);
  currentTurmas = cleanBaseTurmas(currentTurmas);
  return currentTurmas;
}

function conflictsProfessor(turmas, turma) {
  const conflictsList = [];
  const professorConflicts = {};
  const flattenedTurma = splitTurmas([turma]);
  const cleanFlatTurma = cleanNotUsedForNow(flattenedTurma);

  cleanFlatTurma.forEach((cleanedClassTime) => {
    const foundConflicts = searchSameDayAndHour(turmas, cleanedClassTime);

    if (foundConflicts !== null) {
      conflictsList.push(foundConflicts);
    }
  });

  professorConflicts.alloc = conflictsList;
  // console.log("Lista de conflitos", conflictsList);
  return professorConflicts;
}

function cleanNotUsedForNow(turmas) {
  let cleanedTurmas = [];
  /*
    turmas.forEach((turma) => {
      deconste turma.ano;
      deconste turma.demandaEstimada;
      // deconste turma.dia;
      deconste turma.disciplina;
      // deconste turma.duracao;
      // deconste turma.horaInicio;
      // deconste turma.idHorario;
      // deconste turma.idTurma;
      // deconste turma.ordem;
      deconste turma.professor;
      deconste turma.sala;
      deconste turma.semestre;
      cleanedTurmas.push(turma);
    });
    */
  cleanedTurmas = turmas.map(
    ({
      ano,
      demandaEstimada,
      disciplina,
      professor,
      sala,
      semestre,
      ...rest
    }) => rest
  );
  return cleanedTurmas;
}

function cleanBaseTurmas(turmas) {
  let cleanedTurmas = [];
  cleanedTurmas = turmas.map(
    ({
      ano,
      comment,
      // demandaEstimada,
      // dia,
      disciplina,
      // duracao,
      // horaInicio,
      // idHorario,
      // idTurma,
      ordem,
      professor,
      // sala,
      semestre,
      ...rest
    }) => rest
  );
  return cleanedTurmas;
}

function removeUnecessaryDataForDemandCalculation(turmas) {
  // console.log("turmas", turmas[0]);
  const cleanedTurmas = turmas.map(
    ({
      ano,
      comment,
      // demandaEstimada,
      dia,
      // disciplina, //Deve ser usado posteriormente para turmas de mesma disciplina
      duracao,
      horaInicio,
      // idHorario,
      // idTurma,
      ordem,
      professor,
      // sala,
      semestre,
      ...rest
    }) => rest
  );
  // console.log("cleanedTurmas", cleanedTurmas[0]);
  return cleanedTurmas;
}

function getDemandNeededData(turma) {
  const classTimes = turma.horarios;
  const cleanedTurma = {
    idClass: turma.idTurma,
    expectedDemand: turma.demandaEstimada,
  };
  const neededData = [];
  classTimes.forEach((classTime) => {
    // console.log("classTime", classTime);
    // console.log("classTime.sala", classTime.sala);
    const newFlattenedData = {
      idRoom: classTime.sala?.id,
      idClassTime: classTime.idHorario,
      ...cleanedTurma,
      roomCapacity: classTime.sala?.capacidade,
    };
    // console.log("newFlattenedData.idRoom", newFlattenedData.idRoom);
    neededData.push(newFlattenedData);
  });
  // console.log("turma", turma);
  // console.log("neededData", neededData);
  return neededData;
}

function conflictDemand(turmas, classData) {
  /* First I need to filter the turma to have all flattened data to be processed:
    classTimes: [
      {
        idClass: 1,
        idClassTime: 1,
        idRoom: 1,
        expectedDemand: 1,
        roomCapacity: 1,
      },
      ...
    ]
  */
  const demandConflictData = getDemandNeededData(classData);
  const singleClassDemandConflicts =
    getSingleClassDemandConflict(demandConflictData);
  const demandConflicts = {};
  demandConflicts.singleTurmaCapacity = singleClassDemandConflicts;
  return demandConflicts;
}

function baseClassItemConflicts(turmas, turma, semestre) {
  const myClassConflicts = {};
  const cleanedTurmas = cleanTurmas(turmas, turma);
  myClassConflicts.professor = conflictsProfessor(cleanedTurmas, turma);

  myClassConflicts.expectedDemand = conflictDemand(turmas, turma);

  // console.log("myClassConflicts", myClassConflicts.professor);
  const styledConflict = getStyledConflict(myClassConflicts, turma, semestre);
  const conflicts = {
    raw: myClassConflicts,
    styled: styledConflict,
  };
  return conflicts;
}

export { centralConflicts, conflictsDisciplinaPeriodo, baseClassItemConflicts };
