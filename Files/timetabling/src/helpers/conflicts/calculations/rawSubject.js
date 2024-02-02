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
        year: iterClassItem?.ano,
        semester: iterClassItem?.semestre,
        subject: iterClassItem?.disciplina,
      };
      return cleanedIterClassItem;
    }); // Get only the values needed
  // console.log(cleanedClasses);
  return cleanedClassItem;
}

function getSubjectConflictIsSummer(classItem) {
  return Boolean(classItem?.semester === 3);
}

function getSubjectConflictHasSemester(classItem) {
  return Boolean(classItem?.semester);
}

function getSubjectConflictHasSubject(classItem) {
  return Boolean(classItem?.subject);
}

function checkCorrectPeriodParity(expectedSemester, subjectSemester) {
  const expSem = expectedSemester;
  const subSem = subjectSemester;

  const isSummerSemester = subSem === 3;
  const isnotSetted = !expSem || !subSem;
  const hasNoParity = isSummerSemester || isnotSetted;

  const evenSubjectOnEvenSemester = subSem === 1 && expSem % 2 === 1;
  const oddSubjectOnOddSemester = subSem === 2 && expSem % 2 === 0;
  const correctParity = evenSubjectOnEvenSemester || oddSubjectOnOddSemester;

  const returnedParity = hasNoParity ? null : correctParity;
  return returnedParity;
}

function getParityStatus({ subject, semester }) {
  /*
    - null: summer, or something is not set (Has no parity)
    - true: correct parity
    - false: wrong parity
  */
  const parityValue = checkCorrectPeriodParity(subject?.periodo, semester);
  return parityValue;
}

function getSubjectConflictParity(classItem) {
  const parityConflict = {
    type: conflicts.subject.parity,
    from: {
      id: classItem.id,
      subjectId: classItem?.subject?.id,
      semester: classItem?.semester,
      expectedSemester: classItem?.subject?.periodo,
    },
    status: getParityStatus(classItem),
  };

  return parityConflict;
}

function getSubjectConflicts(classItem) {
  const subjectConflicts = {};

  subjectConflicts.hasSubject = getSubjectConflictHasSubject(classItem);
  subjectConflicts.hasSemester = getSubjectConflictHasSemester(classItem);
  subjectConflicts.isSummer = getSubjectConflictIsSummer(classItem);
  subjectConflicts.parity = getSubjectConflictParity(classItem);

  return subjectConflicts;
}

function getRawConflictSubject(classItem) {
  const cleanClassItem = getOnlyNeededValues([classItem]);

  const subjectConflicts = getSubjectConflicts(cleanClassItem?.[0]);

  return subjectConflicts;
}

export { getRawConflictSubject };
