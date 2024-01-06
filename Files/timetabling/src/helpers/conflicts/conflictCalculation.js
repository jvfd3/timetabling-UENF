import options from "../../DB/local/options";

function searchSameDayAndHour(flatTurmas, horario) {
  /* flatTurmas tem a seguinte estrutura:
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
  let hourAllocConflicts = [];
  // console.log(`(${horario.dia}, ${horario.horaInicio})`, flatTurmas);
  flatTurmas.forEach((iterClasstime) => {
    let sameDay = horario.dia === iterClasstime.dia;
    let dayNotNull = horario.dia !== null || iterClasstime.dia !== null;
    let hourNotNull =
      horario.horaInicio !== null || iterClasstime.horaInicio !== null;
    let dayTimeNotNull = dayNotNull && hourNotNull;
    let sameHour = horario.horaInicio === iterClasstime.horaInicio;
    let duracaoConflito =
      horario.horaInicio < iterClasstime.horaInicio + iterClasstime.duracao &&
      horario.horaInicio + horario.duracao > iterClasstime.horaInicio;
    let sameTime = sameDay && (sameHour || duracaoConflito) && dayTimeNotNull;
    if (sameTime) {
      let iterConflict = {
        idTurma: iterClasstime.idTurma,
        idHorario: iterClasstime.idHorario,
      };
      hourAllocConflicts.push(iterConflict);
    }
  });
  // console.log("hourAllocConflicts", hourAllocConflicts);
  /* The part below should be apart from the upper one*/
  let conflictObject = null;
  let hasConflicts = hourAllocConflicts.length > 0;
  if (hasConflicts) {
    conflictObject = {
      type: options.conflicts.professorAlloc,
      time: {
        day: horario.dia,
        hour: horario.horaInicio,
      },
      from: {
        idTurma: horario.idTurma,
        idHorario: horario.idHorario,
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
    let conflictObject = null;

    // Checking if there is a conflict
    let expectedDemand = iterClass.expectedDemand;
    let capacity = iterClass.roomCapacity;
    let hasRoomSmallerThanDemand = capacity < expectedDemand;

    // Checking nullability
    let hasExpectedDemand = expectedDemand !== null;
    let hasCapacity = capacity !== null;
    let hasDemandAndCapacity = hasExpectedDemand && hasCapacity;

    let hasConflict = hasDemandAndCapacity && hasRoomSmallerThanDemand;
    if (hasConflict) {
      conflictObject = {
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
