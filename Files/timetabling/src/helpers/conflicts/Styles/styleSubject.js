import options from "../../../DB/local/options";

const conflictOptions = options.config.colors.conflicts;

const defaultTitles = {
  base: "Conflitos de disciplina avaliados:\n",

  isSet: "✅ Disciplina está definida ",
  optional: "mas não é obrigatória",
  notSettedConflict: "❌ Conflito: disciplina não está definida\n",

  parity: "✅ Disciplina está na paridade adequada\n",
  summer: "✅🌞 Não há necessidade de paridade no verão\n",
  noParity: "⚠️ Disciplina não tem uma paridade especificada\n",
  parityConflict: "❌ Conflito: disciplina não está na paridade correta\n",
};

function getStyledConflictSubject(conflicts) {
  const rawSubjectConflicts = conflicts.raw.subject;

  const subjectStyles = {};

  subjectStyles.default = getStyledConflictsDefault();
  subjectStyles.notSetted = getStyledConflictNull(rawSubjectConflicts);
  subjectStyles.parity = getStyledConflictsParity(rawSubjectConflicts);
  subjectStyles.merged = mergeStyles(subjectStyles);

  // console.log(subjectStyles.merged.title);

  return subjectStyles;
}

function getStyledConflictsDefault() {
  const defaultStyle = {
    title: defaultTitles.base,
    style: {
      backgroundColor: conflictOptions.notSetted.subject,
    },
  };
  return defaultStyle;
}

function getStyledConflictNull(conflicts) {
  const defaultNullStyle = { title: defaultTitles.isSet, style: {} };
  // console.log(conflicts);
  const conflictNullStyle = {
    title: defaultTitles.notSettedConflict,
    style: {
      backgroundColor: conflictOptions.notSetted.subject,
    },
  };

  let newText = "";

  const isOptional = conflicts.parity.status === null;
  const semester = conflicts.parity.from?.expectedSemester;

  if (isOptional) {
    newText += defaultTitles.optional;
  } else if (semester > -1) {
    newText += `com período ${semester}`;
  }

  defaultNullStyle.title += newText + "\n";

  const isSet = conflicts.hasSubject;
  const nullSubjectStyle = isSet ? defaultNullStyle : conflictNullStyle;

  return nullSubjectStyle;
}

function getStyledConflictsParity(conflicts) {
  const { hasSubject, hasSemester, isSummer, parity } = conflicts;

  let newTitle = "";
  let parityColor = conflictOptions.notSetted.subject;

  const semester = parity.from?.expectedSemester;
  if (parity.status === true) {
    newTitle = defaultTitles.parity;
    parityColor = options.config.colors.subject.rightParity[semester];
  } else if (parity.status === false) {
    newTitle = defaultTitles.parityConflict;
    parityColor = options.config.colors.subject.wrongParity[semester];
  } else if (parity.status === null && hasSubject && hasSemester) {
    newTitle = defaultTitles.noParity;
    parityColor = options.config.colors.subject.noParity;
  }

  if (isSummer && hasSubject && hasSemester) {
    newTitle = defaultTitles.summer;
    parityColor = options.config.colors.subject.summer[semester];
  }

  const parityStyle = {
    title: newTitle,
    style: { backgroundColor: parityColor },
  };

  return parityStyle;
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

  if (styles.parity) {
    newTitle += styles.parity.title;
    newStyle = { ...newStyle, ...styles.parity.style };
  }

  const mergedStyles = {
    title: newTitle,
    style: newStyle,
  };

  return mergedStyles;
}

export { getStyledConflictSubject };
