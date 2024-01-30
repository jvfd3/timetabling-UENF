import options from "../DB/local/options";

function getValueFromObject(myObject) {
  const objectValue = myObject?.hora ?? myObject?.value ?? myObject ?? null;
  return objectValue;
}

function getDefaultYearSemesterValues() {
  const years = options.constantValues.years;
  const yearIndex = options.config.defaultIndexes.year;
  const year = years[yearIndex];
  const yearValue = getValueFromObject(year);

  const semesters = options.constantValues.semesters;
  const semesterIndex = options.config.defaultIndexes.semester;
  const semester = semesters[semesterIndex];
  const semesterValue = getValueFromObject(semester);

  const yearSemester = {
    year: yearValue,
    semester: semesterValue,
  };

  return yearSemester;
}

export { getDefaultYearSemesterValues, getValueFromObject };
