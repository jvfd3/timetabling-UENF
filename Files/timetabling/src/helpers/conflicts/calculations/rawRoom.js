import options from "../../../DB/local/options";
import { filterRoom } from "../../filteringFunc";
import {
  splitTurmas,
  getOverlappingClasses,
  removeSameId,
  getTargetClasses,
} from "../auxConflictFunctions";

function getOnlyNeededValues(splittedClasses) {
  const cleanedClasses = splittedClasses
    // .filter(
    //   (classItem) =>
    //     classItem.dia &&
    //     classItem.duracao &&
    //     classItem.horaInicio &&
    //     classItem.id
    //   // && classItem.sala
    // ) // Get only classes with all values filled
    .map((classItem) => {
      const { dia, duracao, horaInicio, id, sala, idTurma } = classItem;
      return { id, sala, dia, horaInicio, duracao, idTurma };
    }); // Get only the values needed
  // console.log(cleanedClasses);
  return cleanedClasses;
}

function removeNullClass(classes, classTime) {
  // There is no conflict if there is no room
  const room = classTime.sala;
  const newClasses = room ? classes : [];
  return newClasses;
}

function getAllocRoomConflictObject(classes, classTime) {
  let filteredClasses = classes;

  filteredClasses = removeNullClass(filteredClasses, classTime);
  filteredClasses = removeSameId(filteredClasses, classTime.id); // Remove the classTime from the list
  // How should I deal with null rooms? 🤔
  filteredClasses = filterRoom(filteredClasses, classTime.sala); // Get only classes with the same room
  filteredClasses = getOverlappingClasses(filteredClasses, classTime); // Get only classes with the same day

  const allocConflictObject = {
    type: options.conflicts.roomAlloc,
    from: { ...classTime },
    to: getTargetClasses(filteredClasses),
  };

  return allocConflictObject;
}

function getAllocConflictObjects(classes, classTime) {
  // console.log(classTime);
  let allocConflict = [];

  classTime.forEach((iterClassTime) => {
    // this should only iterate once
    const allocConflictObject = getAllocRoomConflictObject(
      classes,
      iterClassTime
    );
    if (allocConflictObject.to.length > 0) {
      allocConflict.push(allocConflictObject);
    }
  });

  return allocConflict;
}

function getRoomConflicts(classes, classTime) {
  const roomConflicts = {};

  // roomConflicts.demand = getConflictObjectsDemand(classes, classTime);
  roomConflicts.alloc = getAllocConflictObjects(classes, classTime);

  return roomConflicts;
}

function getRawConflictsRoom(classes, classTime) {
  const splittedClasses = splitTurmas(classes);

  const cleanClassTime = getOnlyNeededValues([classTime]); // this should always be an array with only one element
  const cleanClasses = getOnlyNeededValues(splittedClasses);

  const roomConflicts = getRoomConflicts(cleanClasses, cleanClassTime);

  return roomConflicts;
}

export { getRawConflictsRoom };
