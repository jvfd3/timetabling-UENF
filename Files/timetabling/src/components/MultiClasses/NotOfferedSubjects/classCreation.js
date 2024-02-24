import emptyObjects from "../../../config/emptyObjects";
import { getId } from "../../../helpers/auxCRUD";

function getUsualProfessor(sameSubjectClasses) {
  // Mapeia para obter um array de ids dos professores
  const professors = sameSubjectClasses
    .map((classItem) => classItem.professor)
    .filter(Boolean);

  // Cria um objeto para contar a frequência de cada id de professor
  const frequency = {};

  // Percorre o array de ids dos professores para atualizar a contagem
  professors.forEach((iterProfessor) => {
    if (!frequency[getId(iterProfessor)]) {
      frequency[getId(iterProfessor)] = 1;
    } else {
      frequency[getId(iterProfessor)]++;
    }
  });

  // Encontra o id do professor com a maior frequência
  let maxFrequency = 0;
  let mostFrequentProfessorId = null;
  for (const id in frequency) {
    if (frequency[id] > maxFrequency) {
      maxFrequency = frequency[id];
      mostFrequentProfessorId = parseInt(id);
    }
  }

  // Encontra o professor que tem o mesmo id
  const mostFrequentProfessor = professors.find((iterProfessor) => {
    return getId(iterProfessor) === mostFrequentProfessorId;
  });

  // Retorna o professor com a maior frequência
  return mostFrequentProfessor;
}

function getMeanDemand(sameSubjectClasses) {
  const demands = sameSubjectClasses
    .map((classItem) => classItem?.demandaEstimada)
    .filter((demand) => demand !== null);
  // Sum and divide by length to get the mean
  const size = demands.length;
  const sum = demands.reduce((a, b) => a + b, 0);
  const meanDemand = size > 0 ? Math.round(sum / size) : null;
  return meanDemand;
}

function getDescription(sameSubjectClasses, { year, semester }) {
  // console.log("sameSubjectClasses", sameSubjectClasses);
  const currentSubjectClasses = sameSubjectClasses.filter(
    (classItem) => classItem.ano === year && classItem.semestre === semester
  );
  const size = currentSubjectClasses.length;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const classItemDescription = size > 0 ? alphabet[size - 1] : null;
  return classItemDescription;
}

function getNewClassItem(classes, currentSemester, subject) {
  // console.log("classStates", classStates);

  const sameSubjectClasses = classes.filter(
    (classItem) => classItem?.disciplina?.id === subject?.id
  );

  const professor = getUsualProfessor(sameSubjectClasses);
  const demand = getMeanDemand(sameSubjectClasses);
  const description = getDescription(sameSubjectClasses, currentSemester);

  const newClass = {
    ...emptyObjects.classItem,
    ano: currentSemester.year,
    semestre: currentSemester.semester,
    disciplina: subject,
    professor: professor,
    demandaEstimada: demand,
    // description: description,
  };
  return newClass;
}

export default getNewClassItem;
