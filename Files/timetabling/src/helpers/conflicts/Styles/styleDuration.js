import options from "../../../DB/local/options";

const conflictOptions = options.config.colors.conflicts;

const defaultTitles = {
  base: "Conflitos de duração avaliados:\n",
  roomAlloc: "✅ Sem conflitos de alocação de sala\n",
  professorAlloc: "✅ Sem conflitos de alocação de professor\n",
  notSetted: "✅ Sem conflitos de duração não definida\n",
  notSettedConflict: "❌ Conflito: duração não definida\n",
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

function getDurationnotSettedStyle(classTime) {
  const defaultNullStyle = { title: defaultTitles.notSetted, style: {} };
  const duration = classTime?.duracao;
  const hasDuration = duration !== null && duration !== undefined;

  const conflictNullStyle = {
    title: defaultTitles.notSettedConflict,
    style: {
      backgroundColor: conflictOptions.notSetted.duration,
    },
  };

  const notSettedStyle = hasDuration ? defaultNullStyle : conflictNullStyle;
  return notSettedStyle;
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

  if (styles.professorAlloc) {
    newTitle += styles.professorAlloc.title;
    newStyle = { ...newStyle, ...styles.professorAlloc.style };
  }

  if (styles.roomAlloc) {
    newTitle += styles.roomAlloc.title;
    newStyle = { ...newStyle, ...styles.roomAlloc.style };
  }

  const mergedStyles = {
    title: newTitle,
    style: newStyle,
  };

  // console.log("mergedStyles", mergedStyles);
  return mergedStyles;
}

function getDurationStyleRoomAlloc(conflicts, classTime) {
  const defaultStyle = { title: defaultTitles.roomAlloc, style: {} };
  const conflictStyle = conflicts.room.alloc;

  const rawRoomAllocConflict = conflicts.timeConflicts.raw.room.alloc;
  const hasRoomAlloc = rawRoomAllocConflict.length !== 0;

  const hasDuration = classTime.duracao !== 0;

  const hasRoomAllocConflict = hasDuration && hasRoomAlloc;

  const roomAllocStyle = hasRoomAllocConflict ? conflictStyle : defaultStyle;
  // console.log("conflictStyle", classTime.duracao, hasRoomAllocConflict);

  return roomAllocStyle;
}

function getDurationStyleProfessorAlloc(conflicts, classTime) {
  const defaultStyle = { title: defaultTitles.professorAlloc, style: {} };
  const conflictStyle = conflicts.itemConflicts.styled.professor.alloc;

  const hasDuration = classTime.duracao !== 0;

  const allocProfessor = conflicts.itemConflicts.raw.professor.alloc;

  let hasDurationAllocProfessor = false;

  allocProfessor.forEach((alloc) => {
    const allocId = alloc.from.id;
    if (allocId === classTime.id) {
      hasDurationAllocProfessor = true;
    }
  });

  const hasProfessorAllocConflict = hasDuration && hasDurationAllocProfessor;

  const professorAllocStyle = hasProfessorAllocConflict
    ? conflictStyle
    : defaultStyle;
  // console.log("conflictStyle", classTime.duracao, hasProfessorAllocConflict);

  return professorAllocStyle;
}

function getStyledConflictDuration(conflicts, classTime) {
  const durationStyles = {};

  durationStyles.default = getDurationDefaultStyle();
  durationStyles.notSetted = getDurationnotSettedStyle(classTime);

  // durationStyles.roomAlloc = conflicts.timeConflicts.styled.room.alloc;
  durationStyles.roomAlloc = getDurationStyleRoomAlloc(conflicts, classTime);
  durationStyles.professorAlloc = getDurationStyleProfessorAlloc(
    conflicts,
    classTime
  );
  // conflicts.itemConflicts.styled.professor.alloc;

  // durationStyles.professorPreferences = getDurationProfessorPreferencesStyle();
  // durationStyles.studentConflicts = getDurationStudentConflictsStyle();
  durationStyles.merged = mergeStyles(durationStyles);
  return durationStyles;
}

export { getStyledConflictDuration };
