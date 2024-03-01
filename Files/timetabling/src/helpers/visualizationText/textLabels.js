import { getId } from "../auxCRUD";
import { menuIsOpen } from "../auxFunctions";

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

/* CLASSTIME */

function getStartHourFormatLabel(hour, context) {
  const startHour = hour?.hour ?? hour?.hora;
  const section = hour?.section ?? hour?.turno;

  const hourLabel = checkIndefinition(startHour);

  let longLabel = "";
  longLabel += `(`;
  longLabel += checkIndefinition(section);
  longLabel += `)`;

  let shortLabel = "";

  let startHourLabel = "";
  startHourLabel += hourLabel;
  startHourLabel += menuIsOpen(context) ? longLabel : shortLabel;
  return startHourLabel;
}

/* SUBJECT */

function getSubjectViewTableText(subject) {
  const subjectCode = subject?.code ?? subject?.codigo;
  const subjectAlias = subject?.alias ?? subject?.apelido;

  const subjectCodeText = checkIndefinition(subjectCode);
  const subjectNameText = checkIndefinition(subjectAlias);

  const subjectText = `${subjectCodeText} - ${subjectNameText}`;

  let subjectLabel = "";
  subjectLabel += `${subjectText}`;
  subjectLabel = subject ? subjectLabel : "Indef.";
  return subjectLabel;
}

function getSubjectFormatLabel(subject, context) {
  const code = subject?.code ?? subject?.codigo;
  const name = subject?.name ?? subject?.nome;
  const alias = subject?.alias ?? subject?.apelido;

  const center = subject?.center ?? subject?.centro;
  const lab = subject?.laboratory;
  const expectedSemester = subject?.expectedSemester ?? subject?.periodo;

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

  let preLabel = "";
  preLabel += "(";
  preLabel +=
    center && menuIsOpen(context) ? checkIndefinition(center) + ", " : "";
  preLabel += lab && menuIsOpen(context) ? checkIndefinition(lab) + ", " : "";
  preLabel += codeText;
  preLabel +=
    expectedSemester && menuIsOpen(context) ? `, ${semesterLabel}` : "";
  preLabel += ") ";

  const shortSubject = alias
    ? checkIndefinition(alias)
    : checkIndefinition(name);
  const longSubject = checkIndefinition(name);

  let shortLabel = "";
  shortLabel += shortSubject;

  let fullLabel = "";
  fullLabel += fullLabel += longSubject;

  let subjectLabel = "";
  subjectLabel += preLabel;
  subjectLabel += menuIsOpen(context) ? fullLabel : shortLabel;
  return subjectLabel;
}

/* PROFESSOR */

function getProfessorViewTableText(professor) {
  const professorAlias = professor?.alias ?? professor?.apelido;
  const professorAliasText = checkIndefinition(professorAlias);

  let professorLabel = "";
  professorLabel += professorAliasText;
  professorLabel = professor ? professorLabel : "Indef.";
  return professorLabel;
}

function getProfessorFormatLabel(professor, context) {
  const name = professor?.name ?? professor?.nome;
  const alias = professor?.alias ?? professor?.apelido;
  const course = professor?.course ?? professor?.curso;
  // const center = professor?.center ?? professor?.centro;
  const lab = professor?.lab ?? professor?.laboratory ?? professor?.laboratorio;

  const labText = checkIndefinition(lab);
  const courseText = checkIndefinition(course);

  let longLabel = "";
  longLabel += lab || course ? "(" : "";
  longLabel += lab ? labText : "";
  longLabel += lab && course ? ", " : "";
  longLabel += courseText;
  longLabel += lab || course ? ") " : "";
  longLabel += checkIndefinition(name);

  let shortLabel = "";
  shortLabel += lab || course ? `(${checkIndefinition(lab ?? course)}) ` : "";
  shortLabel += checkIndefinition(alias ?? name);

  let professorLabel = "";
  professorLabel += menuIsOpen(context) ? longLabel : shortLabel;
  professorLabel = professor ? professorLabel : "Prof. Indef.";
  return professorLabel;
}

function getCourseFormatLabel(course, context) {
  const alias = course?.alias;
  const name = course?.name;

  const aliasText = checkIndefinition(alias ?? name);
  const nameText = checkIndefinition(name ?? alias);

  let shortLabel = "";
  shortLabel += aliasText;

  let longLabel = "";
  longLabel += nameText;

  let courseLabel = "";
  courseLabel += menuIsOpen(context) ? longLabel : shortLabel;
  return courseLabel;
  // return menuIsOpen(context) ? checkIndefinition(course?.alias ?? course?.name) : checkIndefinition(course?.name ?? course?.alias);
}

function getLabFormatLabel(lab, context) {
  // "id": 2,
  // "centro": "CCT",
  // "apelido": "LCFIS",
  // "nome": "Laboratório de Ciências Físicas"
  // const id = getId(lab);
  const center = lab?.center ?? lab?.centro;
  const alias = lab?.alias ?? lab?.apelido;
  const name = lab?.name ?? lab?.nome;

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

/* CLASSITEM */

function getClassTimeLabel(classTime) {
  const room = classTime?.room ?? classTime?.sala;
  const roomCapacity = room?.capacity ?? room?.capacidade;
  const roomBlock = room?.block ?? room?.bloco;
  const roomCode = room?.code ?? room?.codigo;

  const capacityLabel = checkIndefinition(roomCapacity);
  const codeBlock =
    checkIndefinition(roomBlock) + "-" + checkIndefinition(roomCode);
  // const midRoomLabel = `${capacityLabel}, ${codeBlock}`;
  const midRoomLabel = codeBlock;
  const finalRoomLabel = room ? midRoomLabel : "Indef.";

  const day = classTime?.dia;
  const dayLabel = checkIndefinition(day);

  const startTime = classTime?.horaInicio;
  const startTimeLabel = checkIndefinition(startTime);

  const endTime = startTime + classTime?.duracao;
  const endTimeLabel = checkIndefinition(endTime);

  const timeLabel = `${dayLabel}: ${startTimeLabel}~${endTimeLabel}`;

  let classTimeLabel = "";
  classTimeLabel += finalRoomLabel + ", ";
  classTimeLabel += timeLabel;
  classTimeLabel = `(${classTimeLabel})`;
  return classTimeLabel;
}

function getClassTimeLabelPlus(classItem, index) {
  const classTimes = classItem?.classTimes ?? classItem?.horarios;
  const classTime = classTimes?.[index];
  const nextClassTime = classTimes?.[index + 1];
  const classTimeLabel = getClassTimeLabel(classTime);
  const cleanClassTimeLabel = classTime ? classTimeLabel : "";
  const classTimeLabelEnd = nextClassTime ? "; " : "";
  return cleanClassTimeLabel + classTimeLabelEnd;
}

function getClassItemMainSelectionFormatLabel(classItem, context) {
  const id = getId(classItem);
  const year = classItem?.year ?? classItem?.ano;
  const semester = classItem?.semester ?? classItem?.semestre;
  const subject = classItem?.subject ?? classItem?.disciplina;
  const professor = classItem?.professor;

  const classTime1 = getClassTimeLabelPlus(classItem, 0);
  const classTime2 = getClassTimeLabelPlus(classItem, 1);
  const classTime3 = getClassTimeLabelPlus(classItem, 2);
  const classTime4 = getClassTimeLabelPlus(classItem, 3);
  const classTimesLabel = classTime1 + classTime2 + classTime3 + classTime4;

  const professorName = professor?.name ?? professor?.nome;
  const professorAlias = professor?.alias ?? professor?.apelido;
  const professorLabel = checkIndefinition(professorAlias ?? professorName);

  const subjectName = subject?.name ?? subject?.nome;
  const subjectAlias = subject?.alias ?? subject?.apelido;
  const subjectLabel = checkIndefinition(subjectAlias ?? subjectName);

  const idLabel = `(id: ${id}) `;
  const yearSemester = `${year}.${semester} - `;

  const classTimeHifen = classTimesLabel ? " - " : "";

  let classItemLabel = "";
  // classItemLabel += idLabel;
  classItemLabel += yearSemester;
  classItemLabel += subjectLabel + " - ";
  classItemLabel += professorLabel + classTimeHifen;
  classItemLabel += `${classTimesLabel}`;
  return classItemLabel;
}

/* ROOM */

function getRoomMainSelectionFormatLabel(room, context) {
  // const id = getId(room);
  // const idBlock = room?.idBlock;
  const capacity = room?.capacity ?? room?.capacidade;
  const block = room?.block ?? room?.bloco;
  const code = room?.code ?? room?.codigo;
  const description = room?.description ?? room?.descricao;

  const capacityText = `(${checkIndefinition(capacity)}) `;
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
  const block = room?.block ?? room?.bloco;
  const capacity = room?.capacity ?? room?.capacidade;
  const code = room?.code ?? room?.codigo;
  const description = room?.description ?? room?.descricao;
  // const id = room?.id;
  // const idBlock = room?.idBlock;

  const capacityLabel = `(${checkIndefinition(capacity)}) `;

  let shortLabel = "";

  let longLabel = "";
  longLabel += "-";
  longLabel += checkIndefinition(description);

  let roomLabel = "";
  roomLabel += capacityLabel;
  roomLabel += checkIndefinition(block) + "-";
  roomLabel += checkIndefinition(code);
  roomLabel += menuIsOpen(context) ? longLabel : shortLabel;
  roomLabel = room ? roomLabel : "Sala Indef.";
  return roomLabel;
}

function getBlockFormatLabel(block, context) {
  // const blockId = getId(block);
  const blockCode = block?.code ?? block?.alias;
  const blockAlias = block?.alias;
  const blockName = block?.name;

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

function getLabelStudentSelection(student) {
  const enrollment = student?.enrollment ?? student?.matricula;
  const name = student?.name ?? student?.nome;

  let studentLabel = "";
  studentLabel += enrollment ? enrollment + " - " : "Matrícula Indef. - ";
  studentLabel += name ? name : "Nome Indef.";
  return studentLabel;
}

export {
  /* DEFAULT */
  checkIndefinition,
  defaultLabel,
  /* MISC */
  getStartHourFormatLabel,
  /* CRUD */
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
  getRoomMainSelectionFormatLabel,
  getRoomFormatLabel,
  getBlockFormatLabel,
  /* STUDENT */
  getLabelStudentSelection,
};
