/* A ideia é que seja um trocadilho com hourglass */
import options from "../../../src/DB/local/options";
import {
  getId,
  removeItemInListById,
  replaceNewItemInListById,
} from "../../../src/helpers/auxCRUD";

function createTurma(myProps) {
  const { ano, semestre, turmas, setTurmas, classIndex, classTimeIndex } =
    myProps;
  let blankTurma = options.emptyObjects.classItem;
  let blankHorario = options.emptyObjects.classTime;
  let year = ano.value;
  let semester = semestre.value;
  blankHorario.duracao = 2;
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

function createClassTime(classTimeStates) {
  const {
    classes,
    setClasses,
    classItem,
    setClassItem,
    classTimeIndex,
    classIndex,
  } = classTimeStates;

  const currentClassId = getId(classItem) ?? classIndex.current ?? null;

  classTimeIndex.current += 1;
  console.log("Turma", classItem);
  const blankClassTime = options.emptyObjects.classTime;
  const newClassTime = {
    ...blankClassTime,
    id: classTimeIndex.current,
    idHorario: classTimeIndex.current,
    idTurma: currentClassId,
    duracao: 2,
  };
  const newClassItem = {
    ...classItem,
    horarios: [newClassTime, ...classItem.horarios],
  };
  setClassItem(newClassItem);
  if (classes !== undefined && setClasses !== undefined) {
    const newClasses = replaceNewItemInListById(newClassItem, classes);
    setClasses(newClasses);
  }
}

function DeleteClassTimerio(classTimeRowStates) {
  const { classItem, setClassItem, classTimes, classTime, index } =
    classTimeRowStates;

  const newClassTimes = removeItemInListById(classTime, classTimes);
  const newClassItem = { ...classItem, horarios: newClassTimes };
  setClassItem(newClassItem);
  console.log("Deleted class time:", classTime);
  console.log("New class item:", newClassItem);
}

export {
  createTurma,
  deleteTurma,
  createClassTime,
  DeleteClassTimerio,
  // getUpdatedClasses,
};
