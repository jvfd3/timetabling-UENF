import emptyObjects from "../../config/emptyObjects";
import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/defaultAxiosFunctions";
import {
  refreshShownItem,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

import configInfo from "../../config/configInfo";

const itemName = configInfo.endpoints.student;

function createStudent({ setStudents, setStudent }) {
  const emptyStudent = emptyObjects.student;

  function getNewStudent(newId) {
    // const emptyStudent = emptyObjects.student;
    const newStudent = { ...emptyStudent, id: newId };
    return newStudent;
  }

  function insertNewStudentFromDB(newId) {
    const newStudent = getNewStudent(newId);
    setStudent(newStudent);
    setStudents((oldStudents) => [...oldStudents, newStudent]);
  }

  defaultDBCreate(itemName, emptyStudent)
    .then(insertNewStudentFromDB)
    .catch(defaultHandleError);
}

function readStudent({ students, setStudents, setStudent }) {
  function insertNewStudentsFromDB(studentsFromDB) {
    setStudents(studentsFromDB);

    setStudent((oldStudent) => {
      const showedStudent = refreshShownItem(
        oldStudent,
        students,
        studentsFromDB
      );
      return showedStudent;
    });
  }
  console.log("Pré defaultDBRead");
  defaultDBRead(itemName)
    .then(insertNewStudentsFromDB)
    .catch(defaultHandleError);
}

function updateStudent({ setStudents, student }) {
  function updateStudentOnList(newStudent) {
    // setStudent(newStudent);
    setStudents((oldStudents) => {
      const updatedStudents = replaceNewItemInListById(newStudent, oldStudents);
      return updatedStudents;
    });
  }

  defaultDBUpdate(itemName, student)
    .then(updateStudentOnList)
    .catch(defaultHandleError);
}

function deleteStudent({ setStudents, student, setStudent }) {
  function deleteStudentOnList(deletedStudent) {
    if (deletedStudent) {
      setStudents((oldStudents) => {
        const updatedStudents = removeItemInListById(
          deletedStudent,
          oldStudents
        );
        const showedStudent = refreshShownItem(
          student,
          oldStudents,
          updatedStudents
        );
        setStudent(showedStudent);
        return updatedStudents;
      });
    }
  }

  defaultDBDelete(itemName, student)
    .then(deleteStudentOnList)
    .catch(defaultHandleError);
}

export { createStudent, readStudent, updateStudent, deleteStudent };
