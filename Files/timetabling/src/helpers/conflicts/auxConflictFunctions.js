import emptyObjects from "../../config/emptyObjects";
import { filterDay } from "../filteringFunc";

function removeSameId(classes, id) {
  const filteredClasses = classes.filter((iterClass) => iterClass.id !== id);
  return filteredClasses;
}

function compareHourDuration(hourDurationOrigin, hourDurationTarget) {
  const { originHour, originDuration } = hourDurationOrigin;
  const { targetHour, targetDuration } = hourDurationTarget;

  const originFinalHour = originHour + originDuration;
  const targetFinalHour = targetHour + targetDuration;

  // const zeroDuration = originDuration === 0 || targetDuration === 0;
  const zeroDuration = originDuration + targetDuration === 0;

  const originEndsBeforeTargetStarts = originFinalHour <= targetHour;
  const originStartsAfterTargetEnds = targetFinalHour <= originHour;

  const isValidSchedule =
    zeroDuration || originEndsBeforeTargetStarts || originStartsAfterTargetEnds;

  return isValidSchedule;
}

function filterHourDuration(classes, classTime) {
  const newClassTime = {
    originHour: classTime.horaInicio,
    originDuration: classTime.duracao,
  };
  let filteredClasses = classes;

  filteredClasses = filteredClasses.filter((iterClass) => {
    const iterClassTime = {
      targetHour: iterClass.horaInicio,
      targetDuration: iterClass.duracao,
    };
    const isValidSchedule = compareHourDuration(newClassTime, iterClassTime);
    return !isValidSchedule;
  });

  return filteredClasses;
}

function removeNullTimes(classes, classTime) {
  const hasTime = classTime.dia && classTime.horaInicio && classTime.duracao;
  let filteredClasses = hasTime ? classes : [];

  filteredClasses = filteredClasses.filter(
    (iterClass) => iterClass.dia && iterClass.horaInicio && iterClass.duracao
  );

  return filteredClasses;
}

function getOverlappingClasses(classes, classTime) {
  let filteredClasses = classes;

  filteredClasses = removeNullTimes(filteredClasses, classTime); // Remove classes with null times
  filteredClasses = filterDay(filteredClasses, classTime.dia); // Get only classes with the same day
  filteredClasses = filterHourDuration(filteredClasses, classTime); // Get only classes with overlapping hours

  return filteredClasses;
}

function getTargetClasses(filteredClasses) {
  /* Used by room and professor */
  // console.log(filteredClasses);
  const newToList = filteredClasses.reduce((acc, classTime) => {
    const existingClassTime = acc.find(
      (item) => item.idTurma === classTime.idTurma
    );

    if (existingClassTime) {
      existingClassTime.idHorario.push(classTime.id);
    } else {
      acc.push({
        idTurma: classTime.idTurma,
        idHorario: [classTime.id],
      });
    }

    return acc;
  }, []);
  // console.log(newToList);

  return newToList;
}

function flattenTurma(classData, classTime) {
  const { horarios, ...rest } = classData;
  const newClassData = {
    ...rest,
    ...classTime,
  };
  return newClassData;
}

function splitTurmas(classes) {
  /* function splitTurmas(classes) {
    let splittedClasses = classes.flatMap((classData) =>
      classData.horarios.map((classTime) => flattenTurma(classData, classTime))
    );
    return splittedClasses;
  } */
  const newSplittedTurmas = [];
  classes?.forEach((iterClassItem) => {
    if (
      iterClassItem?.horarios !== null &&
      iterClassItem?.horarios?.length > 0
    ) {
      iterClassItem?.horarios.forEach((iterClassTime) => {
        const newClassItem = flattenTurma(iterClassItem, iterClassTime);
        newSplittedTurmas.push(newClassItem);
      });
    } else {
      const newClassItem = {
        ...emptyObjects.classTime,
        /* when I do that, the idHorario is null and it shouldn't. Check it later. */
        ...iterClassItem,
      };
      delete newClassItem?.horarios;
      newSplittedTurmas.push(newClassItem);
    }
  });

  return newSplittedTurmas;
}

export {
  getOverlappingClasses,
  filterHourDuration,
  getTargetClasses,
  removeSameId,
  flattenTurma,
  splitTurmas,
};
