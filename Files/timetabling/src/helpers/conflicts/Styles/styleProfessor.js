import options from "../../../DB/local/options";

const conflictOptions = options.config.colors.conflicts;

const defaultTitles = {
  base: "Conflitos de professor avaliados:\n",
  notSetted: "✅ Sem conflitos de professor não definido\n",
  notSettedConflict: "❌ Conflito: professor não definido\n",
  alloc: "✅ Sem conflitos de alocação de professor\n",
  allocConflict: "❌ Conflito: Alocação de professor\n",
};

function getProfessorDefaultStyle() {
  const defaultStyle = {
    title: defaultTitles.base,
    style: {
      backgroundColor: conflictOptions.noProblem.professor,
    },
  };
  return defaultStyle;
}

function getProfessornotSettedStyle(classItem) {
  const defaultNullStyle = { title: defaultTitles.notSetted, style: {} };
  const professor = classItem?.professor;
  const hasProfessor = professor !== null && professor !== undefined;

  const conflictNullStyle = {
    title: defaultTitles.notSettedConflict,
    style: {
      backgroundColor: conflictOptions.notSetted.professor,
    },
  };

  const notSettedStyle = hasProfessor ? defaultNullStyle : conflictNullStyle;
  return notSettedStyle;
}

function getProfessorAllocMessage(profAllocConflict) {
  const hasConflicts = profAllocConflict.length > 0;
  let conflictMessage = hasConflicts ? defaultTitles.allocConflict : "";

  /*
  CASO 1:
  ❌ Conflito: Alocação de professor\n
  - Horário: A
   -- Turma: 1, Horários: [B]
   -- Turma: 2, Horários: [C]
   -- Turma: 4, Horários: [E, F]
  - Horário: B
   -- Turma: 1, Horários: [A]
   -- Turma: 2, Horários: [C]
   -- Turma: 4, Horários: [E, F]

  CASO 2:
  ❌ Conflito: Alocação de professor\n
  - Horário C:
   -- Turma: 1, Horários: [A, B]
   -- Turma: 4, Horários: [E, F]
  */

  profAllocConflict.forEach((conflict) => {
    conflictMessage += `\t- Horário: ${conflict.from.id}\n`;
    conflict.to.forEach((classTimeIdTarget) => {
      conflictMessage += `\t\t- Turma: ${classTimeIdTarget.idTurma}, horários: `;
      conflictMessage += JSON.stringify(classTimeIdTarget.idHorario) + "\n";
    });
  });
  return conflictMessage;
}

function getProfessorAllocStyle(allocConflict) {
  const defaultAllocStyle = { title: defaultTitles.alloc, style: {} };
  const allocConflictStyle = {
    title: getProfessorAllocMessage(allocConflict),
    style: {
      backgroundColor: conflictOptions.hasConflict.professor,
    },
  };

  const profAllocConflict = allocConflictStyle.title !== "";

  const allocStyle = profAllocConflict ? allocConflictStyle : defaultAllocStyle;

  return allocStyle;
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

  const mergedStyles = {
    title: newTitle,
    style: newStyle,
  };

  // console.log("mergedStyles", mergedStyles);
  return mergedStyles;
}

function getStyledConflictProfessor(conflicts, classItem) {
  const professorStyles = {};

  professorStyles.default = getProfessorDefaultStyle();
  professorStyles.notSetted = getProfessornotSettedStyle(classItem);
  professorStyles.alloc = getProfessorAllocStyle(conflicts.raw.professor.alloc);

  // professorStyles.preferences = getPreferencesStyles();
  // professorStyles.subjects = getSubjectsStyles();
  professorStyles.merged = mergeStyles(professorStyles);

  return professorStyles;
}

export { getStyledConflictProfessor };