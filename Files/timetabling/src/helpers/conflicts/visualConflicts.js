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
  let size = profConflicts.length;
  let profConflictsLevel = size > 0 ? 3 : 0;

  let currentStyle = { ...baseStyle };

  let color = getColorByLevel(profConflictsLevel);
  currentStyle.style = { backgroundColor: color };
  currentStyle.title = "Sem conflitos de alocação múltipla";

  console.log("profConflicts", profConflicts);

  /*
- Se hover conflitos:
  - Para cada conflito:
    - adicionar à mensagem de conflito o dia e hora do conflito que está em conflito.time.day e conflito.time.hour
      - Exemplo: mensagem = `${conflito.time.day} às ${conflito.time.hour} `
    - adicionar à mensagem de conflito o nome do conflito que está em conflito.type.name
      - Exemplo: mensagem `há o conflito "${conflito.type.name}"`
    - adicionar à mensagem de conflito o códigos de turma e horario que estão em conflito.
      - Os horários de mesma turma devem estar agrupados.
        Ex.: "com as turmas: ${JSON.stringify(conflito.to)}."
  - definir o currentStyle.title como mensagem
*/

  let mensagem = "";
  profConflicts.forEach((conflito) => {
    mensagem += `"${conflito.type.name}", `;
    mensagem += `${conflito.time.day} às ${conflito.time.hour}h, com as turmas:\n`;
    conflito.to.forEach((turmaConflituosa) => {
      mensagem += `--- Turma: ${turmaConflituosa.idTurma}, horário: ${turmaConflituosa.idHorario}\n`;
    });
  });
  currentStyle.title = mensagem;

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
