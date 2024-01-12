import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";

function createStudent({ students, setStudents, student, setStudent }) {
  function insertNewStudentFromDB(newId) {
    const newStudent = { ...student, id: newId };
    setStudent(newStudent);
    setStudents([...students, newStudent]);
  }

  defaultDBCreate("alunos", student)
    .then(insertNewStudentFromDB)
    .catch(defaultHandleError);
}

function readStudent({ setStudents, setStudent }) {
  function insertNewStudentsFromDB(studentsFromDB) {
    const lastStudent = studentsFromDB[studentsFromDB.length - 1];
    setStudent(lastStudent);
    setStudents(studentsFromDB);
  }

  defaultDBRead("alunos")
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

  defaultDBUpdate("alunos", student)
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

  defaultDBDelete("alunos", student)
    .then(deleteStudentOnList)
    .catch(defaultHandleError);
}

export { createStudent, readStudent, updateStudent, deleteStudent };
