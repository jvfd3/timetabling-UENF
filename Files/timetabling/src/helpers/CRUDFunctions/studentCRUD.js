import emptyObjects from "../../config/emptyObjects";
import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/defaultAxiosFunctions";
import {
  getId,
  refreshShownItem,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "student";

function createStudent({ students, setStudents, student, setStudent }) {
  const emptyStudent = emptyObjects.student;

  function getNewStudent(newId) {
    // const emptyStudent = emptyObjects.student;
    const newStudent = { ...emptyStudent, id: newId };
    return newStudent;
  }

  function insertNewStudentFromDB(newId) {
    const newStudent = getNewStudent(newId);
    const newStudents = [...students, newStudent];
    setStudent(newStudent);
    setStudents(newStudents);
  }

  defaultDBCreate(itemName, emptyStudent)
    .then(insertNewStudentFromDB)
    .catch(defaultHandleError);
}

function readStudent({ students, setStudents, setStudent, student }) {
  function insertNewStudentsFromDB(studentsFromDB) {
    setStudents(studentsFromDB);

    const showedStudent = refreshShownItem(student, students, studentsFromDB);
    setStudent(showedStudent);
  }

  defaultDBRead(itemName)
    .then(insertNewStudentsFromDB)
    .catch(defaultHandleError);
}

function updateStudent({ students, setStudents, student }) {
  function updateStudentOnList(newStudent) {
    const updatedStudents = replaceNewItemInListById(newStudent, students);
    // setStudent(newStudent);
    setStudents(updatedStudents);
  }

  defaultDBUpdate(itemName, student)
    .then(updateStudentOnList)
    .catch(defaultHandleError);
}

function deleteStudent({ students, setStudents, student, setStudent }) {
  function deleteStudentOnList(deletedStudent) {
    if (deletedStudent) {
      const updatedStudents = removeItemInListById(deletedStudent, students);
      setStudents(updatedStudents);

      const showedStudent = refreshShownItem(
        student,
        students,
        updatedStudents
      );
      setStudent(showedStudent);
    }
  }

  defaultDBDelete(itemName, student)
    .then(deleteStudentOnList)
    .catch(defaultHandleError);
}

export { createStudent, readStudent, updateStudent, deleteStudent };
