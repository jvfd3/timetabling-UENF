import options from "../../DB/local/options";

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
        expectedDemand: expectedDemand,
        capacity: capacity,
        type: options.conflicts.roomCapacity,
        idClass: iterClass.idClass,
        idClassTime: iterClass.idClassTime,
        idRoom: iterClass.idRoom,
      };
      singleClassDemandConflicts.push(conflictObject);
    }
  });
  // console.log("singleClassDemandConflicts", singleClassDemandConflicts);
  return singleClassDemandConflicts;
}

export { getSingleClassDemandConflict };
