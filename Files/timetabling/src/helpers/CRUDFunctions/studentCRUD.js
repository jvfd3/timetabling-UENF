import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import {
  getItemIndexInListById,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "student";

function createStudent({ students, setStudents, student, setStudent }) {
  function insertNewStudentFromDB(newId) {
    const newStudent = { ...student, id: newId };
    setStudent(newStudent);
    setStudents([...students, newStudent]);
  }

  defaultDBCreate(itemName, student)
    .then(insertNewStudentFromDB)
    .catch(defaultHandleError);
}

function readStudent({ setStudents, setStudent }) {
  function insertNewStudentsFromDB(studentsFromDB) {
    const lastStudent = studentsFromDB[studentsFromDB.length - 1];
    setStudent(lastStudent);
    setStudents(studentsFromDB);
  }

  defaultDBRead(itemName)
    .then(insertNewStudentsFromDB)
    .catch(defaultHandleError);
}

function updateStudent({ students, setStudents, student }) {
  function updateStudentOnList(newStudent) {
    const updatedStudents = replaceNewItemInListById(newStudent, students);
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

      const index = getItemIndexInListById(deletedStudent, students);
      let newStudent = null;
      if (index > 0) {
        newStudent = students[index - 1];
      } else if (updatedStudents.length > 0) {
        newStudent = students[0];
      } else {
        console.error(
          "Uai, não tem mais professores! Como diria o Silvio Santos: 'Está certo disto?'"
        );
      }
      setStudent(newStudent);
      setStudents(updatedStudents);
    }
  }

  defaultDBDelete(itemName, student)
    .then(deleteStudentOnList)
    .catch(defaultHandleError);
}

export { createStudent, readStudent, updateStudent, deleteStudent };
