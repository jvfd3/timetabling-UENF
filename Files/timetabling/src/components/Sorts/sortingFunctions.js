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
    const yearA = a?.ano ?? "";
    const yearB = b?.ano ?? "";
    const semesterA = a?.semestre ?? "";
    const semesterB = b?.semestre ?? "";
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

function sortRooms(rooms) {
  const orderedRooms = rooms.sort((a, b) => {
    const capacityA = a?.capacidade ?? "";
    const capacityB = b?.capacidade ?? "";
    const blockA = a?.bloco ?? "";
    const blockB = b?.bloco ?? "";
    const codeA = a?.codigo ?? "";
    const codeB = b?.codigo ?? "";

    if (capacityA !== capacityB) {
      return capacityA - capacityB;
    } else if (blockA !== blockB) {
      return blockA.localeCompare(blockB);
    } else {
      return codeA.localeCompare(codeB);
    }
  });

  return orderedRooms;
}

export { sortClassTimes, sortClasses, sortRooms };
