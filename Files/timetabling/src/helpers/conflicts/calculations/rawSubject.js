import conflicts from "../../../config/conflicts";
import { getId } from "../../auxCRUD";

function getOnlyNeededValues(classItem) {
  // console.log(classItem);
  const cleanedClassItem = classItem
    // .filter(
    //   (classItem) =>
    //     classItem.dia &&
    //     classItem.duracao &&
    //     classItem.horaInicio &&
    //     classItem.id
    //   // && classItem.sala
    // ) // Get only classes with all values filled
    .map((iterClassItem) => {
      // console.log(iterClassItem);
      // const { id,  ano, semestre, disciplina } = iterClassItem;
      // Also clean subjects?
      const cleanedIterClassItem = {
        id: getId(iterClassItem),
        year: iterClassItem?.year ?? iterClassItem?.ano,
        semester: iterClassItem?.semester ?? iterClassItem?.semestre,
        subject: iterClassItem?.subject ?? iterClassItem?.disciplina,
      };
      return cleanedIterClassItem;
    }); // Get only the values needed
  // console.log(cleanedClasses);
  return cleanedClassItem;
}

function getMinimalSubjectInfo(classItem) {
  const minimalSubjectInfo = {
    id: getId(classItem),
    subjectId: getId(classItem?.subject),
    semester: classItem?.semester,
    expectedSemester: classItem?.subject?.periodo,
  };

  return minimalSubjectInfo;
}

function getSubjectConflictIsSummer(classItem) {
  return Boolean(classItem?.semester === 3);
}

function getSubjectConflictHasSemester(classItem) {
  return Boolean(classItem?.semester);
}

function getSubjectConflictHasExpectedSemester(classItem) {
  return Boolean(classItem?.subject?.periodo);
}

function getSubjectConflictHasSubject(classItem) {
  return Boolean(classItem?.subject);
}

function getCorrectParity({ subject, semester }) {
  const isSummer = semester === 3;

  const subSem = subject?.periodo;
  const selSem = semester;

  const evenSubjectOnEvenSemester =
    selSem === 1 && subSem <= 10 && subSem % 2 === 1;

  const oddSubjectOnOddSemester =
    selSem === 2 && subSem <= 10 && subSem % 2 === 0;

  const correctParity = evenSubjectOnEvenSemester || oddSubjectOnOddSemester;

  const confirmRightParity =
    correctParity && !isSummer && subSem <= 10 && subSem && Boolean(selSem);

  return confirmRightParity;
}

function getGeneralSubjectStatus(classItem) {
  const hasSemester = getSubjectConflictHasSemester(classItem);
  const hasSubject = getSubjectConflictHasSubject(classItem);
  const hasExpectedSemester = getSubjectConflictHasExpectedSemester(classItem);
  const isSummer = getSubjectConflictIsSummer(classItem);
  const isOnRightParity = getCorrectParity(classItem);

  const expSem = classItem?.subject?.periodo;

  const status = {};

  status.hasSemester = hasSemester;
  status.hasSubject = hasSubject;
  status.hasExpectedSemester = hasExpectedSemester;
  status.isSummer = isSummer;
  status.isOnRightParity = isOnRightParity;
  status.hasParity =
    hasSemester && hasSubject && hasExpectedSemester && !isSummer;
  status.isCS = expSem ? 0 <= expSem && expSem <= 12 : false;
  status.isCSMandatory = status.isCS && expSem <= 10;
  status.isOptionalCS = expSem === 11;
  status.isOptionalFree = expSem === 12;
  status.isNotCS = expSem === 13;

  return status;
}

function getSubjectConflicts(classItem) {
  const subjectConflicts = {};

  subjectConflicts.minimalSubjectInfo = getMinimalSubjectInfo(classItem);
  subjectConflicts.generalStatus = getGeneralSubjectStatus(classItem);

  return subjectConflicts;
}

function getRawConflictSubject(classItem) {
  const cleanClassItem = getOnlyNeededValues([classItem]);

  const subjectConflicts = getSubjectConflicts(cleanClassItem?.[0]);

  // console.log(subjectConflicts);

  return subjectConflicts;
}

export { getRawConflictSubject };
