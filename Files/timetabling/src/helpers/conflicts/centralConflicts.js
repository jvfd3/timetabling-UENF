import { flattenTurma, splitTurmas } from "./auxiliarConflictsFunctions";
import { sqlDataFromJson } from "../../DB/local/dataFromJSON";
import { getSingleClassDemandConflict } from "./conflictCalculation";
import { getStyledItemConflict } from "./Styles/visualConflicts";
import { getId } from "../auxCRUD";
import { conflictRoom } from "./calculations/rawRoom";
import { conflictsProfessor } from "./calculations/rawProfessor";

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

function baseClassItemConflicts(classes, classItem, semester = 3) {
  const myClassConflicts = {};
  myClassConflicts.professor = conflictsProfessor(classes, classItem);
  myClassConflicts.expectedDemand = conflictDemand(classes, classItem);
  myClassConflicts.room = conflictRoom(classes, classItem);

  // console.log("myClassConflicts", myClassConflicts.professor);
  const styledConflict = getStyledItemConflict(
    myClassConflicts,
    classItem,
    semester
  );
  const conflicts = {
    raw: myClassConflicts,
    styled: styledConflict,
  };

  /*
    professorConflicts é uma lista de conflitos podendo ter 0 ou mais conflitos.
    cada conflito é um objeto com a seguinte estrutura:
    {
      from: {
        idTurma: "T01",
        idHorario: "H01",
      },
      time: {
        day: "SEGUNDA",
        hour: "8",
      },
      to: [
        {
          idTurma: "T02",
          idHorario: "H01",
        },
        {
          idTurma: "T03",
          idHorario: "H01",
        },
      ],
      type: {
        name: "Conflito de alocação múltipla",
        weight: 3,
      },
    }
    a turma recebida nas props é a turma que está sendo renderizada.
    ela tem a seguinte estrutura relevante:
    {
      idTurma: "T01",
      horarios: [
        {
        idHorario: "H01",
        dia: "SEG",
        horaInicio: 8,
        duracao: 2,
        idTurma: T01
        },
      ]
    }
    e horário é o horário que está sendo renderizado.

    O que eu desejo é que, caso o horário que está sendo renderizado esteja em conflito com algum outro horário, ele seja colorido. Para isso, deve-se comprar o idHorario do horário que está sendo renderizado cada um dos idHorario do professorConflicts.to. Caso haja um match, o horário deve ser colorido.
  */

  return conflicts;
}

export { conflictsDisciplinaPeriodo, baseClassItemConflicts };
