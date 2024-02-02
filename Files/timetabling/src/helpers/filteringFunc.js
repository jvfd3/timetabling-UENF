import { getValueFromObject } from "./auxFunctions";

function getValueFromDataWithPropArray(data, propArray) {
  // Inicializa o valor com os dados iniciais
  let value = data;

  // Itera sobre cada propriedade no array de propriedades
  for (const prop of propArray) {
    // Se o valor atual é um objeto e tem a propriedade atual, atualiza o valor
    if (value && value.hasOwnProperty(prop)) {
      value = value[prop];
    } else {
      // Se o valor atual não é um objeto ou não tem a propriedade atual, retorna undefined
      return undefined;
    }
  }

  // Retorna o valor final
  return value;
}

function generalFilter(originData, originPropArray, propValueToFind) {
  const filteredData = originData.filter((data) => {
    const propValue = getValueFromDataWithPropArray(data, originPropArray);
    const found = propValue === propValueToFind;
    return found;
  });
  return filteredData;
}

function filterYear(classes, year) {
  if (year) {
    return generalFilter(classes, ["ano"], getValueFromObject(year));
  }
  return classes;
}

function filterSemester(classes, semester) {
  if (semester) {
    return generalFilter(classes, ["semestre"], getValueFromObject(semester));
  }
  return classes;
}

function filterHour(classes, hour) {
  if (hour) {
    return generalFilter(classes, ["horaInicio"], hour);
  }
  return classes;
}

function filterDay(classes, day) {
  if (day) {
    return generalFilter(classes, ["dia"], day);
  }
  return classes;
}

function filterExpectedSemester(classes, expectedSemester) {
  if (expectedSemester) {
    return generalFilter(
      classes,
      ["disciplina", "periodo"],
      getValueFromObject(expectedSemester)
    );
  }
  return classes;
}

function filterSubject(classes, subject) {
  if (subject) {
    return generalFilter(classes, ["disciplina", "id"], subject?.id);
  }
  return classes;
}

function filterProfessor(classes, professor) {
  if (professor) {
    return generalFilter(classes, ["professor", "id"], professor?.id);
  }
  return classes;
}

function filterRoom(classes, room) {
  if (room) {
    return generalFilter(classes, ["sala", "id"], room?.id);
  }
  return classes;
}

export {
  /* Internal Use Only ? */
  // getValueFromDataWithPropArray,
  // generalFilter,

  /* Disciplinas */
  filterSubject,

  /* CCTurmas */
  filterHour,
  filterDay,
  filterProfessor,
  filterRoom,
  filterExpectedSemester,

  /* MultiTurmas too */
  filterYear,
  filterSemester,
};
