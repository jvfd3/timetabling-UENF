import {
  flattenTurma,
  removeSameId,
  splitTurmas,
} from "./auxiliarConflictsFunctions";
import { sqlDataFromJson } from "../../DB/local/dataFromJSON";
import {
  getSingleClassDemandConflict,
  searchSameDayAndHour,
} from "./conflictCalculation";
import { getStyledConflict } from "./visualConflicts";
import { getId } from "../auxCRUD";
import { filterProfessor } from "../filteringFunc";

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

function cleanClasses(classes, classItem) {
  /* The current classItem is being constanylt filtered:
      - First it removes the classItem that have the same idTurma.
        - Maybe it should only remove the classItem that have the same idTurma and idHorario.
      - Then it gets all the classes that have the same professor.
      - Then it splits the classes by horario. Flattening the horarios
      - Then it removes the data that are not used for now.
  */
  // console.log("classes", classes);
  let currentClasses = classes;
  // Isso daqui impede que um conflito (SEGUNDA 8h) seja encontrado com um outro horário da mesma classItem.

  // console.log("pre-removeSameId", currentClasses.length); //OK
  currentClasses = removeSameId(currentClasses, classItem);
  console.log("removeSameId", currentClasses.length); // OK
  currentClasses = filterProfessor(currentClasses, classItem.professor);
  /* this function above shouldn't even be here */
  console.log("filterProfessor", currentClasses.length);
  currentClasses = splitTurmas(currentClasses);
  console.log("splitTurmas", currentClasses.length);
  currentClasses = cleanBaseTurmas(currentClasses);
  console.log("cleanBaseTurmas", currentClasses.length);
  return currentClasses;
}

function conflictsProfessor(classes, classItem) {
  const conflictsList = [];
  const professorConflicts = {};
  const flatClassItem = splitTurmas([classItem]);
  const cleanFlatClassItem = cleanNotUsedForNow(flatClassItem);
  // console.log("classes", classes);
  // console.log("flatClassItem", flatClassItem);
  // console.log("cleanFlatClassItem", cleanFlatClassItem);
  cleanFlatClassItem.forEach((iterCleanedClassTime) => {
    const foundConflicts = searchSameDayAndHour(classes, iterCleanedClassTime);
    // console.log("foundConflicts", foundConflicts);
    if (foundConflicts !== null) {
      conflictsList.push(foundConflicts);
    }
  });

  professorConflicts.alloc = conflictsList;
  // console.log("Lista de conflitos", conflictsList);
  return professorConflicts;
}

function cleanNotUsedForNow(classes) {
  let cleanedTurmas = [];
  /*
    classes.forEach((turma) => {
      delete turma.ano;
      delete turma.demandaEstimada;
      // delete turma.dia;
      delete turma.disciplina;
      // delete turma.duracao;
      // delete turma.horaInicio;
      // delete turma.idHorario;
      // delete turma.idTurma;
      // delete turma.ordem;
      delete turma.professor;
      delete turma.sala;
      delete turma.semestre;
      cleanedTurmas.push(turma);
    });
    */
  cleanedTurmas = classes.map(
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

function getDemandNeededData(classItem) {
  // console.log("classItem", classItem);
  const classTimes = classItem.horarios;
  const cleanedTurma = {
    idClass: getId(classItem),
    expectedDemand: classItem.demandaEstimada,
  };
  const neededData = [];
  classTimes.forEach((classTime) => {
    // console.log("classTime", classTime);
    // console.log("classTime.sala", classTime.sala);
    const newFlattenedData = {
      idRoom: classTime.sala?.id,
      idClassTime: getId(classTime),
      ...cleanedTurma,
      roomCapacity: classTime.sala?.capacidade,
    };
    // console.log("newFlattenedData.idRoom", newFlattenedData.idRoom);
    neededData.push(newFlattenedData);
  });
  // console.log("classItem", classItem);
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

function baseClassItemConflicts(classes, classItem, semester) {
  const myClassConflicts = {};
  const cleanedTurmas = cleanClasses(classes, classItem);
  // console.log("cleanedTurmas", cleanedTurmas);
  myClassConflicts.professor = conflictsProfessor(cleanedTurmas, classItem);

  myClassConflicts.expectedDemand = conflictDemand(classes, classItem);

  // console.log("myClassConflicts", myClassConflicts.professor);
  const styledConflict = getStyledConflict(
    myClassConflicts,
    classItem,
    semester
  );
  const conflicts = {
    raw: myClassConflicts,
    styled: styledConflict,
  };
  return conflicts;
}

export { centralConflicts, conflictsDisciplinaPeriodo, baseClassItemConflicts };
