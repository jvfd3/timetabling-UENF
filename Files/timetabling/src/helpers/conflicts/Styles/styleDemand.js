import options from "../../../DB/local/options";

const defaultTitles = {
  base: `Conflitos de demanda avaliados:\n`,
  notSet: `✅ Sem conflitos de demanda não definida\n`,
  notSetConflict: `❌ Conflito: demanda não definida\n`,
  singleCapacity: `✅ Todas as salas desta turma comportam a demanda estimada\n`,
  singleCapacityConflict: `❌ Conflito: há sala que não comporta a demanda\n`,
};

function getDemandMessage(conflicts) {
  let titleMessage = defaultTitles.singleCapacityConflict;
  titleMessage += `\t- Há ${conflicts.length} conflitos de demanda.\n`;
  conflicts.forEach((iterConflict) => {
    // console.log("iterConflict", iterConflict);
    const diff = iterConflict.expectedDemand - iterConflict.capacity;
    const room = iterConflict.room;
    const roomName = room?.bloco + " - " + room?.codigo;
    titleMessage += `\t\t-- `;
    titleMessage += `No horário ${iterConflict.idClassTime} `;
    titleMessage += `na sala ${roomName} `;
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
      backgroundColor: options.config.colors.conflicts.noProblem.demand,
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
      backgroundColor: options.config.colors.conflicts.hasConflict.demand,
    };
  }

  return demandConflictStyle;
}

function getNullStyledConflict(demand) {
  const defaultNullStyle = { title: defaultTitles.notSet, style: {} };
  const conflictNullStyle = {
    title: defaultTitles.notSetConflict,
    style: {
      backgroundColor: options.config.colors.conflicts.notSet.demand,
    },
  };

  const hasDemand = demand !== null;
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

  if (styles.notSet) {
    newTitle += styles.notSet.title;
    newStyle = { ...newStyle, ...styles.notSet.style };
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
  demandStyles.notSet = getNullStyledConflict(demand);
  demandStyles.merged = mergeStyles(demandStyles);

  return demandStyles.merged;
}

export { getStyledConflictDemand };
