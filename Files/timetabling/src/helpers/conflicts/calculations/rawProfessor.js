import options from "../../../DB/local/options";
import { getId } from "../../auxCRUD";
import { filterProfessor } from "../../filteringFunc";
import { splitTurmas } from "../auxiliarConflictsFunctions";
import { filterOverlappingClasses } from "./rawRoom";

function getOnlyNeededValues(splittedClasses) {
  const cleanedClasses = splittedClasses
    .filter(
      (classItem) =>
        classItem.dia &&
        classItem.duracao &&
        classItem.horaInicio &&
        classItem.id &&
        classItem.idTurma &&
        classItem.professor
    ) // Get only classes with all values filled
    .map((classItem) => {
      const { dia, duracao, horaInicio, id, professor, idTurma } = classItem;
      return { id, professor, dia, horaInicio, duracao, idTurma };
    }); // Get only the values needed
  return cleanedClasses;
}

function removeSameId(classes, id) {
  const filteredClasses = classes.filter((iterClass) => iterClass.id !== id);
  return filteredClasses;
}

function getTargetClasses(filteredClasses) {
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

  return newToList;
}

function getAllocConflictObject(classes, classItem) {
  let filteredClasses = classes;
  filteredClasses = removeSameId(filteredClasses, classItem.id);
  filteredClasses = filterProfessor(filteredClasses, classItem.professor);
  filteredClasses = filterOverlappingClasses(filteredClasses, classItem);

  const allocConflict = {
    type: options.conflicts.professorAlloc,
    from: {
      id: getId(classItem),
      professor: classItem.professor,
      day: classItem.dia,
      hour: classItem.horaInicio,
      duration: classItem.duracao,
    },
    to: getTargetClasses(filteredClasses),
  };

  return allocConflict;
}

function getAllocConflictObjects(classes, classItems) {
  let allocConflict = [];

  classItems.forEach((classItem) => {
    const allocConflictObject = getAllocConflictObject(classes, classItem);
    if (allocConflictObject.to.length > 0) {
      allocConflict.push(allocConflictObject);
    }
  });

  return allocConflict;
}

function conflictsProfessor(classes, classItem) {
  const splittedClasses = splitTurmas(classes);
  const splittedClassItems = splitTurmas([classItem]);

  const cleanedClasses = getOnlyNeededValues(splittedClasses);
  const cleanedClassItems = getOnlyNeededValues(splittedClassItems);

  const roomConflicts = {};

  roomConflicts.alloc = getAllocConflictObjects(
    cleanedClasses,
    cleanedClassItems
  );

  return roomConflicts;
}

export { conflictsProfessor };
