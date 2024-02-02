import defaultColors from "../../../config/defaultColors";

const conflictOptions = defaultColors;

const defaultTitles = {
  base: "Conflitos de dia avaliados:\n",
  roomAlloc: "✅ Sem conflitos de alocação de sala\n",
  professorAlloc: "✅ Sem conflitos de alocação de professor\n",
  notSetted: "✅ Sem conflitos de dia não definido\n",
  notSettedConflict: "❌ Conflito: dia não definido\n",
};

function getDefaultStyleDay() {
  const defaultStyle = {
    title: defaultTitles.base,
    style: {
      backgroundColor: conflictOptions.noProblem.day,
    },
  };
  return defaultStyle;
}

function getnotSettedStyleDay(classTime) {
  const defaultNullStyle = { title: defaultTitles.notSetted, style: {} };
  const day = classTime?.dia;
  const hasDay = day !== null && day !== undefined;

  const conflictNullStyle = {
    title: defaultTitles.notSettedConflict,
    style: {
      backgroundColor: conflictOptions.notSetted.day,
    },
  };

  const notSettedStyle = hasDay ? defaultNullStyle : conflictNullStyle;
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

  return mergedStyles;
}

function getRoomAllocStyleDay(conflicts, classTime) {
  const defaultStyle = { title: defaultTitles.roomAlloc, style: {} };
  const conflictStyle = conflicts.room.alloc;

  const rawRoomAllocConflict = conflicts.timeConflicts.raw.room.alloc;
  const hasDay = classTime.dia;
  const hasRoomAlloc = rawRoomAllocConflict.length !== 0;

  const hasRoomAllocConflict = hasDay && hasRoomAlloc;

  const roomAllocStyle = hasRoomAllocConflict ? conflictStyle : defaultStyle;
  // console.log("conflictStyle", classTime.duracao, hasRoomAllocConflict);

  return roomAllocStyle;
}

function getProfessorAllocStyleDay(conflicts, classTime) {
  const defaultStyle = { title: defaultTitles.professorAlloc, style: {} };
  const conflictStyle = conflicts.itemConflicts.styled.professor.alloc;

  const hasDay = classTime.dia;

  const allocProfessor = conflicts.itemConflicts.raw.professor.alloc;

  let hasDayAllocProfessor = false;

  allocProfessor.forEach((alloc) => {
    const allocId = alloc.from.id;
    if (allocId === classTime.id) {
      hasDayAllocProfessor = true;
    }
  });

  const hasProfessorAllocConflict = hasDay && hasDayAllocProfessor;

  const professorAllocStyle = hasProfessorAllocConflict
    ? conflictStyle
    : defaultStyle;
  // console.log("conflictStyle", classTime.duracao, hasProfessorAllocConflict);

  return professorAllocStyle;
}

function getStyledConflictDay(classTimeStyles, classTime) {
  const dayStyles = {};

  dayStyles.default = getDefaultStyleDay();
  dayStyles.notSetted = getnotSettedStyleDay(classTime);
  dayStyles.roomAlloc = getRoomAllocStyleDay(classTimeStyles, classTime);
  dayStyles.professorAlloc = getProfessorAllocStyleDay(
    classTimeStyles,
    classTime
  );
  dayStyles.merged = mergeStyles(dayStyles);

  return dayStyles;
}

export { getStyledConflictDay };
