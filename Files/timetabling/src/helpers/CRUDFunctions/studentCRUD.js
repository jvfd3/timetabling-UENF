import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";

const itemName = "alunos";

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
  function updateStudentFromList(oldArray, newStudent) {
    const newArray = oldArray.map((oldStudent) => {
      const hasSameId = oldStudent.id === newStudent.id;
      return hasSameId ? newStudent : oldStudent;
    });
    return newArray;
  }

  function updateStudentOnList(newStudent) {
    const updatedStudents = updateStudentFromList(students, newStudent);
    setStudents(updatedStudents);
  }

  defaultDBUpdate(itemName, student)
    .then(updateStudentOnList)
    .catch(defaultHandleError);
}

function deleteStudent({ students, setStudents, student, setStudent }) {
  function deleteStudentFromList(oldArray, deletedStudent) {
    const newArray = oldArray.filter((oldStudent) => {
      const hasSameId = oldStudent.id === deletedStudent.id;
      return !hasSameId;
    });
    return newArray;
  }

  function deleteStudentOnList(deletedStudent) {
    const updatedStudents = deleteStudentFromList(students, deletedStudent);
    setStudents(updatedStudents);
    setStudent({});
  }

  defaultDBDelete(itemName, student)
    .then(deleteStudentOnList)
    .catch(defaultHandleError);
}

export { createStudent, readStudent, updateStudent, deleteStudent };
