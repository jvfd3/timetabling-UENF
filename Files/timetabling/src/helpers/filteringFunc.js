import { getId } from "./auxCRUD";
import {
  getValueFromDataWithPropArray,
  getValueFromObject,
} from "./auxFunctions";

function generalFilter(originData, originPropArray, propValueToFind) {
  const filteredData = originData.filter((iterData) => {
    const propValue = getValueFromDataWithPropArray(iterData, originPropArray);
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
    return generalFilter(classes, ["disciplina", "id"], getId(subject));
  }
  return classes;
}

function filterProfessor(classes, professor) {
  if (professor) {
    return generalFilter(classes, ["professor", "id"], getId(professor));
  }
  return classes;
}

function filterRoom(classes, room) {
  if (room) {
    return generalFilter(classes, ["sala", "id"], getId(room));
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
