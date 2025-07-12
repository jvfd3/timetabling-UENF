import configInfo from "../config/configInfo";
import constantValues from "../config/constantValues";
import { getId } from "./auxCRUD";

const isDebugging = configInfo.isDebugging;

function getValueFromObject(myObject) {
  const objectValue = myObject?.hora ?? myObject?.value ?? myObject ?? null;
  return objectValue;
}

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

function getDefaultYearSemesterValues() {
  const years = constantValues.years;
  const yearIndex = configInfo.defaultIndexes.year;
  const year = years[yearIndex];
  const yearValue = getValueFromObject(year);

  const semesters = constantValues.semesters;
  const semesterIndex = configInfo.defaultIndexes.semester;
  const semester = semesters[semesterIndex];
  const semesterValue = getValueFromObject(semester);

  const yearSemester = {
    year: yearValue,
    semester: semesterValue,
  };

  return yearSemester;
}

function menuIsOpen(context) {
  const possibleContexts = ["value", "menu"];
  return context === possibleContexts[1];
}

function mergeClassesToClassTimes(classes, classTimes) {
  // WIP
  let newClasses = [];
  for (let idx in classes) {
    const classItem = classes[idx];
    const classItemId = getId(classItem);
    const classTimesForClass = classTimes.filter(
      (classTime) => classTime?.idTurma === classItemId
    );
    classItem.horarios = classTimesForClass;
    isDebugging && console.log(classTimesForClass);
    newClasses.push(classItem);
  }
  return newClasses;
}

export {
  menuIsOpen,
  getValueFromObject,
  mergeClassesToClassTimes,
  getDefaultYearSemesterValues,
  getValueFromDataWithPropArray,
};
