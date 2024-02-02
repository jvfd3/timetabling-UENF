import options from "../../DB/local/options";
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
  getItemIndexInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "student";

function createStudent({ students, setStudents, student, setStudent }) {
  function getNewStudent(newId) {
    const emptyStudent = options.emptyObjects.student;
    const newStudent = { ...emptyStudent, id: newId };
    return newStudent;
  }

  function insertNewStudentFromDB(newId) {
    const newStudent = getNewStudent(newId);
    const newStudents = [...students, newStudent];
    setStudent(newStudent);
    setStudents(newStudents);
  }

  defaultDBCreate(itemName, student)
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
      console.log(
        "D, N, S",
        deletedStudent.id,
        newStudent.id,
        showedStudent.id
      );
      setStudent(newStudent);
      setStudents(updatedStudents);
    }
  }

  defaultDBDelete(itemName, student)
    .then(deleteStudentOnList)
    .catch(defaultHandleError);
}

export { createStudent, readStudent, updateStudent, deleteStudent };
