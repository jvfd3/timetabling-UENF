import options from "../../../DB/local/options";
import { getId } from "../../auxCRUD";

const conflictOptions = options.config.colors.conflicts;

const defaultTitles = {
  base: "Conflitos de alocação de sala avaliados:\n",
  alloc: "✅ Sem conflitos de alocação de sala\n",
  demand: "✅ Sem conflitos de demanda de sala\n",
  demandConflict: "❌ Conflito: Demanda de sala\n",
  notSetted: "✅ Sem conflitos de sala não definida\n",
  notSettedConflict: "❌ Conflito: Sala não definida\n",
};

function getRoomAllocMessage(conflictObject) {
  const { type, to } = conflictObject;
  let conflictMessage = `❌ Conflito: ${type?.name}\n`;
  conflictMessage += `\t- Sala sobreposta com ${to?.length} turmas\n`;

  to.forEach((classTime) => {
    let classItem = `\t\t- Turma: ${classTime.idTurma}, horários: `;
    let classTimes = JSON.stringify(classTime.idHorario);
    conflictMessage += classItem + classTimes + "\n";
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
