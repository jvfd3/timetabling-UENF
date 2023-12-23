function getIndexVariation(event) {
  const UP = "up";
  const DOWN = "down";
  let diretion = event.deltaY > 0 ? DOWN : UP;
  let indexVariation = diretion === UP ? -1 : 1;
  return indexVariation;
}

function getNewIndex(currentIndex, itemsList, event) {
  let indexVariation = getIndexVariation(event);
  let fullIndex = currentIndex + indexVariation + itemsList.length;
  let newIndex = fullIndex % itemsList.length;
  return newIndex;
}

function scrollThroughProfessores(event, professorStates) {
  const { professores, setProfessor, professor } = professorStates;
  let index = professores.findIndex(
    (oneOfProfessores) => oneOfProfessores.nome === professor.nome
  );
  let newOption = professores[getNewIndex(index, professores, event)];
  setProfessor(newOption);
}

function scrollThroughItemList(event, itemStates) {
  const [items, setItem, item] = itemStates;
  let index = items.findIndex((oneOfitems) => oneOfitems.nome === item.nome);
  let newOption = items[getNewIndex(index, items, event)];
  setItem(newOption);
}
function changePageByScrolling(event, itemStates) {
  const [filteredOptions, props, handleChange] = itemStates;
  let index = filteredOptions.findIndex(
    (option) => option.value === props.defaultValue.value
  );
  let newOption = filteredOptions[getNewIndex(index, filteredOptions, event)];
  handleChange(newOption);
}
function scrollThroughDisciplinas(event, itemStates) {
  const [disciplinas, setDisciplina, disciplina] = itemStates;
  let index = disciplinas.findIndex(
    (oneOfDisciplinas) => oneOfDisciplinas.codigo === disciplina.codigo
  );
  let newOption = disciplinas[getNewIndex(index, disciplinas, event)];
  setDisciplina(newOption);
}

function scrollThroughSalas(event, itemStates) {
  const [salasFromJson, setSala, sala] = itemStates;
  let index = salasFromJson.findIndex(
    (oneOfSalas) => oneOfSalas.blocoSala === sala.blocoSala
  );
  let newOption = salasFromJson[getNewIndex(index, salasFromJson, event)];
  setSala(newOption);
}

function scrollThroughTurmas(event, itemStates) {
  const [turmas, setTurma, turma] = itemStates;
  let index = turmas.findIndex((oneOfTurmas) => oneOfTurmas.id === turma.id);
  let newOption = turmas[getNewIndex(index, turmas, event)];
  setTurma(newOption);
}

function scrollThroughAlunos(event, itemsStates) {
  const [dados_agrupados, setAluno, aluno] = itemsStates;
  let index = dados_agrupados.findIndex(
    (oneOfAlunos) => oneOfAlunos.matricula === aluno.matricula
  );
  let newOption = dados_agrupados[getNewIndex(index, dados_agrupados, event)];
  setAluno(newOption);
}

export {
  scrollThroughDisciplinas,
  scrollThroughProfessores,
  scrollThroughTurmas,
  scrollThroughAlunos,
  scrollThroughSalas,
  scrollThroughItemList,
  changePageByScrolling,
};
