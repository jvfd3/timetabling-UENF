import options from "../../../DB/local/options";
import { getId } from "../../auxCRUD";

const defaultTitles = {
  base: "Conflitos de alocação de sala avaliados:\n",
  alloc: "✅ Sem conflitos de alocação de sala\n",
  demand: "✅ Sem conflitos de demanda de sala\n",
  notSet: "✅ Sem conflitos de sala não definida\n",
  notSetConflict: "❌ Conflito: Sala não definida\n",
};

function getRoomAllocMessage(conflictObject) {
  const { type, to } = conflictObject;
  let conflictMessage = `❌ Conflito: ${type.name}\n`;
  conflictMessage += `\t- Horários sobrepostos: ${to.length}\n`;

  to.forEach((iterTo) => {
    const iterToId = getId(iterTo);
    conflictMessage += `\t-- id: ${iterToId}\n`;
  });

  // console.log("conflictObject\n", conflictMessage);
  return conflictMessage;
}

function getRoomAllocConflict(conflicts, classTime) {
  console.log("getRoomAllocConflict", conflicts);
  const allocConflict = conflicts.raw.room.alloc;

  if (allocConflict.length > 0) {
    const classTimeId = getId(classTime);
    const conflictObject = allocConflict.find(
      (iterConflict) => iterConflict.from.id === classTimeId
    );

    if (conflictObject?.to !== null) {
      return conflictObject;
    }
  }

  return null;
}

function getAllocStyledConflict(conflicts, classTime) {
  const defaultAllocStyle = { title: defaultTitles.alloc, style: {} };
  const allocConflictStyle = {
    title: "",
    style: {
      borderColor: options.config.colors.conflicts.hasConflict.room,
      borderWidth: "10px",
    },
  };

  const roomAllocConflict = getRoomAllocConflict(conflicts, classTime);
  // console.log("roomAllocConflict", roomAllocConflict);
  if (roomAllocConflict) {
    allocConflictStyle.title = getRoomAllocMessage(roomAllocConflict);
  }

  const allocStyle = roomAllocConflict ? allocConflictStyle : defaultAllocStyle;

  return allocStyle;
}

function getRoomDefaultStyle() {
  const defaultStyle = {
    title: defaultTitles.base,
    style: {
      backgroundColor: options.config.colors.conflicts.noProblem.room,
      // borderColor: "white",
      // borderWidth: "5px",
    },
  };
  return defaultStyle;
}

function getDemandStyledConflict(conflicts, classTime) {
  const classTimeId = getId(classTime);
  const singleDemandConflicts =
    conflicts.raw.expectedDemand.singleTurmaCapacity;

  const hasDemandConflict = singleDemandConflicts.some(
    (conflict) => conflict?.idClassTime === classTimeId
  );

  const defaultDemandStyle = { title: defaultTitles.demand, style: {} };

  const conflictDemandStyle = {
    ...conflicts.styled.demand,
  };

  const demandRoomConflictStyle = hasDemandConflict
    ? conflictDemandStyle
    : defaultDemandStyle;

  return demandRoomConflictStyle;
}

function getNullStyledConflict(classTime) {
  const defaultNullStyle = { title: defaultTitles.notSet, style: {} };

  const conflictNullStyle = {
    title: defaultTitles.notSetConflict,
    style: {
      backgroundColor: options.config.colors.conflicts.notSet.room,
    },
  };

  const roomIsNull = classTime?.sala === null;
  const nullRoomStyle = roomIsNull ? conflictNullStyle : defaultNullStyle;

  return nullRoomStyle;
}

function mergeStyles(styles) {
  let newTitle = "";
  let newStyle = {};

  if (styles.default) {
    newTitle += styles.default.title;
    newStyle = { ...newStyle, ...styles.default.style };
  }

  if (styles.alloc) {
    newTitle += styles.alloc.title;
    newStyle = { ...newStyle, ...styles.alloc.style };
  }

  if (styles.demand) {
    newTitle += styles.demand.title;
    newStyle = { ...newStyle, ...styles.demand.style };
  }

  if (styles.notSet) {
    newTitle += styles.notSet.title;
    newStyle = { ...newStyle, ...styles.notSet.style };
  }

  const mergedStyles = {
    title: newTitle,
    style: newStyle,
  };

  // console.log("mergedStyles", mergedStyles);
  return mergedStyles;
}

function getRoomStyledConflict(conflicts, classTime) {
  const roomStyles = {};
  roomStyles.default = getRoomDefaultStyle();
  roomStyles.alloc = getAllocStyledConflict(conflicts, classTime);
  roomStyles.demand = getDemandStyledConflict(conflicts, classTime);
  roomStyles.notSet = getNullStyledConflict(classTime);
  roomStyles.merged = mergeStyles(roomStyles);
  return roomStyles.merged;
}

export { getRoomStyledConflict, getAllocStyledConflict };
