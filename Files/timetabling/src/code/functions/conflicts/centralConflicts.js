import { splitTurmas } from "./auxiliarConflictsFunctions";

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

function conflictsProfessor(turmasListadas, turmaLinear) {
  /* 
      - [ ] Professores
        - [ ] Filtrar todas que tenham o mesmo professor:
          - [ ] conferir se o dia e horário são iguais.
          - [ ] Se sim, há conflito
  */

  function getTurmasDoProfessor(turmas, professor) {
    let outrasTurmasDoProfessor = [];
    turmas.forEach((turma) => {
      if (
        turma.professor === professor &&
        professor !== null &&
        professor !== ""
      ) {
        outrasTurmasDoProfessor.push(turma);
      }
    });
    return outrasTurmasDoProfessor;
  }

  function cleanNotUsedForNow(turmas) {
    let cleanedTurmas = [];
    turmas.forEach((turma) => {
      delete turma.ano;
      delete turma.demandaEstimada;
      // delete turma.dia;
      delete turma.disciplina;
      // delete turma.duracao;
      // delete turma.horaInicio;
      // delete turma.id;
      delete turma.professor;
      delete turma.sala;
      delete turma.semestre;
      // delete turma.indexHorario;
      cleanedTurmas.push(turma);
    });
    return cleanedTurmas;
  }

  function searchSameDayAndHour(horariosDoProfessor, turmaLinear) {
    let conflicts = {
      hora: 0,
      dia: 0,
    };
    // console.log(horariosDoProfessor);
    horariosDoProfessor.forEach((horarioDoProfessor) => {
      let mesmoDia = turmaLinear.dia === horarioDoProfessor.dia;
      let mesmaHora = turmaLinear.horaInicio === horarioDoProfessor.horaInicio;
      if (mesmoDia && mesmaHora) {
        conflicts.hora = 3;
        conflicts.dia = 3;
      }
    });

    if (!turmaLinear.dia) {
      conflicts.dia = 2;
    }
    if (!turmaLinear.horaInicio) {
      conflicts.hora = 2;
    }
    return conflicts;
  }

  let conflitosProfessor = {};
  let turmasDoProfessor = getTurmasDoProfessor(
    turmasListadas,
    turmaLinear.professor
  );
  // console.log("turmasDoProfessor", turmasDoProfessor);
  // let horariosProfessor = splitTurmas(turmasDoProfessor);
  let cleanedHorarios = cleanNotUsedForNow(turmasDoProfessor);
  let HoraDia = searchSameDayAndHour(cleanedHorarios, turmaLinear);
  conflitosProfessor = HoraDia;
  // console.log("turmasDoProfessor", turmasDoProfessor);
  // console.log("horariosProfessor", horariosProfessor);
  // console.log("cleanedHorarios", cleanedHorarios);
  // console.log("Conflitos encontrados", conflitosEncontrados);
  return conflitosProfessor;
}

function removeSameId(turmasListadas, idTurma, idHorario) {
  // console.log(turmasListadas);
  let turmasListadasSemTurmaOriginal = turmasListadas.filter((turmaListada) => {
    return turmaListada.id + turmaListada.idHorario !== idTurma+idHorario;
  });
  return turmasListadasSemTurmaOriginal;
}

function centralConflicts(turmasListadas, turmaLinear) {
  let encounteredConflicts = {};
  let splittedTurmas = splitTurmas(turmasListadas);
  let filteredTurmas = removeSameId(
    splittedTurmas,
    turmaLinear.id,
    turmaLinear.idHorario
    );
  // console.log("splittedTurmas", splittedTurmas);
  // console.log("filteredTurmas", filteredTurmas);
  // let filteredTurmas = turmasListadas;
  let conflitosProfessor = conflictsProfessor(filteredTurmas, turmaLinear);
  encounteredConflicts.professor = conflitosProfessor;
  // console.log(conflitosProfessor);
  return encounteredConflicts;
}

function coloredConflicts(conflictLevel) {
  let color = "";
  switch (conflictLevel) {
    case 0:
      color = "green";
      break;
    case 1:
      color = "yellow";
      break;
    case 2:
      color = "orange";
      break;
    case 3:
      color = "red";
      break;
    default:
      color = "";
      break;
  }
  return color;
}

export { centralConflicts, coloredConflicts };
