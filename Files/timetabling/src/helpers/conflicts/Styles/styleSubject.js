import text from "../../../config/frontText";
import defaultColors from "../../../config/defaultColors";

const conflictOptions = defaultColors.conflicts;
const subjectConflictColors = defaultColors.subject;
const defaultTitles = text.conflicts.subject;

function getStyledConflictParity({ generalStatus, minimalSubjectInfo }) {
  const { isCSMandatory, isOnRightParity, isSummer } = generalStatus;
  const { expectedSemester } = minimalSubjectInfo;
  console.log(generalStatus);

  const expectedSemesterText = `Disciplina do ${expectedSemester}º período\n`;

  const defaultParityStatus = { title: "", style: {} };
  const rightParityStyle = {
    title: defaultTitles.parity + expectedSemesterText,
    style: {
      backgroundColor: subjectConflictColors.rightParity[expectedSemester],
    },
  };
  const wrongParityStyle = {
    title: defaultTitles.parityConflict + expectedSemesterText,
    style: {
      backgroundColor: subjectConflictColors.wrongParity[expectedSemester],
    },
  };
  const summerParityStyle = {
    title: defaultTitles.summer,
    style: { backgroundColor: subjectConflictColors.summer[expectedSemester] },
  };

  let parityStyle = defaultParityStatus;

  if (isSummer && isCSMandatory) {
    parityStyle = summerParityStyle;
  } else if (isCSMandatory) {
    parityStyle = isOnRightParity ? rightParityStyle : wrongParityStyle;
  } else {
    parityStyle = defaultParityStatus;
  }

  return parityStyle;
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

function getStyledConflictNull({ hasSubject, hasExpectedSemester }) {
  const defaultNullStyle = { title: defaultTitles.isSet, style: {} };
  const conflictSubjectNotSet = {
    title: defaultTitles.notSetSubject,
    style: { backgroundColor: conflictOptions.notSetted.subject },
  };
  const conflictExpectedSemesterNotSet = {
    title: defaultTitles.notSetExpectedSemester,
    style: { backgroundColor: subjectConflictColors.noExpectedDemand },
  };

  let nullSubjectStyle = defaultNullStyle;

  if (!hasSubject) {
    nullSubjectStyle = conflictSubjectNotSet;
  } else if (!hasExpectedSemester) {
    nullSubjectStyle = conflictExpectedSemesterNotSet;
  }

  return nullSubjectStyle;
}

function getStyledConflictCourse({ isCS, isNotCS }) {
  const defaultCourseStyle = { title: defaultTitles.CSSubject, style: {} };
  const notCSStyle = {
    title: defaultTitles.notCSSubject,
    style: { backgroundColor: subjectConflictColors.NotCS },
  };

  let courseStyle = {};

  if (isNotCS) {
    courseStyle = notCSStyle;
  } else if (!isCS) {
    courseStyle = { title: "", style: {} };
  } else {
    courseStyle = defaultCourseStyle;
  }

  return courseStyle;
}

function getStyledConflictCategory(generalStatus) {
  const { isOptionalCS, isOptionalFree, isCSMandatory } = generalStatus;

  const optionalCSStyle = {
    title: defaultTitles.optionalCS,
    style: { backgroundColor: subjectConflictColors.OptionalCS },
  };
  const optionalFreeStyle = {
    title: defaultTitles.optionalFree,
    style: { backgroundColor: subjectConflictColors.OptionalFree },
  };
  const mandatoryCSSubjectStyle = {
    title: defaultTitles.mandatoryCSSubject,
    style: {},
  };
  const defaultCategoryStyle = { title: "", style: {} };

  let categoryStyle = {};

  if (isOptionalCS) {
    categoryStyle = optionalCSStyle;
  } else if (isOptionalFree) {
    categoryStyle = optionalFreeStyle;
  } else if (isCSMandatory) {
    categoryStyle = mandatoryCSSubjectStyle;
  } else {
    categoryStyle = defaultCategoryStyle;
  }

  // console.log(categoryStyle);

  return categoryStyle;
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

  if (styles.notCS) {
    newTitle += styles.notCS.title;
    newStyle = { ...newStyle, ...styles.notCS.style };
  }

  console.log(newStyle);
  if (styles.parity) {
    newTitle += styles.parity.title;
    newStyle = { ...newStyle, ...styles.parity.style };
  }

  if (styles.category) {
    newTitle += styles.category.title;
    newStyle = { ...newStyle, ...styles.category.style };
  }

  const mergedStyles = {
    title: newTitle,
    style: newStyle,
  };

  return mergedStyles;
}

function getStyledConflictSubject(conflicts) {
  const rawsubjectConflictColorss = conflicts.raw.subject;
  const generalStatus = rawsubjectConflictColorss.generalStatus;

  const subjectStyles = {};

  subjectStyles.default = getStyledConflictsDefault();
  subjectStyles.notSet = getStyledConflictNull(generalStatus);
  subjectStyles.notCS = getStyledConflictCourse(generalStatus);
  subjectStyles.category = getStyledConflictCategory(generalStatus);
  subjectStyles.parity = getStyledConflictParity(rawsubjectConflictColorss);

  subjectStyles.merged = mergeStyles(subjectStyles);

  return subjectStyles;
}

export { getStyledConflictSubject };
