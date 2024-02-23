import configInfo from "../config/configInfo";
import constantValues from "../config/constantValues";

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

export {
  menuIsOpen,
  getValueFromObject,
  getDefaultYearSemesterValues,
  getValueFromDataWithPropArray,
};
