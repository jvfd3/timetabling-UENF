import constantValues from "../../config/constantValues";

function sortClassTimes(classTimes) {
  const days = constantValues.days;
  let orderedClassTimes = [];

  days.forEach((day) => {
    const filteredClassTimes = classTimes.filter(
      (classTime) => classTime.dia === day.value
    );
    filteredClassTimes.sort((a, b) => {
      const aTime = a.horaInicio;
      const bTime = b.horaInicio;
      return aTime - bTime;
    });
    orderedClassTimes = [...orderedClassTimes, ...filteredClassTimes];
  });

  return orderedClassTimes;
}

function sortClasses(classes) {
  const orderedClasses = classes.sort((a, b) => {
    const yearA = a?.ano;
    const yearB = b?.ano;
    const semesterA = a?.semestre;
    const semesterB = b?.semestre;
    const subjectA = a?.disciplina?.nome ?? "";
    const subjectB = b?.disciplina?.nome ?? "";
    const professorA = a?.professor?.nome ?? "";
    const professorB = b?.professor?.nome ?? "";

    if (yearA !== yearB) {
      return yearA - yearB;
    } else if (semesterA !== semesterB) {
      return semesterA - semesterB;
    } else if (subjectA !== subjectB) {
      return subjectA.localeCompare(subjectB);
    } else {
      return professorA.localeCompare(professorB);
    }
  });

  return orderedClasses;
}

export { sortClassTimes, sortClasses };
