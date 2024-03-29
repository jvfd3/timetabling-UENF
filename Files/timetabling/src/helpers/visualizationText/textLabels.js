import { getId } from "../auxCRUD";
import { menuIsOpen } from "../auxFunctions";
import {
  getAlias,
  getBlock,
  getCapacity,
  getCategory,
  getCenter,
  getClassTimes,
  getCode,
  getCourse,
  getDay,
  getDescription,
  getDuration,
  getEnrollment,
  getEntryYear,
  getExpectedDemand,
  getExpectedSemester,
  getLab,
  getLevel,
  getModality,
  getName,
  getProfessor,
  getRoom,
  getSection,
  getSemester,
  getStartTime,
  getSubject,
  getYear,
} from "./multiGetValues";

/* DEFAULT */

function checkIndefinition(value) {
  return value ? value : "Indef.";
}

function defaultLabel(item) {
  /*  Go through all keys and append them to the current label
      If the item is a list or an object, it becomes recursive and inserts all items.
      lists are considered objects with the indices as keys
  */
  let label = "";
  for (const key in item) {
    label += key + ":";
    if (typeof item?.[key] === "object") {
      label += "{ ";
      label += defaultLabel(item?.[key]);
      label += "} ";
    } else {
      label += checkIndefinition(item?.[key]) + " ";
    }
  }
  return label;
}

function getNameAliasText(object) {
  const name = getName(object);
  const alias = getAlias(object);
  const code = getCode(object);
  const id = getId(object);

  const nameText = checkIndefinition(name ?? alias ?? code ?? id);

  const nameAliasText = object ? nameText : "";
  return nameAliasText;
}

function getAliasNameText(object) {
  const name = getName(object);
  const alias = getAlias(object);
  const code = getCode(object);
  const id = getId(object);

  const nameText = checkIndefinition(alias ?? name ?? code ?? id);

  const nameAliasText = object ? nameText : "";
  return nameAliasText;
}

/* MISC */

function getCCTableClassCellText(splittedClass) {
  // console.log("splittedClass", splittedClass);
  const subject = getSubject(splittedClass);
  const professor = getProfessor(splittedClass);
  const room = getRoom(splittedClass);
  const duration = getDuration(splittedClass);
  const description = getDescription(splittedClass);
  const expectedDemand = getExpectedDemand(splittedClass);

  const expectedSemester = getExpectedSemester(subject);
  const subjectAlias = getAliasNameText(subject);
  const professorAlias = getAliasNameText(professor);
  const roomBlock = getBlock(room);
  const roomCode = getCode(room);

  let expectedSemesterText = expectedSemester;
  if (expectedSemester > 10) {
    if (expectedSemester === 11) {
      expectedSemesterText = "OPT";
    } else if (expectedSemester === 12) {
      expectedSemesterText = "ELT";
    } else if (expectedSemester === 13) {
      expectedSemesterText = "ÑCC";
    }
  }

  const descriptionText = description ? ` - ${description}` : "";
  const unusualDuration = duration != 2 ? " (" + duration + "h)" : "";
  const demandText = expectedDemand ? ` - ${expectedDemand}a` : "";

  const subjectInfo = subject
    ? `${expectedSemesterText ?? "?"} - ${
        subjectAlias ?? "Apelido ?"
      }${descriptionText}${demandText}`
    : "Discip. ?";
  const profInfo = professor ? `${professorAlias}` : "Prof. ?";
  const roomInfo = room
    ? `${roomBlock ?? "Bloco ?"}${roomCode ? "-" + roomCode : ""}`
    : "Sala ?";
  const cellMessage = `${subjectInfo} (${profInfo} / ${roomInfo})${unusualDuration}`;
  return cellMessage;
}

function getCreateClassItemTitle(classItem) {
  const year = getYear(classItem);
  const semester = getSemester(classItem);
  const subject = getSubject(classItem);
  const professor = getProfessor(classItem);
  const classTimes = getClassTimes(classItem);
  const classTime = classTimes?.[0];
  const room = getRoom(classTime);

  const hasClassTimes = classTimes?.length > 0;

  let title = "";
  title += `Criar turma`;
  // title += "\n" + JSON.stringify(classItem) + "\n";
  title += ` (${year}.${semester})`;
  title += subject ? `\n\t- Disciplina: ${getAliasNameText(subject)}` : "";
  title += professor ? `\n\t- Professor: ${getAliasNameText(professor)}` : "";
  title += hasClassTimes && room ? `\n\t- Horários:` : "";
  title += room ? `\n\t\t- Sala: ${getAliasNameText(room)}` : "";
  return title;
}

function getSubjectInputMessage(inputConfig, subjects) {
  const subjectsSize = subjects.length;
  const offerAllSubjectsMessage = `Adicionar todas as ${subjectsSize} turmas pendentes `;
  const extraText = inputConfig?.text ?? "";

  let oneSubjectClassMessage = `Adicionar turma da disciplina`;
  let finalMessage = offerAllSubjectsMessage + extraText;

  if (subjects.length === 1) {
    oneSubjectClassMessage += ` ${subjects?.[0]?.codigo}`;
    finalMessage = oneSubjectClassMessage;
  }

  return finalMessage;
}

/* SUBJECT */

function getSubjectViewTableText(subject) {
  const subjectCode = getCode(subject);

  const subjectCodeText = checkIndefinition(subjectCode);
  const subjectNameText = getAliasNameText(subject);

  const subjectText = `${subjectCodeText} - ${subjectNameText}`;

  let subjectLabel = "";
  subjectLabel += `${subjectText}`;
  subjectLabel = subject ? subjectLabel : "Indef.";
  return subjectLabel;
}

function getSubjectFormatLabel(subject, context) {
  const code = getCode(subject);

  const center = getCenter(subject);
  const lab = getLab(subject);
  const expectedSemester = getExpectedSemester(subject);

  const codeText = checkIndefinition(code);

  let semesterLabel = "";
  if (expectedSemester) {
    if (0 < expectedSemester && expectedSemester <= 10) {
      semesterLabel += `Período: ${expectedSemester}`;
    } else if (expectedSemester === 11) {
      semesterLabel += "Eletiva Optativa";
    } else if (expectedSemester === 12) {
      semesterLabel += "Eletiva Livre";
    } else if (expectedSemester === 13) {
      semesterLabel += "Não-CC";
    } else {
    }
  } else {
    semesterLabel += "Período: " + checkIndefinition(expectedSemester);
  }

  const preLabelTexts = [];

  if (menuIsOpen(context)) {
    if (center) preLabelTexts.push(checkIndefinition(center));
    if (lab) preLabelTexts.push(checkIndefinition(lab));
    if (expectedSemester) preLabelTexts.push(semesterLabel);
  }

  const hasPreLabel = preLabelTexts.length > 0;
  const preLabel = hasPreLabel ? `(${preLabelTexts.join(", ")}) ` : "";

  const shortSubject = getAliasNameText(subject);
  const longSubject = getNameAliasText(subject);

  let shortLabel = shortSubject;

  let fullLabel = "";
  fullLabel += codeText + " - ";
  fullLabel += longSubject;

  let subjectLabel = "";
  subjectLabel += preLabel;
  subjectLabel += menuIsOpen(context) ? fullLabel : shortLabel;
  return subjectLabel;
}

/* PROFESSOR */

function getProfessorViewTableText(professor) {
  let professorLabel = "";
  professorLabel += getAliasNameText(professor);
  professorLabel = professor ? professorLabel : "Indef.";
  return professorLabel;
}

function getProfessorFormatLabel(professor, context) {
  const course = getCourse(professor);
  // const center = getCenter(professor);
  const lab = getLab(professor);

  const labText = checkIndefinition(lab);
  const courseText = checkIndefinition(course);

  const elements = [labText, courseText].filter(Boolean);

  let longLabel = "";
  longLabel += elements.length ? `(${elements.join(", ")}) ` : "";
  longLabel += getNameAliasText(professor);

  let shortLabel = "";
  shortLabel += lab || course ? `(${checkIndefinition(lab ?? course)}) ` : "";
  shortLabel += getAliasNameText(professor);

  let professorLabel = "";
  professorLabel += menuIsOpen(context) ? longLabel : shortLabel;
  professorLabel =
    professor && professorLabel.length > 0 ? professorLabel : "Prof. Indef.";
  return professorLabel;
}

function getCourseFormatLabel(course, context) {
  // const id = getId(course);
  const level = getLevel(course);
  const center = getCenter(course);
  const modality = getModality(course);
  const category = getCategory(course);

  const nameText = getNameAliasText(course);

  let shortLabel = "";
  shortLabel += nameText;

  const longLabelTexts = [];

  if (level) longLabelTexts.push(checkIndefinition(level));
  if (center) longLabelTexts.push(checkIndefinition(center));
  if (modality) longLabelTexts.push(checkIndefinition(modality));
  if (category) longLabelTexts.push(checkIndefinition(category));

  let longLabel = "";
  longLabel += `(${longLabelTexts.join(", ")}) `;
  longLabel += nameText;

  let courseLabel = "";
  courseLabel += menuIsOpen(context) ? longLabel : shortLabel;
  return courseLabel;
  // return menuIsOpen(context) ? getAliasNameText(course) : getNameAliasText(course);
}

function getLabFormatLabel(lab, context) {
  // "id": 2,
  // "centro": "CCT",
  // "apelido": "LCFIS",
  // "nome": "Laboratório de Ciências Físicas"
  // const id = getId(lab);
  const center = getCenter(lab);
  const alias = getAlias(lab);
  const name = getName(lab);

  const centerLabel = `(${checkIndefinition(center)}) `;

  let longLabel = "";
  longLabel += ` - ${checkIndefinition(name)}`;

  let shortLabel = "";

  let labLabel = "";
  labLabel += centerLabel;
  labLabel += checkIndefinition(alias);
  labLabel += menuIsOpen(context) ? longLabel : shortLabel;
  return labLabel;
}

/* CLASSTIME */

function getStartHourFormatLabel(hour, context) {
  const startHour = getStartTime(hour);
  const section = getSection(hour);

  const hourLabel = checkIndefinition(startHour);

  let longLabel = "";
  longLabel += ` (${checkIndefinition(section)})`;

  let shortLabel = "";

  let startHourLabel = "";
  startHourLabel += hourLabel;
  startHourLabel += menuIsOpen(context) ? longLabel : shortLabel;
  return startHourLabel;
}

function getClassTimeText(classTime) {
  const day = getDay(classTime);
  const startTime = getStartTime(classTime);
  const duration = getDuration(classTime);
  const room = getRoom(classTime);

  const roomText = getRoomText(room);
  const endingTime = startTime + duration;

  const durationText =
    duration == 0
      ? "Sem aula"
      : startTime + "~" + (duration === null ? "?" : endingTime);

  const values = [];
  if (room) {
    values.push(roomText);
  }
  if (day) {
    values.push(day);
  }
  if (startTime || duration == 0) {
    values.push(durationText);
  }
  const cleanValues = values.filter((value) => value !== "");
  const hasValues = cleanValues.length > 0;

  let classTimeText = "";
  classTimeText += hasValues
    ? `(${cleanValues.join(", ")})`
    : `${getId(classTime)}`;
  return classTimeText;
}

/* CLASSITEM */

function getClassTimeLabel(classTime) {
  const room = getRoom(classTime);
  const roomCapacity = getCapacity(room);
  const roomBlock = getBlock(room);
  const roomCode = getCode(room);

  const capacityLabel = checkIndefinition(roomCapacity);
  const codeBlock =
    checkIndefinition(roomBlock) + "-" + checkIndefinition(roomCode);
  // const midRoomLabel = `${capacityLabel}, ${codeBlock}`;
  const midRoomLabel = codeBlock;
  const finalRoomLabel = room ? midRoomLabel : "Indef.";

  const day = getDay(classTime);
  const dayLabel = checkIndefinition(day);

  const startTime = getStartTime(classTime);
  const startTimeLabel = checkIndefinition(startTime);

  const endTime = startTime + getDuration(classTime);
  const endTimeLabel = checkIndefinition(endTime);

  const timeLabel = `${dayLabel}: ${startTimeLabel}~${endTimeLabel}`;

  let classTimeLabel = "";
  classTimeLabel += finalRoomLabel + ", ";
  classTimeLabel += timeLabel;
  classTimeLabel = `(${classTimeLabel})`;
  return classTimeLabel;
}

function getClassItemMainSelectionFormatLabel(classItem, context) {
  const id = getId(classItem);
  const year = getYear(classItem);
  const semester = getSemester(classItem);
  const subject = getSubject(classItem);
  const professor = getProfessor(classItem);
  const classTimes = getClassTimes(classItem);

  let classTimesLabels = [];
  classTimes.forEach((classTime) => {
    const newLabel = getClassTimeLabel(classTime);
    classTimesLabels.push(newLabel);
  });

  const hasClassTimes = classTimes?.length > 0;
  const classTimesLabel = hasClassTimes
    ? `Horários: [${classTimesLabels.join("; ")}]`
    : "";

  const professorLabel = getAliasNameText(professor);
  const subjectLabel = getAliasNameText(subject);

  const idLabel = `(id: ${id}) `;
  const yearSemester = `${year}.${semester}`;

  const texts = [yearSemester, subjectLabel, professorLabel, classTimesLabel];
  // remove empty texts
  const cleanTexts = texts.filter((text) => text !== "");
  const classItemLabelValues = cleanTexts.join(" - ");

  let classItemLabel = "";
  // classItemLabel += idLabel;
  classItemLabel += classItemLabelValues;
  return classItemLabel;
}

function getClassItemText(classItem) {
  const year = getYear(classItem);
  const semester = getSemester(classItem);
  const subject = getSubject(classItem);
  const professor = getProfessor(classItem);
  const description = getDescription(classItem);

  const dateText = year ? year + "." + semester : "";
  const subjectText = getAliasNameText(subject);
  const professorText = getAliasNameText(professor);
  const descriptionText = description ?? "";

  const texts = [dateText, subjectText, professorText, descriptionText];

  // remove empty texts
  const cleanTexts = texts.filter((text) => text !== "");
  const finalText = cleanTexts.join(", ");

  let classItemText = "";
  classItemText += "(";
  classItemText += finalText;
  classItemText += ")";
  return classItemText;
}

/* ROOM */

function getRoomText(room) {
  const block = getBlock(room);
  const code = getCode(room);

  const codeText = checkIndefinition(code);
  const blockText = checkIndefinition(block);

  const roomText = room ? blockText + "-" + codeText : "";
  return roomText;
}

function getRoomMainSelectionFormatLabel(room, context) {
  // const id = getId(room);
  // const idBlock = room?.idBlock;
  const capacity = getCapacity(room);
  const block = getBlock(room);
  const code = getCode(room);
  const description = getDescription(room);

  const capacityText = `(${capacity ?? "??"}) `;
  const blockText = checkIndefinition(block);
  const codeText = checkIndefinition(code);
  const descriptionText = checkIndefinition(description);

  const cleanDescription = description ? descriptionText + " - " : "";

  // It's the same for now but could be different in the future
  let longLabel = "";
  longLabel += capacityText + blockText + " - " + cleanDescription + codeText;

  let shortLabel = "";
  shortLabel += longLabel;

  let roomLabel = "";
  roomLabel += menuIsOpen(context) ? longLabel : shortLabel;
  return roomLabel;
}

function getRoomFormatLabel(room, context) {
  const block = getBlock(room);
  const capacity = getCapacity(room);
  const code = getCode(room);
  const description = getDescription(room);
  // const id = getId(room);
  // const idBlock = room?.idBlock;

  const capacityLabel = `(${capacity ?? "?"}) `;

  let shortLabel = "";

  let longLabel = "";
  longLabel += description ?? "";

  let labelTexts = [];
  if (block) labelTexts.push(checkIndefinition(block));
  if (code) labelTexts.push(checkIndefinition(code));
  labelTexts.push(menuIsOpen(context) ? longLabel : shortLabel);

  // filter all empty texts

  const filteredTexts = labelTexts.filter((text) => text !== "");

  let roomLabel = "";
  roomLabel += capacityLabel;
  roomLabel += filteredTexts.join(" - ");
  roomLabel = room ? roomLabel : "Sala Indef.";
  return roomLabel;
}

function getBlockFormatLabel(block, context) {
  // const blockId = getId(block);
  const blockCode = getCode(block) ?? getAlias(block);
  const blockAlias = getAlias(block);
  const blockName = getName(block);

  // let msg = `(${code}) `;
  // const sameCodigoAndApelido = alias === code;
  // msg += sameCodigoAndApelido ? `${name}` : `${alias}`;
  // const finalMessage = isMenuLabel ? msg : `${code}`;
  // return finalMessage;

  const hasSameInfo = blockAlias === blockCode;
  const blockDescription = hasSameInfo ? blockName : blockAlias;

  let shortLabel = "";

  let longLabel = "";
  longLabel += " - " + checkIndefinition(blockDescription);

  let blockLabel = "";
  blockLabel += checkIndefinition(blockCode);
  blockLabel += menuIsOpen(context) ? longLabel : shortLabel;
  return blockLabel;
}

/* STUDENT */

function getLabelStudentSelection(student, context) {
  // const id = getId(student);
  const entryYear = getEntryYear(student);
  const course = getCourse(student);
  const enrollment = getEnrollment(student);
  const name = getName(student);

  const nameText = getNameAliasText(student);

  const longLabelTexts = [];
  if (entryYear) longLabelTexts.push(checkIndefinition(entryYear));
  if (course) longLabelTexts.push(checkIndefinition(course));

  const hasLongLabel = longLabelTexts.length > 0;
  let longLabel = "";
  longLabel += hasLongLabel ? `(${longLabelTexts.join(", ")}) ` : "";

  const shortLabelTexts = [];
  if (enrollment) shortLabelTexts.push(checkIndefinition(enrollment));
  if (name) shortLabelTexts.push(nameText);

  let shortLabel = "";

  let studentLabel = "";
  studentLabel += menuIsOpen(context) ? longLabel : shortLabel;
  studentLabel += shortLabelTexts.join(" - ");
  studentLabel = student && studentLabel.length > 0 ? studentLabel : "Indef.";
  return studentLabel;
}

export {
  /* DEFAULT */
  checkIndefinition,
  defaultLabel,
  getNameAliasText,
  getAliasNameText,
  /* MISC */
  getCCTableClassCellText,
  getCreateClassItemTitle,
  getSubjectInputMessage,
  /* CRUD */
  getClassTimeText,
  /* CLASSITEM */
  getClassItemText,
  getStartHourFormatLabel,
  getClassItemMainSelectionFormatLabel,
  /* SUBJECT */
  getSubjectViewTableText,
  getSubjectFormatLabel,
  /* PROFESSOR */
  getProfessorViewTableText,
  getProfessorFormatLabel,
  getCourseFormatLabel,
  getLabFormatLabel,
  /* ROOM */
  getRoomText,
  getRoomMainSelectionFormatLabel,
  getRoomFormatLabel,
  getBlockFormatLabel,
  /* STUDENT */
  getLabelStudentSelection,
};
