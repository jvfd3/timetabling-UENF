import options from "../../../DB/local/options";
import { filterDay, filterRoom } from "../../filteringFunc";
import { splitTurmas } from "../auxiliarConflictsFunctions";

function getOnlyNeededValues(splittedClasses) {
  const cleanedClasses = splittedClasses
    .filter(
      (classItem) =>
        classItem.dia &&
        classItem.duracao &&
        classItem.horaInicio &&
        classItem.id &&
        classItem.sala
    ) // Get only classes with all values filled
    .map((classItem) => {
      const { dia, duracao, horaInicio, id, sala } = classItem;
      return { id, sala, dia, horaInicio, duracao };
    }); // Get only the values needed
  return cleanedClasses;
}

function removeSameId(classes, id) {
  const filteredClasses = classes.filter((iterClass) => iterClass.id !== id);
  return filteredClasses;
}

function compareHourDuration(hourDurationOrigin, hourDurationTarget) {
  const { hourOrigin, durationOrigin } = hourDurationOrigin;
  const { hourTarget, durationTarget } = hourDurationTarget;

  const originFinalHour = hourOrigin + durationOrigin;
  const targetFinalHour = hourTarget + durationTarget;

  // const zeroDuration = durationOrigin === 0 || durationTarget === 0;
  const zeroDuration = durationOrigin + durationTarget === 0;

  const originEndsBeforeTargetStarts = originFinalHour <= hourTarget;
  const originStartsAfterTargetEnds = targetFinalHour <= hourOrigin;

  const isValidSchedule =
    zeroDuration || originEndsBeforeTargetStarts || originStartsAfterTargetEnds;

  return isValidSchedule;
}

function filterHourDuration(classes, classItem) {
  const classItemTime = {
    originHour: classItem.horaInicio,
    originDuration: classItem.duracao,
  };
  const filteredClasses = classes.filter((iterClass) => {
    const iterClassTime = {
      targetHour: iterClass.horaInicio,
      targetDuration: iterClass.duracao,
    };
    const isValidSchedule = compareHourDuration(classItemTime, iterClassTime);
    return !isValidSchedule;
  });

  return filteredClasses;
}

function filterOverlappingClasses(classes, classItem) {
  let filteredClasses = classes;
  filteredClasses = filterDay(filteredClasses, classItem.dia); // Get only classes with the same day
  filteredClasses = filterHourDuration(filteredClasses, classItem); // Get only classes with overlapping hours
  return filteredClasses;
}

function getAllocRoomConflictObject(classes, classItem) {
  let filteredClasses = classes;
  filteredClasses = removeSameId(filteredClasses, classItem.id); // Remove the classItem from the list
  filteredClasses = filterRoom(filteredClasses, classItem.sala); // Get only classes with the same room
  filteredClasses = filterOverlappingClasses(filteredClasses, classItem); // Get only classes with the same day

  const hasOverlappingClasses = filteredClasses.length > 0;

  const allocConflictObject = {
    type: options.conflicts.roomAlloc,
    from: { ...classItem },
    to: hasOverlappingClasses ? filteredClasses : null,
  };

  return allocConflictObject;
}

function getAllocConflictObjects(classes, classItems) {
  let allocConflict = [];

  classItems.forEach((classItem) => {
    const allocConflictObject = getAllocRoomConflictObject(classes, classItem);
    if (allocConflictObject.to !== null) {
      allocConflict.push(allocConflictObject);
    }
  });

  return allocConflict;
}

function conflictRoom(classes, classItem) {
  const splittedClassItems = splitTurmas([classItem]);
  const splittedClasses = splitTurmas(classes);

  const cleanClassItems = getOnlyNeededValues(splittedClassItems);
  const cleanClasses = getOnlyNeededValues(splittedClasses);

  const roomConflicts = {};

  roomConflicts.alloc = getAllocConflictObjects(cleanClasses, cleanClassItems);

  return roomConflicts;
}

export { conflictRoom, filterOverlappingClasses };
