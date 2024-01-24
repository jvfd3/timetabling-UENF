import { getId } from "../auxCRUD";

let baseStyle = {
  title: "Conflitos Professor",
  style: { backgroundColor: "#84d47d" },
};

function getColorByLevel(conflictLevel) {
  let color = "";
  switch (conflictLevel) {
    case 0:
      color = "#008B45";
      break;
    case 1:
      color = "#D7B740";
      break;
    case 2:
      color = "#D77A61";
      break;
    case 3:
      color = "#8B0000";
      break;
    default:
      color = "#708090";
      break;
  }
  return color;
}

/* Professor \/ */

function getProfessorAllocConflictMessage(profConflicts) {
  console.log(profConflicts);
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

function getProfessorStyledConflict(conflicts) {
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

  let mensagem = getProfessorAllocConflictMessage(profConflicts);
  if (mensagem !== "") {
    currentStyle.title = mensagem;
  }

  // console.log("currentStyle", currentStyle);
  return currentStyle;
}

/* Professor /\ */

/* Disciplina \/ */

function checkCorrectPeriodParity(periodoEsperado, semestreAtual) {
  let evenSubjectOnEvenSemester =
    semestreAtual === 1 && periodoEsperado % 2 === 1;
  let oddSubjectOnOddSemester =
    semestreAtual === 2 && periodoEsperado % 2 === 0;
  let correctPeriodParity =
    evenSubjectOnEvenSemester || oddSubjectOnOddSemester;
  return correctPeriodParity;
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
      let evenSubjectOnEvenSemester =
        semestreAtual === 1 && periodoEsperado % 2 === 1;
      let oddSubjectOnOddSemester =
        semestreAtual === 2 && periodoEsperado % 2 === 0;
      if (checkCorrectPeriodParity(periodoEsperado, semestreAtual)) {
        //Semestres no período correto
        color = `rgb(0, ${colorValue}, 0)`;
      } else {
        //Semestres no período errado
        color = `rgb(${colorValue}, 0, 0)`;
      }
    }
  }
  return color;
}

function getSubjectStyledConflict(turma, semestreAtual) {
  let subjectStyle = {};
  let periodoEsperado = turma.disciplina?.periodo;
  let newColor = "";
  let titleMessage = "";
  if (periodoEsperado === undefined) {
    titleMessage = "Disciplina ainda não definida";
    newColor = "#708090";
  } else {
    newColor = getColorGradient(periodoEsperado, semestreAtual);
    if (periodoEsperado === 0) {
      titleMessage = "Disciplina não-obrigatória";
    } else {
      titleMessage = `Disciplina do período ${periodoEsperado}\n`;
      let periodoCerto = checkCorrectPeriodParity(
        periodoEsperado,
        semestreAtual
      );
      titleMessage += periodoCerto ? "Está" : "Não está";
      titleMessage += " na paridade esperada";
    }
  }

  subjectStyle.title = titleMessage;
  subjectStyle.style = { backgroundColor: newColor };
  return subjectStyle;
}

/* Disciplina /\ */

function getDemandStyledConflict(conflicts) {
  let demandConflicts = conflicts.expectedDemand.singleTurmaCapacity;
  let newColor = "#008B45";
  let titleMessage = "Não foi identificado conflitos de demanda";
  let demandStyle = {
    title: newColor,
    style: titleMessage,
  };
  // console.log("demandConflicts", demandConflicts); //idRoom Undefined
  let numberOfConflicts = demandConflicts.length;
  if (numberOfConflicts > 0) {
    newColor = "#DD3333";
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
  demandStyle.title = titleMessage;
  demandStyle.style = { backgroundColor: newColor };
  return demandStyle;
}

/* Demand /\ */

function getStyledConflict(conflicts, classItem, semester) {
  let myClassConflicts = {};
  myClassConflicts.demanda = {
    title: "Conflitos Demanda",
    style: { backgroundColor: "#d9b57c" },
  };
  myClassConflicts.disciplina = getSubjectStyledConflict(classItem, semester);
  myClassConflicts.professor = getProfessorStyledConflict(conflicts);
  myClassConflicts.demand = getDemandStyledConflict(conflicts);
  return myClassConflicts;
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

  const professorConflicts = conflicts.raw.professor.alloc;

  if (isConflict(professorConflicts)) {
    conflictStyles.day = conflicts.styled.professor;
    conflictStyles.hour = conflicts.styled.professor;
  }

  function isConflict(conflicts) {
    if (conflicts.length > 0) {
      for (const conflict of professorConflicts) {
        if (conflict?.from?.idHorario === getId(classTime)) {
          return true;
        }
      }
    }
    return false;
  }
  return conflictStyles;
}

export { getStyledConflict, classTimeConflicts };
