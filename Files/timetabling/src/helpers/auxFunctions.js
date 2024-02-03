import configInfo from "../config/configInfo";
import constantValues from "../config/constantValues";

function getValueFromObject(myObject) {
  const objectValue = myObject?.hora ?? myObject?.value ?? myObject ?? null;
  return objectValue;
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

export { getDefaultYearSemesterValues, getValueFromObject };
