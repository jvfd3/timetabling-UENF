import options from "../../../DB/local/options";
import { getId } from "../../auxCRUD";

function getSingleClassDemandConflict(demandClassData) {
  let singleClassDemandConflicts = [];
  demandClassData.forEach((iterClass) => {
    /*
      forEach class, check if there is a room capacity conflict.
      it checks if the capacity is smaller than the expected demand.
      and also if there is a demand and a capacity.
      If there is, add it to the list of conflicts.
    */
    // Checking if there is a conflict
    const expectedDemand = iterClass.expectedDemand;
    const capacity = iterClass.roomCapacity;
    const hasRoomSmallerThanDemand = capacity < expectedDemand;

    // Checking nullability
    const hasExpectedDemand = expectedDemand !== null;
    const hasCapacity = capacity !== null;
    const hasDemandAndCapacity = hasExpectedDemand && hasCapacity;

    const hasConflict = hasDemandAndCapacity && hasRoomSmallerThanDemand;
    if (hasConflict) {
      const conflictObject = {
        expectedDemand,
        capacity,
        type: options.conflicts.roomCapacity,
        idClass: iterClass.idClass,
        idClassTime: iterClass.idClassTime,
        idRoom: iterClass.idRoom,
        room: iterClass.room,
      };
      singleClassDemandConflicts.push(conflictObject);
    }
  });
  // console.log("singleClassDemandConflicts", singleClassDemandConflicts);
  return singleClassDemandConflicts;
}

function getDemandNeededData(classItem) {
  const classTimes = classItem?.horarios;
  const cleanedTurma = {
    idClass: getId(classItem),
    expectedDemand: classItem?.demandaEstimada,
  };
  const neededData = [];
  classTimes?.forEach((classTime) => {
    // console.log("classTime", classTime);
    // console.log("classTime.sala", classTime.sala);
    const newFlattenedData = {
      idRoom: classTime?.sala?.id,
      roomCapacity: classTime?.sala?.capacidade,
      idClassTime: getId(classTime),
      room: classTime?.sala,
      ...cleanedTurma,
    };
    // console.log("newFlattenedData.idRoom", newFlattenedData.idRoom);
    neededData.push(newFlattenedData);
  });
  // console.log("classItem", classItem);
  // console.log("neededData", neededData);
  return neededData;
}

function getRawConflictsDemand(classes, classItem) {
  const demandConflictData = getDemandNeededData(classItem);
  const demandConflicts = {};

  demandConflicts.singleClassCapacity =
    getSingleClassDemandConflict(demandConflictData);
  // demandConflicts.multiClassCapacity = getMultiClassConflict(
  //   classes,
  //   classItem
  // );

  return demandConflicts;
}

export { getRawConflictsDemand };
