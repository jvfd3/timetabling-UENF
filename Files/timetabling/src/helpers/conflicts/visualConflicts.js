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
  let mensagem = "";
  profConflicts.forEach((conflito) => {
    mensagem += `"${conflito.type.name}", `;
    mensagem += `${conflito.time.day} às ${conflito.time.hour}h, com as turmas:\n`;
    conflito.to.forEach((turmaConflituosa) => {
      mensagem += `--- Turma: ${turmaConflituosa.idTurma}, horário: ${turmaConflituosa.idHorario}\n`;
    });
  });
  return mensagem;
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
  console.log("semestreAtual", semestreAtual);
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
      if (evenSubjectOnEvenSemester || oddSubjectOnOddSemester) {
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
  let periodoEsperado = turma.disciplina.periodo;
  let newColor = getColorGradient(periodoEsperado, semestreAtual);
  let subjectStyle = {
    title: "Disciplina do período " + periodoEsperado,
    style: { backgroundColor: newColor },
  };
  return subjectStyle;
}

/* Disciplina /\ */

function getStyledConflict(conflicts, turma, semestre) {
  let myClassConflicts = {};
  myClassConflicts.demanda = {
    title: "Conflitos Demanda",
    style: { backgroundColor: "#d9b57c" },
  };
  myClassConflicts.disciplina = getSubjectStyledConflict(turma, semestre);
  myClassConflicts.professor = getProfessorStyledConflict(conflicts);
  return myClassConflicts;
}

export { getStyledConflict };
