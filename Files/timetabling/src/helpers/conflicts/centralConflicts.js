import {
  flattenTurma,
  getTurmasDoProfessor,
  removeSameId,
  splitTurmas,
} from "./auxiliarConflictsFunctions";
import { allLocalJsonData } from "../../DB/local/dataFromJSON";
import { searchSameDayAndHour } from "./conflictCalculation";
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
  let encounteredConflicts = {};
  let filteredTurmas = removeSameId(
    splittedTurmas,
    turmaLinear.id,
    turmaLinear.idHorario
  );
  let splittedTurmas = splitTurmas(turmasListadas);
  // console.log("splittedTurmas", splittedTurmas);
  // console.log("filteredTurmas", filteredTurmas);
  // let filteredTurmas = turmasListadas;
  let conflitosProfessor = conflictsProfessor(filteredTurmas, turmaLinear);
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

  let disciplinaDaTurma = turma.disciplina.codigo;
  // let disciplinas = allLocalJsonData.static.infoDisciplinasCC;
  let disciplinas = allLocalJsonData.SQL.disciplinas;

  // console.log("disciplinaDaTurma", disciplinaDaTurma);

  /* Obter lista de disciplinas que tenham o mesmo período da disciplinaDaTurma */
  let periodoEsperado = "";
  disciplinas.forEach((disciplina) => {
    if (disciplina.codigo === disciplinaDaTurma) {
      periodoEsperado = disciplina.periodo;
    }
  });
  // console.log("periodoEsperado", periodoEsperado);
  let disciplinasDoMesmoPeriodo = [];
  disciplinas.forEach((disciplina) => {
    if (disciplina.periodo === periodoEsperado) {
      disciplinasDoMesmoPeriodo.push(disciplina.codigo);
    }
  });
  // console.log("disciplinasDoMesmoPeriodo", disciplinasDoMesmoPeriodo);
  let turmasListadasSemTurmaOriginal = turmasListadas.filter((turmaListada) => {
    return turmaListada.id !== turma.id;
  });
  // console.log("turmasListadasSemTurmaOriginal", turmasListadasSemTurmaOriginal);

  /* Filtrar de turmasListadasSemTurmaOriginal todas todas as turmas que possuem seu disciplina.codigo percencente à lista "disciplinasDoMesmoPeriodo" */
  let turmasDoMesmoPeriodo = [];
  turmasListadasSemTurmaOriginal.forEach((turmaListada) => {
    if (disciplinasDoMesmoPeriodo.includes(turmaListada.disciplina.codigo)) {
      turmasDoMesmoPeriodo.push(turmaListada);
    }
  });
  // console.log("turmasDoMesmoPeriodo", turmasDoMesmoPeriodo);

  let splittedTurmas = splitTurmas(turmasDoMesmoPeriodo);
  // console.log("disciplinas", disciplinas);
  // console.log("splittedTurmas", splittedTurmas);

  let flattenedTurma = [];
  turma.horarios.forEach((_, index) => {
    flattenedTurma.push(flattenTurma(turma, index));
  });
  let conflitosDisciplinaPeriodo = { disciplinaPeriodo: {} };

  // console.log("flattenedTurma", flattenedTurma);
  flattenedTurma.forEach((turma, indexHorario) => {
    let maxConflito = 0;
    splittedTurmas.forEach((turmaDoMesmoPeriodo, index) => {
      // console.log("(DiaHora, ", turma.dia, turma.horaInicio,")", "(DiaHora, ", turmaDoMesmoPeriodo.dia, turmaDoMesmoPeriodo.horaInicio,")");
      let mesmoDia = turma.dia === turmaDoMesmoPeriodo.dia;
      let mesmaHora = turma.horaInicio === turmaDoMesmoPeriodo.horaInicio;
      let nivelDeConflito = mesmoDia && mesmaHora ? 2 : 0;
      maxConflito =
        nivelDeConflito > maxConflito ? nivelDeConflito : maxConflito;
    });
    let newConflitos = {
      nivelConflitoDia: maxConflito,
      nivelConflitoHora: maxConflito,
    };

    conflitosDisciplinaPeriodo.disciplinaPeriodo[indexHorario] = newConflitos;
  });
  function maxConflito(conflitosDisciplina) {
    let maxConflito = 0;
    for (let index in conflitosDisciplina.disciplinaPeriodo) {
      let conflito = conflitosDisciplina.disciplinaPeriodo[index];
      let conflitoHora = conflito.nivelConflitoHora;
      let conflitoDia = conflito.nivelConflitoDia;
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

function cleanNotUsedForNow(turmas) {
  let cleanedTurmas = [];
  /*
    turmas.forEach((turma) => {
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

function conflictsProfessor(turmas, turma) {
  let conflictsList = [];
  let professorConflicts = {};
  let flattenedTurma = splitTurmas([turma]);
  let cleanFlatTurma = cleanNotUsedForNow(flattenedTurma);

  cleanFlatTurma.forEach((cleanedClassTime) => {
    let foundConflicts = searchSameDayAndHour(turmas, cleanedClassTime);

    if (foundConflicts !== null) {
      conflictsList.push(foundConflicts);
    }
  });

  professorConflicts.alloc = conflictsList;
  // console.log("Lista de conflitos", conflictsList);
  return professorConflicts;
}

function cleanTurmas(turmas, turma) {
  let currentTurmas = turmas;
  // Isso daqui impede que um conflito (SEGUNDA 8h) seja encontrado com um outro horário da mesma turma.
  currentTurmas = removeSameId(currentTurmas, turma);
  currentTurmas = getTurmasDoProfessor(currentTurmas, turma.professor);
  currentTurmas = splitTurmas(currentTurmas);
  currentTurmas = cleanNotUsedForNow(currentTurmas);
  return currentTurmas;
}

function baseTurmaConflicts(turmas, turma) {
  let myClassConflicts = {};
  let cleanedTurmas = cleanTurmas(turmas, turma);
  myClassConflicts.professor = conflictsProfessor(cleanedTurmas, turma);
  let styledConflict = getStyledConflict(myClassConflicts);
  let conflicts = {
    styled: styledConflict,
    raw: myClassConflicts,
  };
  return conflicts;
}

export { centralConflicts, conflictsDisciplinaPeriodo, baseTurmaConflicts };
