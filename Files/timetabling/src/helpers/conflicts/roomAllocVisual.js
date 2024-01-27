import options from "../../DB/local/options";
import { getId } from "../auxCRUD";

function getAllocFormat(conflictObject) {
  const { type, to } = conflictObject;
  let allocFormat = {};
  let conflictMessage = `❌ Conflito: ${type.name}\n`;
  conflictMessage += `\t- Horários sobrepostos: ${to.length}\n`;

  to.forEach((iterTo) => {
    const iterToId = getId(iterTo);
    conflictMessage += `\t-- id: ${iterToId}\n`;
  });

  // console.log("conflictObject\n", conflictMessage);
  allocFormat.title = conflictMessage;
  allocFormat.style = {
    borderColor: options.config.colors.conflicts.hasConflict.room,
    borderWidth: "10px",
  };
  return allocFormat;
}

function getAllocStyledConflict(conflicts, classTime) {
  const allocConflict = conflicts.raw.room.alloc;
  const classTimeId = getId(classTime);
  const hasConflict = allocConflict.length > 0;
  const defaultAllocStyle = {
    title: "✅ Sem conflitos de alocação múltipla de sala\n",
    style: {},
  };

  let actualConflict = false;
  let allocConflictStyle = null;

  if (hasConflict) {
    const conflictObject = allocConflict.find(
      (iterConflict) => iterConflict.from.id === classTimeId
    );
    const hasConflict2 = conflictObject?.to !== null;
    if (hasConflict2) {
      actualConflict = true;
      allocConflictStyle = getAllocFormat(conflictObject);
    }
  }

  let allocStyle = actualConflict ? allocConflictStyle : defaultAllocStyle;

  return allocStyle;
}

function getRoomDefaultStyle() {
  const defaultTitle = "Conflitos de alocação de sala avaliados:\n";

  const defaultStyle = {
    title: defaultTitle,
    style: {
      backgroundColor: options.config.colors.conflicts.noProblem.room,
      borderColor: "white",
      borderWidth: "5px",
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

  const defaultDemandStyle = {
    title: "✅ Sem conflitos de demanda de sala\n",
    style: {},
  };

  const conflictDemandStyle = {
    ...conflicts.styled.demand,
  };

  const demandRoomConflictStyle = hasDemandConflict
    ? conflictDemandStyle
    : defaultDemandStyle;

  return demandRoomConflictStyle;
}

function getNullStyledConflict(classTime) {
  const defaultNullStyle = {
    title: "✅ Sem conflitos de sala não definida\n",
    style: {},
  };

  const conflictNullStyle = {
    title: "❌ Conflito: Sala não definida\n",
    style: {
      backgroundColor: options.config.colors.conflicts.notSet.room,
    },
  };

  const roomIsNull = classTime?.sala === null;
  const nullRoomStyle = roomIsNull ? conflictNullStyle : defaultNullStyle;

  return nullRoomStyle;
}

function mergeStyles(styles) {
  let newTitle = styles.default.title;
  let newStyle = { ...styles.default.style };

  if (styles.alloc !== null) {
    newTitle += styles.alloc.title;
    newStyle = { ...newStyle, ...styles.alloc.style };
  }

  if (styles.demand !== null) {
    newTitle += styles.demand.title;
    newStyle = { ...newStyle, ...styles.demand.style };
  }

  if (styles.notSet !== null) {
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

export { getRoomStyledConflict };
