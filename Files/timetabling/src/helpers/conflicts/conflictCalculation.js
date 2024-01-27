import options from "../../DB/local/options";
import { getId } from "../auxCRUD";

function searchSameDayAndHour(flatTurmas, horario) {
  /* flatTurmas tem a seguinte estrutura:
  [
    {
      dia: "SEG",
      duracao: 2,
      horaInicio: 8,
      idHorario: 1,
      idTurma: 1,
    },
    {
      dia: "QUA",
      duracao: 2,
      horaInicio: 8,
      idHorario: 2,
      idTurma: 1,
    },
    {
      dia: "TER",
      duracao: 2,
      horaInicio: 8,
      idHorario: 3,
      idTurma: 2,
    },
    {
      dia: "QUI",
      duracao: 2,
      horaInicio: 8,
      idHorario: 4,
      idTurma: 2,
    },
  ]
  Essa função deve reconhecer os valores de hora início, dia e duração do horário passado como parâmetro para verificar se há conflitos com o horário de cada um dos horários da lista.
  Lembre de considerar que com uma horaInicio de 8 e uma duração de 2, o horário vai até 10, ou seja, os horários de 8 e 9 estão ocupados, mas o de 10 não.
  O objeto retornado deve ser da seguinte forma:
    Caso não haja conflitos: null
    Caso haja conflitos: {
      conflitos: [
        {
          type: options.conflicts.professorAlloc, // Informações sobre o tipo de conflito
          time: { // Dia e hora em questão
            day: "SEG",
            hour: 8,
          },
          from: { // Horário que está sendo analisado
            idTurma: 1,
            idHorario: 1,
          },
          to: [ // Lista de turmas e horários que estão alocados no mesmo dia e hora
            {  idTurma: 2, idHorario: 3 },
            {  idTurma: 3, idHorario: 5 },
          ],
        },
      ],
    }

  */
  const hourAllocConflicts = [];
  // console.log(`(${horario.dia}, ${horario.horaInicio})`, flatTurmas);
  flatTurmas.forEach((iterClasstime) => {
    const sameDay = horario.dia === iterClasstime.dia;
    const notNullDay =
      (horario && horario.dia !== null) ||
      (iterClasstime && iterClasstime.dia !== null);
    const notNullStartHour =
      (horario && horario.horaInicio !== null) ||
      (iterClasstime && iterClasstime.horaInicio !== null);
    const NotNullDayTime = notNullDay && notNullStartHour;
    const sameHour = horario.horaInicio === iterClasstime.horaInicio;
    /* Is this duration conflict right? */
    const duracaoConflito =
      horario.horaInicio < iterClasstime.horaInicio + iterClasstime.duracao &&
      horario.horaInicio + horario.duracao > iterClasstime.horaInicio;
    const sameTime = sameDay && (sameHour || duracaoConflito) && NotNullDayTime;
    if (sameTime) {
      const iterConflict = {
        idTurma: iterClasstime.idTurma,
        idHorario: getId(iterClasstime),
      };
      hourAllocConflicts.push(iterConflict);
    }
  });
  // console.log("hourAllocConflicts", hourAllocConflicts);
  /* The part below should be apart from the upper one*/
  let conflictObject = null;
  const hasConflicts = hourAllocConflicts.length > 0;
  if (hasConflicts) {
    conflictObject = {
      type: options.conflicts.professorAlloc,
      time: {
        day: horario.dia,
        hour: horario.horaInicio,
      },
      from: {
        idTurma: horario.idTurma,
        idHorario: getId(horario),
      },
      to: hourAllocConflicts,
    };
  }

  return conflictObject;
}

function getSingleClassDemandConflict(demandClassData) {
  let singleClassDemandConflicts = [];
  demandClassData.forEach((iterClass) => {
    /*
      forEach class, check if there is a room capacity conflict.
      it checks if the capacity is smaller than the expected demand.
      and also if there is a demand and a capacity.
      If there is, add it to the list of conflicts.
    */
    // Checking if there is a conflict
    const expectedDemand = iterClass.expectedDemand;
    const capacity = iterClass.roomCapacity;
    const hasRoomSmallerThanDemand = capacity < expectedDemand;

    // Checking nullability
    const hasExpectedDemand = expectedDemand !== null;
    const hasCapacity = capacity !== null;
    const hasDemandAndCapacity = hasExpectedDemand && hasCapacity;

    const hasConflict = hasDemandAndCapacity && hasRoomSmallerThanDemand;
    if (hasConflict) {
      const conflictObject = {
        expectedDemand: expectedDemand,
        capacity: capacity,
        type: options.conflicts.roomCapacity,
        idClass: iterClass.idClass,
        idClassTime: iterClass.idClassTime,
        idRoom: iterClass.idRoom,
      };
      singleClassDemandConflicts.push(conflictObject);
    }
  });
  // console.log("singleClassDemandConflicts", singleClassDemandConflicts);
  return singleClassDemandConflicts;
}

export { searchSameDayAndHour, getSingleClassDemandConflict };
