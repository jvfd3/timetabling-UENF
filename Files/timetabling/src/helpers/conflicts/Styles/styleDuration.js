import options from "../../../DB/local/options";
// import { getAllocStyledConflict } from "./styleRoom";

const conflictOptions = options.config.colors.conflicts;

const defaultTitles = {
  base: "Conflitos de duração avaliados:\n",
  roomAlloc: "✅ Sem conflitos de alocação de sala\n",
  professorAlloc: "✅ Sem conflitos de alocação de professor\n",
  notSet: "✅ Sem conflitos de sala não definida\n",
  notSetConflict: "❌ Conflito: Sala não definida\n",
};

function getDurationDefaultStyle() {
  const defaultStyle = {
    title: defaultTitles.base,
    style: {
      backgroundColor: conflictOptions.noProblem.duration,
    },
  };
  return defaultStyle;
}

function getDurationNotSetStyle(classTime) {
  const defaultNullStyle = { title: defaultTitles.notSet, style: {} };
  const duration = classTime?.duracao;
  const hasDuration = duration !== null && duration !== undefined;

  const conflictNullStyle = {
    title: defaultTitles.notSetConflict,
    style: {
      backgroundColor: conflictOptions.notSet.duration,
    },
  };

  const notSetStyle = hasDuration ? defaultNullStyle : conflictNullStyle;
  return notSetStyle;
}

function getDurationRoomAllocStyle(conflicts, classTime) {
  const allocStyledConflict = getAllocStyledConflict(conflicts.old1, classTime);
  // console.log(a);
  // There might be a better way of doing it instead of recalculating everything
  /*
    const defaultRoomAllocStyle = { title: defaultTitles.roomAlloc, style: {} };
    const conflictRoomAllocStyle = {
      title: defaultTitles.roomAlloc,
      style: {
        backgroundColor: conflictOptions.hasConflict.room,
      },
    };

    const hasRoomAllocConflict = true;
    const roomAllocStyle = hasRoomAllocConflict
      ? conflictRoomAllocStyle
      : defaultRoomAllocStyle;
  */
  return allocStyledConflict;
}

function mergeStyles(styles) {
  let newTitle = "";
  let newStyle = {};

  if (styles.default) {
    newTitle += styles.default.title;
    newStyle = { ...newStyle, ...styles.default.style };
  }

  if (styles.roomAlloc) {
    newTitle += styles.roomAlloc.title;
    newStyle = { ...newStyle, ...styles.roomAlloc.style };
  }

  if (styles.professorAlloc) {
    newTitle += styles.professorAlloc.title;
    newStyle = { ...newStyle, ...styles.professorAlloc.style };
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

function getStyledConflictDuration(conflicts, classTime) {
  const durationStyles = {};
  durationStyles.default = getDurationDefaultStyle();
  durationStyles.notSet = getDurationNotSetStyle(classTime);
  // durationStyles.roomAlloc = getDurationRoomAllocStyle(conflicts, classTime);
  // durationStyles.professorAlloc = getDurationProfessorAllocStyle();

  // durationStyles.professorPreferences = getDurationProfessorPreferencesStyle();
  // durationStyles.studentConflicts = getDurationStudentConflictsStyle();
  durationStyles.merged = mergeStyles(durationStyles);
  return durationStyles.merged;
}

export { getStyledConflictDuration };
