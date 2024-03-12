import emptyObjects from "../../../config/emptyObjects";
import { getId } from "../../../helpers/auxCRUD";
import {
  getDefaultYearSemesterValues,
  getValueFromDataWithPropArray,
} from "../../../helpers/auxFunctions";
import { splitTurmas } from "../../../helpers/conflicts/auxConflictFunctions";

function getModes(items) {
  const frequency = {};
  let isObject = false;

  items.forEach((item) => {
    const itemIsObject = typeof item === "object";
    if (itemIsObject) {
      isObject = true;
    }
    item = itemIsObject ? getId(item) : item;
    if (!frequency[item]) {
      frequency[item] = 1;
    } else {
      frequency[item]++;
    }
  });

  const frequencyList = Object.entries(frequency).map(([value, freq]) => {
    const parsed = parseInt(value);
    return {
      value: isNaN(parsed) ? value : parsed,
      frequency: freq,
    };
  });

  frequencyList.sort((a, b) => b.frequency - a.frequency);

  if (isObject) {
    frequencyList.forEach((item) => {
      item.value = items.find((obj) => getId(obj) === item.value);
    });
  }

  const debug = {
    items,
    frequency,
    isObject,
    frequencyList,
    // modes,
    // modesValueList,
  };
  // console.log(debug);

  return frequencyList;
}

function getMostFrequentItem(objArray, propList, numberOfFrequentItems = 1) {
  const itemList = objArray
    .map((classItem) => getValueFromDataWithPropArray(classItem, propList))
    .filter((item) => item !== null);

  const modes = getModes(itemList);
  const slicedModes = modes.slice(0, numberOfFrequentItems);
  const modesValueList = slicedModes.map((mode) => mode.value);

  const debug = {
    objArray,
    itemList,
    modes,
    slicedModes,
    modesValueList,
  };
  // console.log(debug);

  return modesValueList;
}

function getMostFrequentClassTimeSizes(classes) {
  const classTimeSizes = classes
    .map((classItem) => classItem?.horarios?.length)
    .filter((item) => item !== 0);

  const mostFrequentValue = getModes(classTimeSizes)?.[0]?.["value"];

  const debug = {
    classTimeSizes,
    mostFrequentValue,
  };
  // console.log(debug);

  return mostFrequentValue;
}

function getMeanDemand(sameSubjectClasses) {
  const cleanItems = sameSubjectClasses
    .map((classItem) => {
      const uniqueSemester =
        classItem?.ano.toString() + classItem?.semestre.toString();

      const cleanItem = {
        demand: classItem?.demandaEstimada,
        yearSemester: uniqueSemester,
      };
      return cleanItem;
    })
    .filter((cleanItem) => cleanItem?.demand !== null);

  const demands = cleanItems.map((cleanItem) => cleanItem?.demand);
  const yearSemesters = cleanItems.map((cleanItem) => cleanItem?.yearSemester);
  const uniqueYearSemesters = [...new Set(yearSemesters)];

  // // Sum and divide by length to get the mean
  const sum = demands.reduce((a, b) => a + b, 0);
  const size = uniqueYearSemesters.length;
  const meanDemand = size > 0 ? Math.round(sum / size) : null;

  const debug = {
    sameSubjectClasses,
    cleanItems,
    demands,
    yearSemesters,
    uniqueYearSemesters,
    sum,
    size,
    meanDemand,
  };
  // console.log(debug);

  return meanDemand;
}

function getDescription(sameSubjectClasses, { year, semester }) {
  // console.log("sameSubjectClasses", sameSubjectClasses);
  const currentSubjectClasses = sameSubjectClasses.filter(
    (classItem) => classItem.ano === year && classItem.semestre === semester
  );
  const size = currentSubjectClasses.length;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const classItemDescription = size > 0 ? alphabet[size - 1] : null;
  return classItemDescription;
}

function getUsualInfo(classes) {
  const splittedClasses = splitTurmas(classes);
  const quantity = getMostFrequentClassTimeSizes(classes);
  const classUsualInfo = {
    professor: getMostFrequentItem(classes, ["professor"]),
    expectedDemand: getMeanDemand(classes),
    // description: getDescription(classes, currentSemester),
    description: null,
    classTime: {
      quantity,
      day: getMostFrequentItem(splittedClasses, ["dia"], quantity),
      room: getMostFrequentItem(splittedClasses, ["sala"], quantity),
      duration: getMostFrequentItem(splittedClasses, ["duracao"], quantity),
      startHour: getMostFrequentItem(splittedClasses, ["horaInicio"], quantity),
    },
  };

  // console.log("classUsualInfo", classUsualInfo.classTime.room);

  return classUsualInfo;
}

function getNewClassItem(classItemFilter, iterSubject, usualInfo) {
  const defaultYearSemester = getDefaultYearSemesterValues();

  const yearValue = classItemFilter?.year ?? classItemFilter?.ano;
  const semesterValue = classItemFilter?.semester ?? classItemFilter?.semestre;

  const year = yearValue ?? defaultYearSemester.year;
  const semester = semesterValue ?? defaultYearSemester.semester;

  const newClass = {
    ...emptyObjects.classItem,
    ano: year,
    semestre: semester,
    disciplina: iterSubject ?? null,
    professor:
      usualInfo?.professor?.[0] ??
      usualInfo?.professor ??
      classItemFilter?.professor ??
      null,
    demandaEstimada: /* usualInfo?.expectedDemand ?? */ null,
    description: usualInfo?.description ?? null,
  };
  return newClass;
}

function getNewClassTimes(classTime) {
  const classTimes = [];
  // console.log("classTime", classTime);
  for (let i = 0; i < classTime?.quantity; i++) {
    const newClassTime = {
      ...emptyObjects.classTime,
      id: "tempId-" + i,
      idTurma: "tempIdClass-" + i,
      dia: classTime?.day?.[i],
      duracao: classTime?.duration?.[0],
      horaInicio: classTime?.startHour?.[0],
      sala: classTime?.room?.[0],
    };

    classTimes.push(newClassTime);
  }

  return classTimes;
}

export { getNewClassItem, getNewClassTimes, getUsualInfo };
