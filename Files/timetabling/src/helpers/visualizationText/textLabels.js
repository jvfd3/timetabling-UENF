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
  let subjectLabel = "";
  subjectLabel += checkIndefinition(subject?.id) + "-";
  subjectLabel += checkIndefinition(subject?.codigo) + "-";
  subjectLabel += checkIndefinition(subject?.nome) + "-";
  subjectLabel += checkIndefinition(subject?.apelido) + "-";
  subjectLabel += checkIndefinition(subject?.periodo) + " Período Periodo-";
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
  let professorLabel = "";
  professorLabel += checkIndefinition(professor?.id) + "-";
  professorLabel += checkIndefinition(professor?.nome) + "-";
  professorLabel += checkIndefinition(professor?.apelido) + "-";
  professorLabel += checkIndefinition(professor?.laboratorio) + "-";
  professorLabel += checkIndefinition(professor?.curso) + "-";
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
  let classItemLabel = "";
  classItemLabel += checkIndefinition(classItem?.id) + "-";
  classItemLabel += checkIndefinition(classItem?.idTurma) + "-";
  classItemLabel += checkIndefinition(classItem?.ano) + "-";
  classItemLabel += checkIndefinition(classItem?.semestre) + "-";
  classItemLabel += checkIndefinition(classItem?.demandaEstimada) + "-";
  classItemLabel += getDefaultOptionLabelProfessor(classItem?.professor) + "-";
  classItemLabel += getDefaultOptionLabelSubject(classItem?.disciplina) + "-";
  return classItemLabel;
}

function getFormatOptionLabelSelectClassItem(classItem, context) {
  const id = getId(classItem);
  const year = classItem?.ano;
  const semester = classItem?.semestre;
  const subject = classItem?.disciplina;
  const professor = classItem?.professor;

  const isOpened = context === "value";

  const professorName = professor?.nome;
  const professorAlias = professor?.apelido;
  const professorLabel = checkIndefinition(professorAlias ?? professorName);

  const subjectName = subject?.nome;
  const subjectAlias = subject?.apelido;
  const subjectLabel = checkIndefinition(subjectAlias ?? subjectName);

  let formattedOptionLabel = "";
  formattedOptionLabel += `(id: ${id}) `;
  formattedOptionLabel += `${year}.${semester} - `;
  formattedOptionLabel += `${professorLabel} - `;
  formattedOptionLabel += `${subjectLabel}`;
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
