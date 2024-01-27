import options from "../../../DB/local/options";
import { getId } from "../../auxCRUD";
import { getDurationStyledConflict } from "./styleDuration";
import { getProfessorStyledConflict } from "./styleProfessor";
import { getRoomStyledConflict } from "./styleRoom";

/* \/ Subject \/ */

function checkCorrectPeriodParity(expectedSemester, currentSemester) {
  const evenSubjectOnEvenSemester =
    currentSemester === 1 && expectedSemester % 2 === 1;
  const oddSubjectOnOddSemester =
    currentSemester === 2 && expectedSemester % 2 === 0;
  const correctPeriodParity =
    evenSubjectOnEvenSemester || oddSubjectOnOddSemester;
  const isSummerSemester = currentSemester === 3;
  const rightOrWrongParity = correctPeriodParity ? 1 : -1;
  const returnedParity = isSummerSemester ? 0 : rightOrWrongParity;
  return returnedParity;
}

function getColorGradient(periodoEsperado, semestreAtual) {
  function getColorValue(baseColor, percentile) {
    let maxValue = 255;
    // let colorValue = Math.floor(baseColor - percentile * (maxValue - baseColor));
    let colorValue = Math.floor(maxValue + 70 - percentile * maxValue);
    return colorValue;
  }
  let grayValue = 128;
  let color = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
  // console.log("periodoEsperado", periodoEsperado);
  // console.log("semestreAtual", semestreAtual);
  let baseColor = 200; //Maior deixa mais claro
  if (periodoEsperado !== 0) {
    if (semestreAtual === 3) {
      // Semestre de verão
      let percentile = periodoEsperado / 10;
      let colorValue = getColorValue(baseColor, percentile);
      color = `rgb(${colorValue}, ${colorValue}, 0)`;
    } else {
      let percentile = Math.ceil(periodoEsperado / 2) / 5;
      let colorValue = getColorValue(baseColor, percentile);
      const parityCheck = checkCorrectPeriodParity(
        periodoEsperado,
        semestreAtual
      );
      if (parityCheck == 1) {
        //Semestres no período correto
        color = `rgb(0, ${colorValue}, 0)`;
      } else if (parityCheck == -1) {
        //Semestres no período errado
        color = `rgb(${colorValue}, 0, 0)`;
      }
    }
  }
  return color;
}

function getSubjectStyledConflict(turma, semestreAtual) {
  const expectedSemester = turma.disciplina?.periodo;
  let subjectStyle = {};
  let newColor = "";
  let titleMessage = "";
  if (expectedSemester === undefined) {
    titleMessage = "Disciplina ainda não definida";
    newColor = options.config.colors.conflicts.notSet.subject;
  } else {
    newColor = getColorGradient(expectedSemester, semestreAtual);
    // console.log(newColor);
    if (expectedSemester === 0) {
      titleMessage = "Disciplina não-obrigatória";
    } else {
      titleMessage = `Disciplina do período ${expectedSemester}\n`;
      const parity = checkCorrectPeriodParity(expectedSemester, semestreAtual);
      if (parity === 0) {
        titleMessage += "Não há";
      } else if (parity === 1) {
        titleMessage += "Está na";
      } else if (parity === -1) {
        titleMessage += "Não está na";
      }
      titleMessage += " paridade esperada";
    }
  }

  subjectStyle.title = titleMessage;
  subjectStyle.style = { backgroundColor: newColor };
  return subjectStyle;
}

/* \/ Subject /\ */

/* \/ Demand \/ */

function getDemandStyledConflict(conflicts, classItem) {
  // console.log("classItem", classItem);
  let demandConflicts = conflicts.expectedDemand.singleTurmaCapacity;
  let newColor = options.config.colors.conflicts.noProblem.demand;
  let titleMessage = "Não foi identificado conflitos de demanda";
  let demandStyle = {
    title: newColor,
    style: titleMessage,
  };
  // console.log("demandConflicts", demandConflicts); //idRoom Undefined
  let numberOfConflicts = demandConflicts.length;
  if (numberOfConflicts > 0) {
    newColor = options.config.colors.conflicts.hasConflict.demand;
    titleMessage = `❌ Conflito: demanda X capacidade.\n\t- Há ${numberOfConflicts} conflitos de demanda.`;
    let surplus = 0;
    demandConflicts.forEach((iterConflict) => {
      // console.log("iterConflict", iterConflict);
      let cap = iterConflict.capacity;
      let demand = iterConflict.expectedDemand;
      let diff = demand - cap;
      surplus = diff > surplus ? diff : surplus;
      let idRoom = iterConflict.idRoom;
      let idClassTime = iterConflict.idClassTime;
      let idClass = iterConflict.idClass;
      titleMessage += `\n\t-- Sobraram ${diff} alunos `;
      titleMessage += `na Sala ${idRoom} `;
      titleMessage += `do Horário ${idClassTime} `;
      titleMessage += `da Turma ${idClass}\n`;
    });
    // titleMessage += `\nNo pior caso ${surplus} alunos ficam de fora`;
  }

  const hasDemand = classItem.demandaEstimada !== null;
  if (!hasDemand) {
    titleMessage = "Demanda não definida";
    newColor = options.config.colors.conflicts.notSet.demand;
  }

  demandStyle.title = titleMessage;
  demandStyle.style = { backgroundColor: newColor };
  return demandStyle;
}

/* \/ Demand /\ */

function getStyledItemConflict(conflicts, classItem, semester) {
  let myClassConflicts = {};
  myClassConflicts.disciplina = getSubjectStyledConflict(classItem, semester);
  myClassConflicts.professor = getProfessorStyledConflict(conflicts, classItem);
  myClassConflicts.demand = getDemandStyledConflict(conflicts, classItem);
  return myClassConflicts;
}

function getNullClassTimeConflicts(classTime) {
  const foundNullProps = {
    room: classTime?.sala === null,
    day: classTime?.dia === null,
    hour: classTime?.horaInicio === null,
    duration: classTime?.duracao === null,
  };
  return foundNullProps;
}

function setNullStyles(conflictStyles, classTime) {
  const isNull = getNullClassTimeConflicts(classTime);
  const notSetTexts = {
    room: "Sala não definida",
    day: "Dia não definido",
    hour: "Hora não definida",
    duration: "Duração não definida",
  };
  if (isNull.room) {
    conflictStyles.classRoom = {
      title: notSetTexts.room,
      style: { backgroundColor: options.config.colors.conflicts.notSet.room },
    };
  }
  if (isNull.day) {
    conflictStyles.day = {
      title: notSetTexts.day,
      style: { backgroundColor: options.config.colors.conflicts.notSet.day },
    };
  }
  if (isNull.hour) {
    conflictStyles.hour = {
      title: notSetTexts.hour,
      style: { backgroundColor: options.config.colors.conflicts.notSet.hour },
    };
  }
  if (isNull.duration) {
    conflictStyles.duration = {
      title: notSetTexts.duration,
      style: {
        backgroundColor: options.config.colors.conflicts.notSet.duration,
      },
    };
  }
  /*
    const keys = ['room', 'day', 'hour', 'duration'];

    keys.forEach((key) => {
      if (isNull[key]) {
        conflictStyles[key] = {
          title: notSetTexts[key],
          style: { backgroundColor: options.config.colors.conflicts.notSet[key] },
        };
      }
    });
  */
  return conflictStyles;
}

function oldClassTimeConflicts(conflicts, classTime) {
  let conflictStyles = {
    hour: {
      title: "Nenhum conflito encontrado",
      style: { backgroundColor: "" },
    },
    day: {
      title: "Nenhum conflito encontrado",
      style: { backgroundColor: "" },
    },
  };

  const classTimeId = getId(classTime);

  const professorConflicts = conflicts.raw.professor.alloc;
  const hasProfessorConflict = professorConflicts.some(
    (conflict) => conflict?.from?.idHorario === classTimeId
  );

  if (hasProfessorConflict) {
    conflictStyles.day = conflicts.styled.professor;
    conflictStyles.hour = conflicts.styled.professor;
  }

  conflictStyles = setNullStyles(conflictStyles, classTime);

  return conflictStyles;
}

function classTimeConflicts(conflicts, classTime) {
  let conflictStyles = {};
  conflictStyles.old1 = conflicts;
  conflictStyles.old2 = oldClassTimeConflicts(conflictStyles.old1, classTime);
  conflictStyles.room = getRoomStyledConflict(conflictStyles.old1, classTime);
  conflictStyles.duration = getDurationStyledConflict(
    conflictStyles,
    classTime
  );
  // console.log("conflictStyles", conflictStyles);
  return conflictStyles;
}

export { getStyledItemConflict, classTimeConflicts };
