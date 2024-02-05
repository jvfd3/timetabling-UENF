function getIndexVariation(deltaY) {
  const UP = "up";
  const DOWN = "down";
  const diretion = deltaY > 0 ? DOWN : UP;
  const indexVariation = diretion === UP ? -1 : 1;
  return indexVariation;
}

function getNewIndex(currentIndex, itemsList, deltaY) {
  const indexVariation = getIndexVariation(deltaY);
  const fullIndex = currentIndex + indexVariation + itemsList.length;
  const newIndex = fullIndex % itemsList.length;
  return newIndex;
}

function changePageByScrolling(itemStates) {
  const { options, currentItem, handleChange, deltaY } = itemStates;
  const index = options.findIndex((iterPage) => {
    const found = iterPage.url === currentItem.url;
    return found;
  });
  const newIndex = getNewIndex(index, options, deltaY);
  const newOption = options[newIndex];
  handleChange(newOption);
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
