let baseStyle = {
  title: "Conflitos Professor",
  style: { backgroundColor: "#84d47d" },
};

function getColorByLevel(conflictLevel) {
  let color = "";
  switch (conflictLevel) {
    case 0:
      color = "#008B45";
      break;
    case 1:
      color = "#D7B740";
      break;
    case 2:
      color = "#D77A61";
      break;
    case 3:
      color = "#8B0000";
      break;
    default:
      color = "#708090";
      break;
  }
  return color;
}

function getProfessorStyledConflict(conflicts) {
  /*  Posso fazer isso de algumas formas:
- Mais simples:
  - Se a lista de conflitos existir: vermelho.
- Mais preciso:
  - Contar a quantidade de conflitos e deixar cada vez mais vermelho conforme a quantidade de conflitos aumenta.
- Mais preciso ainda:
  - Contar a quantidade de conflitos e multiplicar pelo peso de cada conflito.
  */
  let profConflicts = conflicts.professor.alloc;
  // console.log("profConflicts", profConflicts);
  let profConflictsLevel = 0;
  let size = profConflicts.length;
  if (size > 0) {
    profConflictsLevel = 3;
  }
  let color = getColorByLevel(profConflictsLevel);
  let currentStyle = { ...baseStyle };
  currentStyle.title = "Alocação múltipla";
  currentStyle.style = { backgroundColor: color };
  // console.log("currentStyle", currentStyle);
  return currentStyle;
}

function getStyledConflict(conflicts) {
  let myClassConflicts = {};
  myClassConflicts.disciplina = {
    title: "Conflitos Disciplina Período",
    style: { backgroundColor: "#6560f0" },
  };
  myClassConflicts.demanda = {
    title: "Conflitos Demanda",
    style: { backgroundColor: "#d9b57c" },
  };
  myClassConflicts.professor = getProfessorStyledConflict(conflicts);
  return myClassConflicts;
}
export { getStyledConflict };
