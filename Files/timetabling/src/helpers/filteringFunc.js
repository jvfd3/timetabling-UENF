import { getValueFromObject } from "./auxFunctions";

function getValueFromDataWithPropArray(data, propArray) {
  // Inicializa o valor com os dados iniciais
  let value = data;

  // Itera sobre cada propriedade no array de propriedades
  for (let prop of propArray) {
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
  // console.log("originData", originData);
  // console.log("originPropArray", originPropArray);
  // console.log("propValueToFind", propValueToFind);

  const filteredData = originData.filter((data) => {
    const propValue = getValueFromDataWithPropArray(data, originPropArray);
    // console.log("propValue", propValue);
    if (propValue === undefined) {
      // console.log("data", data);
    }
    const found = propValue === propValueToFind;
    return found;
  });
  return filteredData;
}

function filterYear(classes, year) {
  let filteredClasses = classes;
  if (year) {
    filteredClasses = generalFilter(classes, ["ano"], getValueFromObject(year));
  }
  // console.log("year", year);
  // console.log("yearClasses", yearClasses);
  // console.log("yearClasses", filteredClasses);
  return filteredClasses;
}

function filterSemester(classes, semester) {
  let filteredClasses = classes;
  if (semester) {
    filteredClasses = generalFilter(
      classes,
      ["semestre"],
      getValueFromObject(semester)
    );
  }
  // console.log("semester", semester);
  // console.log("semesterClasses", semesterClasses);
  // console.log("semesterClasses", filteredClasses);
  return filteredClasses;
}

function filterHour(classes, hour) {
  let filteredClasses = classes;
  if (hour) {
    filteredClasses = generalFilter(classes, ["horaInicio"], hour);
  }
  // console.log("hour", hour);
  return filteredClasses;
}

function filterDay(classes, day) {
  let filteredClasses = classes;
  if (day) {
    filteredClasses = generalFilter(classes, ["dia"], day);
  }
  // console.log("day", day);
  // console.log("dayClasses", filteredClasses);
  return filteredClasses;
}

function filterProfessor(classes, professor) {
  let filteredClasses = classes;
  if (professor) {
    filteredClasses = generalFilter(
      classes,
      ["professor", "id"],
      professor?.id
    );
  }
  // console.log("professor", professor);
  // console.log("professorClasses", professorClasses);
  // console.log("professorClasses", filteredClasses);
  return filteredClasses;
}

function filterRoom(classes, room) {
  let filteredClasses = classes;
  if (room) {
    filteredClasses = generalFilter(classes, ["sala", "id"], room?.id);
  }
  // console.log("room", room);
  // console.log("roomClasses", roomClasses);
  // console.log("roomClasses", filteredClasses);
  return filteredClasses;
}

function filterExpectedSemester(classes, expectedSemester) {
  let filteredClasses = classes;
  if (expectedSemester) {
    filteredClasses = generalFilter(
      classes,
      ["disciplina", "periodo"],
      expectedSemester?.value ?? expectedSemester
    );
  }
  // console.log("classes", classes.length);
  // console.log("classes", classes);
  // console.log("expectedSemester", expectedSemester);
  // console.log("expectedSemesterClasses", expectedSemesterClasses.length);
  // console.log("expectedSemesterClasses", filteredClasses.length);
  return filteredClasses;
}

export {
  /* Internal Use Only ? */
  // getValueFromDataWithPropArray,
  // generalFilter,

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
