import options from "../../../DB/local/options";
import { filterRoom } from "../../filteringFunc";
import {
  splitTurmas,
  filterOverlappingClasses,
  removeSameId,
} from "../auxConflictFunctions";

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

function getRawConflictsRoom(classes, classTime) {
  const splittedClasses = splitTurmas(classes);

  // console.log(classTime);
  const cleanClassItems = getOnlyNeededValues([classTime]);
  // console.log(cleanClassItems);
  const cleanClasses = getOnlyNeededValues(splittedClasses);

  const roomConflicts = {};

  roomConflicts.alloc = getAllocConflictObjects(cleanClasses, cleanClassItems);

  return roomConflicts;
}

export { getRawConflictsRoom };
