import emptyObjects from "../../config/emptyObjects";
import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import {
  keepOldItem,
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

function readStudent({ setStudents, setStudent, student }) {
  function insertNewStudentsFromDB(studentsFromDB) {
    const showedStudent = keepOldItem(student, studentsFromDB);
    setStudent(showedStudent);
    setStudents(studentsFromDB);
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
      const showedStudent = keepOldItem(student, students);
      setStudent(showedStudent);
      setStudents(updatedStudents);
    }
  }

  defaultDBDelete(itemName, student)
    .then(deleteStudentOnList)
    .catch(defaultHandleError);
}

export { createStudent, readStudent, updateStudent, deleteStudent };
