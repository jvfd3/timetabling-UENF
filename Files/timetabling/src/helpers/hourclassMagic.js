/* A ideia é que seja um trocadilho com hourglass */
import options from "../DB/local/options";

function createTurma(myProps) {
  const { ano, semestre, turmas, setTurmas, classIndex, classTimeIndex } =
    myProps;
  let blankTurma = options.emptyObjects.turma;
  let blankHorario = options.emptyObjects.horario;
  let year = ano.value;
  let semester = semestre.value;
  blankHorario.duracao = 2;
  // blankHorario.ordem = 1;
  blankHorario.idTurma = `${ano.value}0${semestre.value}-${classIndex.current}`;
  blankHorario.idHorario = classTimeIndex.current;
  // console.log("createTurma>3", class;Index);
  classIndex.current += 1;

  let newHorarios = [
    {
      ...blankHorario,
      idHorario: classTimeIndex.current + 1,
    },
    {
      ...blankHorario,
    },
  ];

  let newTurma = {
    ...blankTurma,
    idTurma: `${ano.value}0${semestre.value}-${classIndex.current}`,
    ano: year,
    semestre: semester,
    horarios: newHorarios,
  };
  let newTurmas = [newTurma, ...turmas];
  setTurmas(newTurmas);
  classTimeIndex.current += 2;
}

function deleteTurma(turmas, setTurmas, turma) {
  // console.log("Turmas:", turmas);
  // console.log("Turma to delete:", turma);
  let newTurmas = [...turmas];
  let turmaIndex = turmas.indexOf(turma);
  // console.log("Index:", turmaIndex);
  newTurmas.splice(turmaIndex, 1);
  // console.log("New turmas:", newTurmas);
  setTurmas(newTurmas);
}

function createHorario(classesStates) {
  const { classes, setClasses, currentClass, setCurrentClass, classTimeIndex } =
    classesStates;
  classTimeIndex.current += 1;
  // console.log("Classtime", classTimeIndex.current);
  console.log("states", classesStates);
  console.log("Turma", currentClass);
  let blankHorario = options.emptyObjects.horario;
  let newHorario = {
    ...blankHorario,
    idHorario: classTimeIndex.current,
    idTurma: currentClass.idTurma,
    duracao: 2,
  };
  let newTurma = {
    ...currentClass,
    horarios: [newHorario, ...currentClass.horarios],
  };
  setCurrentClass(newTurma);
  if (classes !== undefined && setClasses !== undefined) {
    // setClasses(newTurmas);
    updateClassInClasses(classes, setClasses, newTurma);
  }
}

function updateClassInClasses(classesData, setClassesData, updatedClassData) {
  let currentId = updatedClassData.idTurma;
  let newClassesData = [...classesData];
  newClassesData = classesData.map((iterClass) => {
    let hasSameId = iterClass.idTurma === currentId;
    // console.log("Has same id:", iterClass.idTurma, currentId);
    // if (hasSameId) {
    // console.log("Updated class:", updatedClassData);
    // console.log("Iter class:", iterClass);
    // }
    return hasSameId ? updatedClassData : iterClass;
  });
  setClassesData(newClassesData);
}

function deleteHorario(myProps) {
  const { turma, setTurma, idHorario } = myProps;
  let newTurma = { ...turma };
  let newHorarios = newTurma.horarios.filter((horario) => {
    let hasSameId = horario.idHorario === idHorario;
    return !hasSameId;
  });
  newTurma.horarios = newHorarios;
  setTurma(newTurma);
}

export {
  createTurma,
  deleteTurma,
  createHorario,
  deleteHorario,
  // updateClassInClasses,
};
