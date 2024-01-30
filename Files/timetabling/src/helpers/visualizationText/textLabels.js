function checkIndefinition(value) {
  return value ? value : "Indef.";
}

function getSubjectLabel(subject) {
  const subjectCode = subject?.codigo;
  const subjectAlias = subject?.apelido;
  const subjectCodeText = checkIndefinition(subjectCode);
  const subjectNameText = checkIndefinition(subjectAlias);
  const subjectText = `${subjectCodeText} - ${subjectNameText}`;

  let subjectLabel = "";
  subjectLabel += `${subjectText}`;
  subjectLabel = subject ? subjectLabel : "Indef.";
  return subjectLabel;
}

function getProfessorLabel(professor) {
  const professorAlias = professor?.apelido;
  const professorAliasText = checkIndefinition(professorAlias);
  const professorText = `${professorAliasText}`;

  let professorLabel = "";
  professorLabel += `${professorText}`;
  professorLabel = professor ? professorLabel : "Indef.";
  return professorLabel;
}

function getRoomLabel(room) {
  const block = room?.bloco;
  const capacity = room?.capacidade;
  const code = room?.codigo;
  // const description = room?.descricao;
  // const id = room?.id;
  // const idBlock = room?.idBlock;
  let roomLabel = "";
  roomLabel += `(${checkIndefinition(capacity)}) `;
  roomLabel += `${checkIndefinition(block)}`;
  roomLabel += ` - `;
  roomLabel += `${checkIndefinition(code)}`;
  roomLabel = room ? roomLabel : "Indef.";
  return roomLabel;
}

export { getRoomLabel, getSubjectLabel, getProfessorLabel, checkIndefinition };
