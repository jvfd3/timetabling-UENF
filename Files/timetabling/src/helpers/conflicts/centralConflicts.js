import { conflictsProfessor } from "./calculations/rawProfessor";
import { conflictDemand } from "./calculations/rawDemand";
import { conflictRoom } from "./calculations/rawRoom";
import { getStyledItemConflict } from "./Styles/visualConflicts";

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

export { baseClassItemConflicts };
