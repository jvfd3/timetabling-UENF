import { getId } from "../auxCRUD";

function checkIndefinition(value) {
  return value ? value : "Indef.";
}

function getLabelStudentSelection(student) {
  const enrollment = student?.matricula;
  const name = student?.nome;

  let studentLabel = "";
  studentLabel += enrollment ? enrollment + " - " : "Matrícula Indef. - ";
  studentLabel += name ? name : "Nome Indef.";
  return studentLabel;
}

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

function getProfessorLabel(professor) {
  const professorAlias = professor?.apelido;
  const professorAliasText = checkIndefinition(professorAlias);
  const professorText = `${professorAliasText}`;

  let professorLabel = "";
  professorLabel += `${professorText}`;
  professorLabel = professor ? professorLabel : "Indef.";
  return professorLabel;
}

function getRoomLabel(room) {
  const block = room?.bloco;
  const capacity = room?.capacidade;
  const code = room?.codigo;
  // const description = room?.descricao;
  // const id = room?.id;
  // const idBlock = room?.idBlock;
  let roomLabel = "";
  roomLabel += `(${checkIndefinition(capacity)}) `;
  roomLabel += `${checkIndefinition(block)}`;
  roomLabel += ` - `;
  roomLabel += `${checkIndefinition(code)}`;
  roomLabel = room ? roomLabel : "Indef.";
  return roomLabel;
}

function getMultiClassesSubjectLabel(subject, context) {
  const code = checkIndefinition(subject?.codigo);
  const name = checkIndefinition(subject?.nome);
  const alias = checkIndefinition(subject?.apelido);
  // const isOpened = context === "value";
  const isOpened = false;

  let subjectLabel = "";

  subjectLabel += `${code} - `;
  subjectLabel += isOpened ? `${alias}` : `${name}`;

  return subjectLabel;
}

function getDefaultOptionLabelSubject(subject) {
  const id = getId(subject);
  const code = subject?.codigo;
  const name = subject?.nome;
  const alias = subject?.apelido;
  const expectedSemester = subject?.periodo;

  let subjectLabel = "";
  subjectLabel += checkIndefinition(id) + "-";
  subjectLabel += checkIndefinition(code) + "-";
  subjectLabel += checkIndefinition(name) + "-";
  subjectLabel += checkIndefinition(alias) + "-";
  subjectLabel += checkIndefinition(expectedSemester) + " Período Periodo-";
  return subjectLabel;
}

function getDefaultProfessorValue(professor) {
  let professorValue = "";
  professorValue += checkIndefinition(professor?.id) + "-";
  professorValue += checkIndefinition(professor?.nome) + "-";
  professorValue += checkIndefinition(professor?.apelido) + "-";
  professorValue += checkIndefinition(professor?.laboratorio) + "-";
  professorValue += checkIndefinition(professor?.curso) + "-";
  professorValue += checkIndefinition(professor?.centro) + "-";
  return professorValue;
}

function getDefaultOptionLabelProfessor(professor) {
  const id = getId(professor);
  const name = professor?.nome;
  const alias = professor?.apelido;
  const lab = professor?.laboratorio;
  const course = professor?.curso;

  let professorLabel = "";
  professorLabel += checkIndefinition(id) + "-";
  professorLabel += checkIndefinition(name) + "-";
  professorLabel += checkIndefinition(alias) + "-";
  professorLabel += checkIndefinition(lab) + "-";
  professorLabel += checkIndefinition(course) + "-";
  return professorLabel;
}

function getDefaultFormatOptionLabelProfessor(professor, context) {
  const isOpened = context === "value";

  const name = professor?.nome;
  const alias = professor?.apelido;
  const course = professor?.curso;
  const center = professor?.centro;
  const lab = professor?.laboratorio;

  let fullName = "";
  // fullName += checkIndefinition(center) + " - ";
  fullName += "(" + checkIndefinition(lab) + ", ";
  fullName += checkIndefinition(course) + ") ";
  fullName += checkIndefinition(name);

  let shortName = "";
  shortName += alias ? checkIndefinition(alias) : fullName;

  let formattedOptionLabel = "";
  formattedOptionLabel += isOpened ? shortName : fullName;
  return formattedOptionLabel;
}

function getDefaultOptionLabelRoom(room) {
  let roomLabel = "";
  roomLabel += checkIndefinition(room?.id) + "-";
  roomLabel += checkIndefinition(room?.descricao) + "-";
  roomLabel += checkIndefinition(room?.capacidade) + "-";
  roomLabel += checkIndefinition(room?.bloco) + "-";
  roomLabel += checkIndefinition(room?.codigo) + "-";
  return roomLabel;
}

function getDefaultOptionLabelStudent(student) {
  let studentLabel = "";
  studentLabel += checkIndefinition(student?.id) + "-";
  studentLabel += checkIndefinition(student?.matricula) + "-";
  studentLabel += checkIndefinition(student?.nome) + "-";
  studentLabel += checkIndefinition(student?.anoEntrada) + "-";
  studentLabel += checkIndefinition(student?.curso) + "-";
  return studentLabel;
}

function getDefaultOptionLabelClassItem(classItem) {
  const id = getId(classItem);
  const year = classItem?.ano;
  const semester = classItem?.semestre;
  const expectedDemand = classItem?.demandaEstimada;
  const subject = classItem?.disciplina;
  const professor = classItem?.professor;
  const classTimes = classItem?.horarios;

  // const subjectLabel = JSON.stringify(subject);
  // const professorLabel = JSON.stringify(professor);
  const classTimesLabel = JSON.stringify(classTimes);

  let classItemLabel = "";
  classItemLabel += checkIndefinition(id) + "-";
  classItemLabel += checkIndefinition(year) + "-";
  classItemLabel += checkIndefinition(semester) + "-";
  classItemLabel += checkIndefinition(expectedDemand) + "-";
  classItemLabel += getDefaultOptionLabelSubject(subject) + "-";
  classItemLabel += getDefaultOptionLabelProfessor(professor) + "-";
  classItemLabel += checkIndefinition(classTimesLabel) + "-";
  return classItemLabel;
}

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
  const isOpened = context === "value";

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

export {
  getRoomLabel,
  getSubjectLabel,
  getProfessorLabel,
  checkIndefinition,
  getLabelStudentSelection,
  getMultiClassesSubjectLabel,
  getDefaultOptionLabelRoom,
  getDefaultOptionLabelStudent,
  getDefaultOptionLabelSubject,
  getDefaultOptionLabelClassItem,
  getDefaultOptionLabelProfessor,
  getDefaultProfessorValue,
  getDefaultFormatOptionLabelProfessor,
  getFormatOptionLabelSelectClassItem,
};
