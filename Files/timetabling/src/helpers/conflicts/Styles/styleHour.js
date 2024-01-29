import options from "../../../DB/local/options";

const conflictOptions = options.config.colors.conflicts;

const defaultTitles = {
  base: "Conflitos de hora avaliados:\n",
  roomAlloc: "✅ Sem conflitos de alocação de sala\n",
  professorAlloc: "✅ Sem conflitos de alocação de professor\n",
  notSet: "✅ Sem conflitos de hora não definida\n",
  notSetConflict: "❌ Conflito: hora não definida\n",
};

function getDefaultStyleHour() {
  const defaultStyle = {
    title: defaultTitles.base,
    style: {
      backgroundColor: conflictOptions.noProblem.hour,
    },
  };
  return defaultStyle;
}

function getNotSetStyleHour(classTime) {
  const defaultNullStyle = { title: defaultTitles.notSet, style: {} };
  const hour = classTime?.horaInicio;
  const hasHour = hour !== null && hour !== undefined;

  const conflictNullStyle = {
    title: defaultTitles.notSetConflict,
    style: {
      backgroundColor: conflictOptions.notSet.hour,
    },
  };

  const notSetStyle = hasHour ? defaultNullStyle : conflictNullStyle;
  return notSetStyle;
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

function getRoomAllocStyleHour(conflicts, classTime) {
  const defaultStyle = { title: defaultTitles.roomAlloc, style: {} };
  const conflictStyle = conflicts.room.alloc;

  const rawRoomAllocConflict = conflicts.timeConflicts.raw.room.alloc;
  const hasHour = classTime.horaInicio;
  const hasRoomAlloc = rawRoomAllocConflict.length !== 0;

  const hasRoomAllocConflict = hasHour && hasRoomAlloc;

  const roomAllocStyle = hasRoomAllocConflict ? conflictStyle : defaultStyle;
  // console.log("conflictStyle", classTime.duracao, hasRoomAllocConflict);

  return roomAllocStyle;
}

function getProfessorAllocStyleHour(conflicts, classTime) {
  const defaultStyle = { title: defaultTitles.professorAlloc, style: {} };
  const conflictStyle = conflicts.itemConflicts.styled.professor.alloc;

  const hasHour = classTime.horaInicio;

  const allocProfessor = conflicts.itemConflicts.raw.professor.alloc;

  let hasHourAllocProfessor = false;

  allocProfessor.forEach((alloc) => {
    const allocId = alloc.from.id;
    if (allocId === classTime.id) {
      hasHourAllocProfessor = true;
    }
  });

  const hasProfessorAllocConflict = hasHour && hasHourAllocProfessor;

  const professorAllocStyle = hasProfessorAllocConflict
    ? conflictStyle
    : defaultStyle;
  // console.log("conflictStyle", classTime.duracao, hasProfessorAllocConflict);

  return professorAllocStyle;
}

function getStyledConflictHour(conflictStyles, classTime) {
  const hourStyles = {};

  hourStyles.default = getDefaultStyleHour();
  hourStyles.notSet = getNotSetStyleHour(classTime);
  hourStyles.roomAlloc = getRoomAllocStyleHour(conflictStyles, classTime);
  hourStyles.professorAlloc = getProfessorAllocStyleHour(
    conflictStyles,
    classTime
  );
  hourStyles.merged = mergeStyles(hourStyles);

  return hourStyles;
}

export { getStyledConflictHour };
