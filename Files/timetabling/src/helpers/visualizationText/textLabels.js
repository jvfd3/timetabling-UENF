import { getId } from "../auxCRUD";
import { menuIsOpen } from "../auxFunctions";

/* DEFAULT */

function checkIndefinition(value) {
  return value ? value : "Indef.";
}

function defaultLabel(item) {
  /* Go through all keys and append them to the current label */
  /* If the item is a list or an object, it becomes recursive and inserts all items.
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

/* MISC */

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

  const blockCodeText = checkIndefinition(blockCode);

  const hasSameInfo = blockAlias === blockCode;
  const blockDescription = hasSameInfo ? blockName : blockAlias;

  const blockDescriptionText =
    `${blockCodeText} - ` + checkIndefinition(blockDescription);

  const blockLabel = menuIsOpen(context) ? blockDescriptionText : blockCodeText;
  return blockLabel;
}

function getBlockLabel(block) {
  const blockId = getId(block);
  const blockCode = block?.code;
  const blockAlias = block?.alias;
  const blockName = block?.name;

  let blockLabel = "";
  blockLabel += " " + checkIndefinition(blockId);
  blockLabel += " " + checkIndefinition(blockCode);
  blockLabel += " " + checkIndefinition(blockAlias);
  blockLabel += " " + checkIndefinition(blockName);
  return blockLabel;
}

function getLabFormatLabel(lab, context) {
  // "id": 2,
  // "centro": "CCT",
  // "apelido": "LCFIS",
  // "nome": "Laboratório de Ciências Físicas"
  const id = getId(lab);
  const centro = lab?.centro;
  const apelido = lab?.apelido;
  const nome = lab?.nome;

  const centerLabel = `(${checkIndefinition(centro)}) `;

  let longLabel = "";
  longLabel += centerLabel;
  longLabel += `${checkIndefinition(apelido)} - ${checkIndefinition(nome)}`;

  let shortLabel = "";
  shortLabel += centerLabel;
  shortLabel += checkIndefinition(apelido);

  const labLabel = menuIsOpen(context) ? longLabel : shortLabel;
  return labLabel;
}

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

function getSubjectLabel(subject) {
  const subjectCode = subject?.codigo;
  const subjectAlias = subject?.apelido;
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

  let shortName = "";
  shortName += shortSubject;

  let fullName = "";
  fullName += fullName += longSubject;

  let subjectLabel = "";
  subjectLabel += preLabel;
  subjectLabel += menuIsOpen(context) ? fullName : shortName;
  return subjectLabel;
}

/* PROFESSOR */

function getProfessorLabel(professor) {
  const professorAlias = professor?.apelido;
  const professorAliasText = checkIndefinition(professorAlias);
  const professorText = `${professorAliasText}`;

  let professorLabel = "";
  professorLabel += `${professorText}`;
  professorLabel = professor ? professorLabel : "Indef.";
  return professorLabel;
}

function getProfessorFormatLabel(professor, context) {
  const name = professor?.nome;
  const alias = professor?.apelido;
  const course = professor?.curso;
  const center = professor?.centro;
  const lab = professor?.laboratorio;

  const labText = checkIndefinition(lab);
  const courseText = checkIndefinition(course);

  let fullName = "";
  fullName += lab || course ? "(" : "";
  fullName += lab ? labText : "";
  fullName += lab && course ? ", " : "";
  fullName += courseText;
  fullName += lab || course ? ") " : "";
  fullName += checkIndefinition(name);

  let shortName = "";
  shortName += lab || course ? `(${checkIndefinition(lab ?? course)}) ` : "";
  shortName += checkIndefinition(alias ?? name);

  let professorLabel = "";
  professorLabel += menuIsOpen(context) ? fullName : shortName;
  professorLabel = professor ? professorLabel : "Prof. Indef.";
  return professorLabel;
}

function courseLabel(course, context) {
  const alias = course?.alias;
  const name = course?.name;

  const aliasText = checkIndefinition(alias);
  const nameText = checkIndefinition(name);

  const message = menuIsOpen(context) ? `${aliasText}` : `${nameText}`;
  return message;
}

/* CLASSITEM */

function getClassTimeLabel(classTime) {
  const room = classTime?.sala;
  const roomCapacity = room?.capacidade;
  const roomBlock = room?.bloco;
  const roomCode = room?.codigo;

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
  const nextClassTime = classItem?.horarios?.[index + 1];
  const classTime = classItem?.horarios?.[index];
  const classTimeLabel = getClassTimeLabel(classTime);
  const cleanClassTimeLabel = classTime ? classTimeLabel : "";
  const classTimeLabelEnd = nextClassTime ? "; " : "";
  return cleanClassTimeLabel + classTimeLabelEnd;
}

function getFormatOptionLabelSelectClassItem(classItem, context) {
  const id = getId(classItem);
  const year = classItem?.ano;
  const semester = classItem?.semestre;
  const subject = classItem?.disciplina;
  const professor = classItem?.professor;

  const classTime1 = getClassTimeLabelPlus(classItem, 0);
  const classTime2 = getClassTimeLabelPlus(classItem, 1);
  const classTime3 = getClassTimeLabelPlus(classItem, 2);
  const classTime4 = getClassTimeLabelPlus(classItem, 3);
  const classTimesLabel = classTime1 + classTime2 + classTime3 + classTime4;

  const professorName = professor?.nome;
  const professorAlias = professor?.apelido;
  const professorLabel = checkIndefinition(professorAlias ?? professorName);

  const subjectName = subject?.nome;
  const subjectAlias = subject?.apelido;
  const subjectLabel = checkIndefinition(subjectAlias ?? subjectName);

  const idLabel = `(id: ${id}) `;
  const yearSemester = `${year}.${semester} - `;

  const classTimeHifen = classTimesLabel ? " - " : "";

  let formattedOptionLabel = "";
  // formattedOptionLabel += idLabel;
  formattedOptionLabel += yearSemester;
  formattedOptionLabel += subjectLabel + " - ";
  formattedOptionLabel += professorLabel + classTimeHifen;
  formattedOptionLabel += `${classTimesLabel}`;
  return formattedOptionLabel;
}

/* ROOM */

function getRoomItemLabel(room, context) {
  let selectedRoom = "";
  let roomOptions = "";

  // const id = getId(room);
  // const idBlock = room?.idBlock;
  const capacity = room?.capacidade;
  const block = room?.bloco;
  const code = room?.codigo;
  const description = room?.descricao;

  const capacityText = `(${checkIndefinition(capacity)}) `;
  const blockText = checkIndefinition(block);
  const codeText = checkIndefinition(code);
  const descriptionText = checkIndefinition(description);

  const cleanDescription = description ? descriptionText + " - " : "";

  // It's the same for now but could be different in the future
  selectedRoom +=
    capacityText + blockText + " - " + cleanDescription + codeText;
  roomOptions += capacityText + blockText + " - " + cleanDescription + codeText;

  const roomLabel = menuIsOpen(context) ? roomOptions : selectedRoom;
  return roomLabel;
}

function getRoomSelectionLabel(room, context) {
  const block = room?.block ?? room?.bloco;
  const capacity = room?.capacity ?? room?.capacidade;
  const code = room?.code ?? room?.codigo;
  const description = room?.description ?? room?.descricao;
  // const id = room?.id;
  // const idBlock = room?.idBlock;

  const capacityLabel = `(${checkIndefinition(capacity)}) `;

  let shortLabel = "";
  shortLabel += checkIndefinition(block) + "-";
  shortLabel += checkIndefinition(code);

  let longLabel = "";
  longLabel += checkIndefinition(block) + "-";
  longLabel += checkIndefinition(code) + "-";
  longLabel += checkIndefinition(description);

  let roomLabel = "";
  roomLabel += capacityLabel;
  roomLabel += menuIsOpen(context) ? longLabel : shortLabel;
  roomLabel = room ? roomLabel : "Sala Indef.";
  return roomLabel;
}

/* STUDENT */

function getLabelStudentSelection(student) {
  const enrollment = student?.matricula;
  const name = student?.nome;

  let studentLabel = "";
  studentLabel += enrollment ? enrollment + " - " : "Matrícula Indef. - ";
  studentLabel += name ? name : "Nome Indef.";
  return studentLabel;
}

export {
  getBlockLabel,
  getBlockFormatLabel,
  getSubjectLabel,
  checkIndefinition,
  getLabelStudentSelection,
  getSubjectFormatLabel,
  getFormatOptionLabelSelectClassItem,
  /* MISC */
  getLabFormatLabel,
  getStartHourFormatLabel,
  /* PROFESSOR */
  getProfessorLabel,
  getProfessorFormatLabel,
  courseLabel,
  /* ROOM */
  getRoomItemLabel,
  getRoomSelectionLabel,
  /* DEFAULT */
  defaultLabel,
};
