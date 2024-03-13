import text from "../../../config/frontText";
import defaultColors from "../../../config/defaultColors";
import { getId } from "../../auxCRUD";

const conflictOptions = defaultColors.conflicts;
const defaultTitles = text.conflicts.room;

function getRoomAllocMessage(conflictObject) {
  const { type, to } = conflictObject;
  let conflictMessage = `❌ Conflito: ${type?.name}\n`;
  const size = to?.length;
  const plural = size > 1 ? "s" : "";
  conflictMessage += `\t- Sala sobreposta com ${size} turma${plural}\n`;

  to.forEach((classTime) => {
    console.log(classTime);
    const classItemLabel = classTime.classItemLabel;
    const classItem = `\t\t- Turma: ${classItemLabel};`;
    const timeLabels = classTime.classTimesLabels;
    const timeLabelsText = ` horários: [${timeLabels.join(", ")}]`;
    // const classTimes = JSON.stringify(classTime.idHorario);
    conflictMessage += classItem + timeLabelsText + "\n";
  });

  return conflictMessage;
}

function getAllocStyledConflict(roomAlloc) {
  const defaultAllocStyle = { title: defaultTitles.alloc, style: {} };
  let newTitle = "";

  const roomAllocConflict = roomAlloc.length > 0;

  if (roomAllocConflict) {
    roomAlloc.forEach((allocConflict) => {
      newTitle += getRoomAllocMessage(allocConflict);
    });
  }

  const allocConflictStyle = {
    title: newTitle,
    style: {
      // backgroundColor: conflictOptions.hasConflict.room,
      borderColor: conflictOptions.hasConflict.room,
      borderWidth: "10px",
    },
  };

  const allocStyle = roomAllocConflict ? allocConflictStyle : defaultAllocStyle;

  return allocStyle;
}

function getRoomDefaultStyle() {
  const defaultStyle = {
    title: defaultTitles.base,
    style: {
      backgroundColor: conflictOptions.noProblem.room,
      // borderColor: "white",
      // borderWidth: "5px",
    },
  };
  return defaultStyle;
}

function getDemandStyledConflict(singleDemandConflict, classTime) {
  const defaultDemandStyle = { title: defaultTitles.demand, style: {} };
  let newTitle = "";

  const classTimeId = getId(classTime);
  const foundConflict = singleDemandConflict.find(
    (conflict) => conflict.idClassTime === classTimeId
  );

  if (foundConflict) {
    const remaining = foundConflict.expectedDemand - foundConflict.capacity;
    newTitle = defaultTitles.demandConflict;
    newTitle += `\t- Alunos sobrando: ${remaining}\n`;
  }

  const demandConflictStyle = {
    title: newTitle,
    style: {
      backgroundColor: conflictOptions.hasConflict.demand,
      // borderColor: conflictOptions.hasConflict.demand,
      // borderBottomWidth: "10px",
    },
  };

  const demandStyle = foundConflict ? demandConflictStyle : defaultDemandStyle;

  return demandStyle;
}

function getNullStyledConflict(room) {
  const defaultNullStyle = { title: defaultTitles.notSetted, style: {} };

  const conflictNullStyle = {
    title: defaultTitles.notSettedConflict,
    style: {
      backgroundColor: conflictOptions.notSetted.room,
    },
  };

  const hasRoom = room !== null;
  const nullRoomStyle = hasRoom ? defaultNullStyle : conflictNullStyle;

  return nullRoomStyle;
}

function mergeStyles(styles) {
  let newTitle = "";
  let newStyle = {};

  if (styles.default) {
    newTitle += styles.default.title;
    newStyle = { ...newStyle, ...styles.default.style };
  }

  if (styles.notSetted) {
    newTitle += styles.notSetted.title;
    newStyle = { ...newStyle, ...styles.notSetted.style };
  }

  if (styles.alloc) {
    newTitle += styles.alloc.title;
    newStyle = { ...newStyle, ...styles.alloc.style };
  }

  if (styles.demand) {
    newTitle += styles.demand.title;
    newStyle = { ...newStyle, ...styles.demand.style };
  }

  const mergedStyles = {
    title: newTitle,
    style: newStyle,
  };

  // console.log("mergedStyles", mergedStyles);
  return mergedStyles;
}

function getStyledConflictRoom(conflicts, classTime) {
  const singleDemandConflict =
    conflicts.itemConflicts.raw.expectedDemand.singleClassCapacity;
  const allocConflict = conflicts.timeConflicts.raw.room.alloc;

  const roomStyles = {};

  roomStyles.default = getRoomDefaultStyle();
  roomStyles.demand = getDemandStyledConflict(singleDemandConflict, classTime);
  roomStyles.alloc = getAllocStyledConflict(allocConflict, classTime);
  roomStyles.notSetted = getNullStyledConflict(classTime?.sala);
  roomStyles.merged = mergeStyles(roomStyles);

  // console.log("roomStyles", roomStyles.merged);

  return roomStyles;
}

export { getStyledConflictRoom };
