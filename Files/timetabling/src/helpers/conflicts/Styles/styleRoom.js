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
  let conflictMessage = `❌ Conflito: ${type?.name}\n`;
  conflictMessage += `\t- Horários sobrepostos: ${to?.length}\n`;

  to.forEach((iterTo) => {
    const iterToId = getId(iterTo);
    conflictMessage += `\t-- id: ${iterToId}\n`;
  });

  return conflictMessage;
}

function getAllocStyledConflict(roomAlloc) {
  // console.log("roomAlloc", roomAlloc);
  const defaultAllocStyle = { title: defaultTitles.alloc, style: {} };
  let newTitle = "";

  const roomAllocConflict = roomAlloc?.to?.length > 0;

  if (roomAllocConflict) {
    newTitle = getRoomAllocMessage(roomAlloc);
  }

  const allocConflictStyle = {
    title: newTitle,
    style: {
      borderColor: options.config.colors.conflicts.hasConflict.room,
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
      backgroundColor: options.config.colors.conflicts.noProblem.room,
      // borderColor: "white",
      // borderWidth: "5px",
    },
  };
  return defaultStyle;
}

function getDemandStyledConflict(conflicts, classTime) {
  const singleDemandConflicts =
    conflicts.raw.expectedDemand.singleClassCapacity;
  const classTimeId = getId(classTime);
  // console.log(conflicts);

  const hasDemandConflict = singleDemandConflicts.some(
    (conflict) => conflict?.idClassTime === classTimeId
  );

  const conflictDemandStyle = { ...conflicts.styled.expectedDemand };
  const defaultDemandStyle = { title: defaultTitles.demand, style: {} };

  const demandRoomConflictStyle = hasDemandConflict
    ? conflictDemandStyle
    : defaultDemandStyle;

  return demandRoomConflictStyle;
}

function getNullStyledConflict(room) {
  const defaultNullStyle = { title: defaultTitles.notSet, style: {} };

  const conflictNullStyle = {
    title: defaultTitles.notSetConflict,
    style: {
      backgroundColor: options.config.colors.conflicts.notSet.room,
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
  // console.log("conflicts", conflicts);
  const roomAlloc = conflicts.default.raw.room.alloc;
  const roomDemand = conflicts.default.itemConflicts;

  const roomStyles = {};

  roomStyles.default = getRoomDefaultStyle();
  roomStyles.alloc = getAllocStyledConflict(roomAlloc, classTime);
  roomStyles.demand = getDemandStyledConflict(roomDemand, classTime);
  roomStyles.notSet = getNullStyledConflict(classTime?.sala);
  roomStyles.merged = mergeStyles(roomStyles);

  // console.log("roomStyles", roomStyles);

  return roomStyles.merged;
}

export { getRoomStyledConflict, getAllocStyledConflict };
