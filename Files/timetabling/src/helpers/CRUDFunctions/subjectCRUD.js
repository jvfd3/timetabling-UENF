function createSubject(subjectStates) {
  console.log("createSubject", subjectStates.subject.id);
}

function readSubject(subjectStates) {
  console.log("readSubject", subjectStates.subject.id);
}

function updateSubject(subjectStates) {
  console.log("updateSubject", subjectStates.subject.id);
}

function deleteSubject(subjectStates) {
  console.log("deleteSubject", subjectStates.subject.id);
}

export { createSubject, readSubject, updateSubject, deleteSubject };
