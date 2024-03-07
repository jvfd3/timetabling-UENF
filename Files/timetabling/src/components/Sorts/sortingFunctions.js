import { getValueFromDataWithPropArray } from "../../helpers/auxFunctions";

function mySorting(a, b, sortOrder) {
  function compare(a, b) {
    const STRING = "string";
    const NUMBER = "number";
    // const OBJECT = "object";

    const typeA = typeof a;
    const typeB = typeof b;

    const aIsString = typeA === STRING;
    const bIsString = typeB === STRING;
    const aIsNumber = typeA === NUMBER;
    const bIsNumber = typeB === NUMBER;

    if (aIsNumber && bIsNumber) {
      return a - b;
    }
    if (aIsString && bIsString) {
      return a.localeCompare(b);
    }
    if ((aIsString && bIsNumber) || (aIsNumber && bIsString)) {
      return a.toString().localeCompare(b.toString());
    }
    // if (typeA === OBJECT && typeB === OBJECT) {
    //   return compareObjects(a, b);
    // }
    return 0;
  }

  // For each propPath in sortOrder, compare the values of a and b
  for (const propPathList of sortOrder) {
    let newPathList = [...propPathList];
    const reverse = newPathList[0] === "-";
    if (reverse) {
      newPathList.shift();
    }

    let propValueA = getValueFromDataWithPropArray(a, newPathList) ?? "";
    let propValueB = getValueFromDataWithPropArray(b, newPathList) ?? "";

    if (propValueA !== propValueB) {
      const comparisonResult = reverse
        ? compare(propValueB, propValueA)
        : compare(propValueA, propValueB);
      return comparisonResult;
    }
  }
  // I guess if nothing was returned before, 0 means they are equal
  return 0;
}

function sortClassTimes(classTimes) {
  classTimes = classTimes ?? [];
  const daysOrder = { SEG: 1, TER: 2, QUA: 3, QUI: 4, SEX: 5 };
  classTimes.forEach((classTime) => {
    classTime.dayOrder = daysOrder[classTime.dia];
  });

  const sortOrder = [
    ["ano"],
    ["semestre"],
    ["dayOrder"],
    ["horaInicio"],
    ["disciplina", "periodo"],
    ["disciplina", "nome"],
    ["professor", "nome"],
    ["demandaEstimada"],
    ["id"],
  ];
  classTimes.sort((a, b) => mySorting(a, b, sortOrder));

  classTimes.forEach((classTime) => {
    delete classTime.dayOrder;
  });

  return classTimes;
}

function sortClassesSelection(classes) {
  const sortOrder = [
    ["ano"],
    ["semestre"],
    // ["disciplina", "periodo"],
    ["disciplina", "nome"],
    ["professor", "nome"],
    ["id"],
  ];
  const orderedClasses = classes.sort((a, b) => mySorting(a, b, sortOrder));
  return orderedClasses;
}

function sortMultiClasses(classes) {
  const sortOrder = [
    ["ano"],
    ["semestre"],
    ["disciplina", "periodo"],
    ["disciplina", "nome"],
    ["description"],
    ["-", "horarios", "length"],
    ["demandaEstimada"],
    ["professor", "nome"],
    ["id"],
  ];
  const orderedClasses = classes.sort((a, b) => mySorting(a, b, sortOrder));
  return orderedClasses;
}

function sortRooms(rooms) {
  const sortOrder = [["capacidade"], ["bloco"], ["codigo"], ["id"]];
  const orderedRooms = rooms.sort((a, b) => mySorting(a, b, sortOrder));
  return orderedRooms;
}

function sortNotOfferedSubjects(subjects) {
  const sortOrder = [
    ["periodo"],
    ["center"],
    ["laboratory"],
    ["codigo"],
    ["id"],
  ];
  const orderedSubjects = subjects.sort((a, b) => mySorting(a, b, sortOrder));
  return orderedSubjects;
}

function sortSubjects(subjects) {
  /*   subject: {
  id: null, //INT
  periodo: null, //INT
  validityStartYear: null, //INT
  validityStartSemester: null, //INT
  validityEndYear: null, //INT
  validityEndSemester: null, //INT
  codigo: null, //STR
  apelido: null, //STR
  nome: null, //STR
  center: null, //STR
  laboratory: null, //STR
}, */
  const sortOrder = [["periodo"], ["center"], ["laboratory"], ["nome"], ["id"]];
  const orderedSubjects = subjects.sort((a, b) => mySorting(a, b, sortOrder));
  return orderedSubjects;
}

export {
  sortNotOfferedSubjects,
  sortMultiClasses,
  sortClassTimes,
  sortSubjects,
  sortClassesSelection,
  sortRooms,
};
