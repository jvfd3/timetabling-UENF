import text from "../../../config/frontText";
import defaultColors from "../../../config/defaultColors";

const conflictOptions = defaultColors.conflicts;
const defaultTitles = text.conflicts.demand;

function getDemandMessage(conflicts) {
  let titleMessage = defaultTitles.singleCapacityConflict;
  titleMessage += `\t- Há ${conflicts.length} conflitos de demanda.\n`;
  conflicts.forEach((iterConflict) => {
    // console.log("iterConflict", iterConflict);
    const diff = iterConflict.expectedDemand - iterConflict.capacity;
    // const room = iterConflict.room;
    // const roomName = room?.bloco + " - " + room?.codigo;
    titleMessage += `\t\t- No horário${iterConflict.classTimeLabel} `;
    titleMessage += `sobraram ${diff} alunos `;
    // titleMessage += `da Turma ${iterConflict.idClass}`;
    titleMessage += `\n`;
  });
  return titleMessage;
}

function getStyledDefaultConflict() {
  const defaultStyle = {
    title: defaultTitles.base,
    style: {
      backgroundColor: conflictOptions.noProblem.demand,
    },
  };

  return defaultStyle;
}

function getStyledConflictCapacity(singleClassCapacity) {
  let demandConflictStyle = { title: defaultTitles.singleCapacity, style: {} };

  const hasConflict = singleClassCapacity.length > 0;
  if (hasConflict) {
    demandConflictStyle.title = getDemandMessage(singleClassCapacity);
    demandConflictStyle.style = {
      backgroundColor: conflictOptions.hasConflict.demand,
    };
  }

  return demandConflictStyle;
}

function getNullStyledConflict(demand) {
  const defaultNullStyle = { title: defaultTitles.notSetted, style: {} };
  const conflictNullStyle = {
    title: defaultTitles.notSettedConflict,
    style: {
      backgroundColor: conflictOptions.notSetted.demand,
    },
  };

  // const hasDemand = demand !== null && demand !== undefined; // verboser
  const hasDemand = demand;
  const nullRoomStyle = hasDemand ? defaultNullStyle : conflictNullStyle;

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

  if (styles.singleClassCapacity) {
    newTitle += styles.singleClassCapacity.title;
    newStyle = { ...newStyle, ...styles.singleClassCapacity.style };
  }

  const mergedStyles = {
    title: newTitle,
    style: newStyle,
  };

  // console.log("mergedStyles", mergedStyles);
  return mergedStyles;
}

function getStyledConflictDemand(conflicts, classItem) {
  const demandStyles = {};
  const singleClassCapacity = conflicts.raw.expectedDemand.singleClassCapacity;
  const demand =
    classItem?.demandaEstimada ??
    classItem?.expectedDemand ??
    classItem?.demand;

  demandStyles.default = getStyledDefaultConflict();
  demandStyles.singleClassCapacity =
    getStyledConflictCapacity(singleClassCapacity);
  demandStyles.notSetted = getNullStyledConflict(demand);
  demandStyles.merged = mergeStyles(demandStyles);

  return demandStyles;
}

export { getStyledConflictDemand };
