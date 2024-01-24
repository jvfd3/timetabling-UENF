import options from "../../DB/local/options";
import { getId } from "../auxCRUD";

let baseStyle = {
  title: "Conflitos Professor",
  style: {
    backgroundColor: options.config.colors.conflicts.noProblem.professor,
  },
};

function getColorByLevel(conflictLevel) {
  let color = "";
  switch (conflictLevel) {
    case 0:
      color = options.config.colors.conflicts.levels.level0;
      break;
    case 1:
      color = options.config.colors.conflicts.levels.level1;
      break;
    case 2:
      color = options.config.colors.conflicts.levels.level2;
      break;
    case 3:
      color = options.config.colors.conflicts.levels.level3;
      break;
    default:
      color = options.config.colors.conflicts.levels.level4;
      break;
  }
  return color;
}

/* Professor \/ */

function getProfessorAllocConflictMessage(profConflicts) {
  // console.log(profConflicts);
  let message = "";
  profConflicts.forEach((conflito) => {
    message += `"${conflito.type.name}", `;
    message += `${conflito.time.day} às ${conflito.time.hour}h, com as turmas:\n`;
    conflito.to.forEach((turmaConflituosa) => {
      message += `--- Turma: ${turmaConflituosa.idTurma}, `;
      message += `horário: ${getId(turmaConflituosa)}\n`;
    });
  });
  return message;
}

function getProfessorStyledConflict(conflicts, classItem) {
  /*  Posso fazer isso de algumas formas:
- Mais simples:
  - Se a lista de conflitos existir: vermelho.
- Mais preciso:
  - Contar a quantidade de conflitos e deixar cada vez mais vermelho conforme a quantidade de conflitos aumenta.
- Mais preciso ainda:
  - Contar a quantidade de conflitos e multiplicar pelo peso de cada conflito.
  */
  let profConflicts = conflicts.professor.alloc;
  // console.log("profConflicts", profConflicts);
  let size = profConflicts.length;
  let profConflictsLevel = size > 0 ? 3 : 0;

  let currentStyle = { ...baseStyle };

  let color = getColorByLevel(profConflictsLevel);
  currentStyle.style = { backgroundColor: color };
  currentStyle.title = "Sem conflitos de alocação múltipla de professor";

  // console.log("profConflicts", profConflicts);

  /*
- Se hover conflitos:
  - Para cada conflito:
    - adicionar à mensagem de conflito o dia e hora do conflito que está em conflito.time.day e conflito.time.hour
      - Exemplo: mensagem = `${conflito.time.day} às ${conflito.time.hour} `
    - adicionar à mensagem de conflito o nome do conflito que está em conflito.type.name
      - Exemplo: mensagem `há o conflito "${conflito.type.name}"`
    - adicionar à mensagem de conflito o códigos de turma e horario que estão em conflito.
      - Os horários de mesma turma devem estar agrupados.
        Ex.: "com as turmas: ${JSON.stringify(conflito.to)}."
  - definir o currentStyle.title como mensagem
*/

  const hasProfessor = classItem.professor !== null;
  if (!hasProfessor) {
    currentStyle.title = "Professor não definido";
    currentStyle.style = {
      backgroundColor: options.config.colors.notSetProfessor,
    };
  }

  let mensagem = getProfessorAllocConflictMessage(profConflicts);
  if (mensagem !== "") {
    currentStyle.title = mensagem;
  }

  // console.log("currentStyle", currentStyle);
  return currentStyle;
}

/* Professor /\ */

/* Disciplina \/ */

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
    newColor = options.config.colors.notSetSubject;
  } else {
    newColor = getColorGradient(expectedSemester, semestreAtual);
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

/* Disciplina /\ */

function getDemandStyledConflict(conflicts, classItem) {
  console.log("classItem", classItem);
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
    titleMessage = `Há ${numberOfConflicts} conflitos de demanda.`;
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
      titleMessage += `\n\t- Sobraram ${diff} alunos `;
      titleMessage += `na Sala ${idRoom} `;
      titleMessage += `do Horário ${idClassTime} `;
      titleMessage += `da Turma ${idClass}`;
    });
    // titleMessage += `\nNo pior caso ${surplus} alunos ficam de fora`;
  }

  const hasDemand = classItem.demandaEstimada !== null;
  if (!hasDemand) {
    titleMessage = "Demanda não definida";
    newColor = options.config.colors.notSetDemand;
  }

  demandStyle.title = titleMessage;
  demandStyle.style = { backgroundColor: newColor };
  return demandStyle;
}

/* Demand /\ */

function getStyledConflict(conflicts, classItem, semester) {
  let myClassConflicts = {};
  myClassConflicts.demanda = {
    title: "Conflitos Demanda",
    style: {
      backgroundColor: options.config.colors.conflicts.hasConflict.demand,
    },
  };
  myClassConflicts.disciplina = getSubjectStyledConflict(classItem, semester);
  myClassConflicts.professor = getProfessorStyledConflict(conflicts, classItem);
  myClassConflicts.demand = getDemandStyledConflict(conflicts, classItem);
  return myClassConflicts;
}

function isConflict(conflicts, classTimeId) {
  return;
}

function classTimeConflicts(conflicts, classTime) {
  const conflictStyles = {
    day: {},
    hour: {},
    classRoom: {
      title: "Sala",
      style: { backgroundColor: "" },
    },
    duration: {
      title: "Conflito de duração ainda não implementado",
    },
  };

  const classTimeId = getId(classTime);

  const professorConflicts = conflicts.raw.professor.alloc;
  const hasProfessorConflict = professorConflicts.some(
    (conflict) => conflict?.from?.idHorario === classTimeId
  );

  const singleDemandConflicts =
    conflicts.raw.expectedDemand.singleTurmaCapacity;
  const hasDemandConflict = singleDemandConflicts.some(
    (conflict) => conflict?.idClassTime === classTimeId
  );

  if (hasProfessorConflict) {
    conflictStyles.day = conflicts.styled.professor;
    conflictStyles.hour = conflicts.styled.professor;
  }
  if (hasDemandConflict) {
    conflictStyles.classRoom = conflicts.styled.demand;
  }

  return conflictStyles;
}

export { getStyledConflict, classTimeConflicts };
