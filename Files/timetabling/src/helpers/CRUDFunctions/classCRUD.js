function createClass(classStates) {
  console.log("createClass", classStates.turma.idTurma);
}

function readClass(classStates) {
  console.log("readClass", classStates.turma.idTurma);
}

function updateClass(classStates) {
  console.log("updateClass", classStates.turma.idTurma);
}

function deleteClass(classStates) {
  console.log("deleteClass", classStates.turma.idTurma);
}

export { createClass, readClass, updateClass, deleteClass };
