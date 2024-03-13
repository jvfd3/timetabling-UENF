function getStartTime(classTime) {
  const startTime =
    classTime?.startTime ??
    classTime?.startHour ??
    classTime?.hour ??
    classTime?.horaInicio ??
    classTime?.hora;
  return startTime;
}

function getDescription(classItem) {
  const description = classItem?.description ?? classItem?.descricao;
  return description;
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

function getLab(subject) {
  const lab = subject?.lab ?? subject?.laboratory ?? subject?.laboratorio;
  return lab;
}

const getProfessor = (classItem) => classItem?.professor;
const getDuration = (classTime) => classTime?.duration ?? classTime?.duracao;
const getCapacity = (room) => room?.capacity ?? room?.capacidade;
const getSemester = (classItem) => classItem?.semester ?? classItem?.semestre;
const getModality = (course) => course?.modality ?? course?.modalidade;
const getCategory = (course) => course?.category ?? course?.categoria;
const getSubject = (classItem) => classItem?.subject ?? classItem?.disciplina;
const getSection = (hour) => hour?.section ?? hour?.turno;
const getCenter = (subject) => subject?.center ?? subject?.centro;
const getCourse = (professor) => professor?.course ?? professor?.curso;
const getAlias = (object) => object?.alias ?? object?.apelido;
const getBlock = (room) => room?.block ?? room?.bloco;
const getLevel = (course) => course?.level ?? course?.nivel;
const getYear = (classItem) => classItem?.year ?? classItem?.ano;
const getRoom = (classTime) => classTime?.room ?? classTime?.sala;
const getCode = (object) => object?.code ?? object?.codigo;
const getName = (object) => object?.name ?? object?.nome;
const getDay = (classTime) => classTime?.day ?? classTime?.dia;

/* STUDENT */
const getEnrollment = (student) => student?.enrollment ?? student?.matricula;
const getEntryYear = (student) => student?.entryYear ?? student?.anoEntrada;

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
