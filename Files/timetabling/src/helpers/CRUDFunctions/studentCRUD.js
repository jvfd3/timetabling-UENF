function createStudent(studentStates) {
  console.log("createStudent", studentStates.student.id);
}

function readStudent(studentStates) {
  console.log("readStudent", studentStates.student.id);
}

function updateStudent(studentStates) {
  console.log("updateStudent", studentStates.student.id);
}

function deleteStudent(studentStates) {
  console.log("deleteStudent", studentStates.student.id);
}

export { createStudent, readStudent, updateStudent, deleteStudent };
