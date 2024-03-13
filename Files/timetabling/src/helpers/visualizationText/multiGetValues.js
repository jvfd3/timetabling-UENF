function getDay(classTime) {
  const day = classTime?.day ?? classTime?.dia;
  return day;
}

function getStartTime(classTime) {
  const startTime =
    classTime?.startTime ??
    classTime?.startHour ??
    classTime?.hour ??
    classTime?.horaInicio ??
    classTime?.hora;
  return startTime;
}

function getDuration(classTime) {
  const duration = classTime?.duration ?? classTime?.duracao;
  return duration;
}

function getRoom(classTime) {
  const room = classTime?.room ?? classTime?.sala;
  return room;
}

function getCapacity(room) {
  const capacity = room?.capacity ?? room?.capacidade;
  return capacity;
}

function getBlock(room) {
  const block = room?.block ?? room?.bloco;
  return block;
}

function getYear(classItem) {
  const year = classItem?.year ?? classItem?.ano;
  return year;
}

function getSemester(classItem) {
  const semester = classItem?.semester ?? classItem?.semestre;
  return semester;
}

function getProfessor(classItem) {
  const professor = classItem?.professor;
  return professor;
}

function getSubject(classItem) {
  const subject = classItem?.subject ?? classItem?.disciplina;
  return subject;
}

function getDescription(classItem) {
  const description = classItem?.description ?? classItem?.descricao;
  return description;
}

function getCode(object) {
  const code = object?.code ?? object?.codigo;
  return code;
}

function getName(object) {
  const name = object?.name ?? object?.nome;
  return name;
}

function getAlias(object) {
  const alias = object?.alias ?? object?.apelido;
  return alias;
}

function getExpectedDemand(classItem) {
  const expectedDemand =
    classItem?.expectedDemand ?? classItem?.demandaEsperada;
  return expectedDemand;
}

function getExpectedSemester(subject) {
  const expectedSemester =
    subject?.expectedSemester ??
    subject?.semestreEsperado ??
    subject?.semestre ??
    subject?.periodo;
  return expectedSemester;
}

function getClassTimes(classItem) {
  const classTimes = classItem?.classTimes ?? classItem?.horarios;
  return classTimes;
}

function getCenter(subject) {
  const center = subject?.center ?? subject?.centro;
  return center;
}

function getLab(subject) {
  const lab = subject?.lab ?? subject?.laboratory ?? subject?.laboratorio;
  return lab;
}

function getCourse(professor) {
  const course = professor?.course ?? professor?.curso;
  return course;
}

function getLevel(course) {
  const level = course?.level ?? course?.nivel;
  return level;
}
function getModality(course) {
  const modality = course?.modality ?? course?.modalidade;
  return modality;
}
function getCategory(course) {
  const category = course?.category ?? course?.categoria;
  return category;
}

function getSection(hour) {
  const section = hour?.section ?? hour?.turno;
  return section;
}

/* STUDENT */

function getEntryYear(student) {
  const entryYear = student?.entryYear ?? student?.anoEntrada;
  return entryYear;
}

function getEnrollment(student) {
  const enrollment = student?.enrollment ?? student?.matricula;
  return enrollment;
}

export {
  /* MULTIPLE */
  getAlias,
  getCode,
  getName,
  /* CLASSITEM */
  getExpectedDemand,
  getDescription,
  getClassTimes,
  getProfessor,
  getSemester,
  getSubject,
  getYear,
  /* CLASSITEM > PROFESSOR */
  getCourse,
  /* CLASSITEM > PROFESSOR > COURSE */
  getLevel,
  getModality,
  getCategory,
  /* CLASSITEM > SUBJECT */
  getExpectedSemester,
  getCenter,
  getLab,
  /* CLASSTIME */
  getStartTime,
  getDuration,
  getRoom,
  getDay,
  /* CLASSTIME > ROOM */
  getCapacity,
  getBlock,
  /* CLASSTIME > HOUR */
  getSection,
  /* STUDENT */
  getEntryYear,
  getEnrollment,
};
