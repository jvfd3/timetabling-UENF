import options from "../../DB/local/options";

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

  horarios.forEach((iterClasstime) => {
    let sameDay = horario.dia === iterClasstime.dia;
    let sameHour = horario.horaInicio === iterClasstime.horaInicio;
    let duracaoConflito =
      horario.horaInicio < iterClasstime.horaInicio + iterClasstime.duracao &&
      horario.horaInicio + horario.duracao > iterClasstime.horaInicio;

    if (sameDay && (sameHour || duracaoConflito)) {
      let iterConflict = {
        idTurma: iterClasstime.idTurma,
        idHorario: iterClasstime.idHorario,
      };
      hourAllocConflicts.push(iterConflict);
    }
  });

  let conflictObject = {};
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
  } else {
    conflictObject = null;
  }

  return conflictObject;
}
export { searchSameDayAndHour };
