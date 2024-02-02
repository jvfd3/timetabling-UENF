function getIndexVariation(event) {
  const UP = "up";
  const DOWN = "down";
  const diretion = event.deltaY > 0 ? DOWN : UP;
  const indexVariation = diretion === UP ? -1 : 1;
  return indexVariation;
}

function getNewIndex(currentIndex, itemsList, event) {
  const indexVariation = getIndexVariation(event);
  const fullIndex = currentIndex + indexVariation + itemsList.length;
  const newIndex = fullIndex % itemsList.length;
  return newIndex;
}

function scrollThroughProfessores(event, professorStates) {
  const { professores, setProfessor, professor } = professorStates;
  const index = professores.findIndex(
    (oneOfProfessores) => oneOfProfessores.nome === professor.nome
  );
  const newOption = professores[getNewIndex(index, professores, event)];
  setProfessor(newOption);
}

function scrollThroughItemList(event, itemStates) {
  const [items, setItem, item] = itemStates;
  const index = items.findIndex((oneOfitems) => oneOfitems.nome === item.nome);
  const newOption = items[getNewIndex(index, items, event)];
  setItem(newOption);
}
function changePageByScrolling(event, itemStates) {
  const [filteredOptions, props, handleChange] = itemStates;
  const index = filteredOptions.findIndex(
    (option) => option.value === props.defaultValue.value
  );
  const newOption = filteredOptions[getNewIndex(index, filteredOptions, event)];
  handleChange(newOption);
}
function scrollThroughDisciplinas(event, itemStates) {
  const [disciplinas, setDisciplina, disciplina] = itemStates;
  const index = disciplinas.findIndex(
    (oneOfDisciplinas) => oneOfDisciplinas.codigo === disciplina.codigo
  );
  const newOption = disciplinas[getNewIndex(index, disciplinas, event)];
  setDisciplina(newOption);
}

function scrollThroughSalas(event, itemStates) {
  const [salasFromJson, setSala, sala] = itemStates;
  const index = salasFromJson.findIndex(
    (oneOfSalas) => oneOfSalas.blocoSala === sala.blocoSala
  );
  const newOption = salasFromJson[getNewIndex(index, salasFromJson, event)];
  setSala(newOption);
}

function scrollThroughTurmas(event, itemStates) {
  const [turmas, setTurma, turma] = itemStates;
  const index = turmas.findIndex((oneOfTurmas) => oneOfTurmas.id === turma.id);
  const newOption = turmas[getNewIndex(index, turmas, event)];
  setTurma(newOption);
}

function scrollThroughAlunos(event, itemsStates) {
  const [dados_agrupados, setAluno, aluno] = itemsStates;
  const index = dados_agrupados.findIndex(
    (oneOfAlunos) => oneOfAlunos.matricula === aluno.matricula
  );
  const newOption = dados_agrupados[getNewIndex(index, dados_agrupados, event)];
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
