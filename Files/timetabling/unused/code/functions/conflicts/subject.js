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

function getSubjectStyledConflict(turma) {
  let semestreAtual = turma?.semestre;
  const expectedSemester = turma?.disciplina?.periodo;
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

export { getSubjectStyledConflict };
