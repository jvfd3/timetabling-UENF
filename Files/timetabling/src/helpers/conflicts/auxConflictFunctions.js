import options from "../../DB/local/options";
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
  let newToList = filteredClasses.reduce((acc, classTime) => {
    let existingClassTime = acc.find(
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
  let newClassData = {
    ...rest,
    ...classTime,
  };
  return newClassData;
}

function splitTurmas(turmas) {
  /* function splitTurmas(classes) {
    let splittedClasses = classes.flatMap((classData) =>
      classData.horarios.map((classTime) => flattenTurma(classData, classTime))
    );
    return splittedClasses;
  } */
  let newSplittedTurmas = [];
  turmas.forEach((turma) => {
    if (turma.horarios !== null && turma.horarios.length > 0) {
      turma.horarios.forEach((horario) => {
        let newTurma = flattenTurma(turma, horario);
        newSplittedTurmas.push(newTurma);
      });
    } else {
      let newTurma = {
        ...options.emptyObjects.classTime,
        /* when I do that, the idHorario is null and it shouldn't. Check it later. */
        ...turma,
      };
      delete newTurma.horarios;
      newSplittedTurmas.push(newTurma);
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
