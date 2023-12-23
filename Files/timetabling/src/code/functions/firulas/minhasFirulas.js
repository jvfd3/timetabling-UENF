function scrollThroughProfessores(event, professorStates) {
  const { professores, setProfessor, professor } = professorStates;

  let diretion = event.deltaY > 0 ? "down" : "up";
  let index = professores.findIndex(
    (oneOfProfessores) => oneOfProfessores.nome === professor.nome
  );
  index += diretion === "up" ? -1 : 1;
  index = index < 0 ? professores.length - 1 : index;
  index = index >= professores.length ? 0 : index;
  let newOption = professores[index];
  setProfessor(newOption);
}

function scrollThroughItemList(event, itemStates) {
  const [items, setItem, item] = itemStates;
  const UP = "up";
  const DOWN = "down";
  let diretion = event.deltaY > 0 ? DOWN : UP;
  let index = items.findIndex((oneOfitems) => oneOfitems.nome === item.nome);
  index += diretion === UP ? -1 : 1;
  index = index < 0 ? items.length - 1 : index;
  index = index >= items.length ? 0 : index;
  let newOption = items[index];
  setItem(newOption);
}
function changePageByScrolling(event, itemStates) {
  const [filteredOptions, props, handleChange] = itemStates;
  const UP = "up";
  const DOWN = "down";
  let diretion = event.deltaY > 0 ? DOWN : UP;
  let index = filteredOptions.findIndex(
    (option) => option.value === props.defaultValue.value
  );
  index += diretion === UP ? -1 : 1;
  index = (index + filteredOptions.length) % filteredOptions.length;
  let newOption = filteredOptions[index];
  handleChange(newOption);
}
function scrollThroughDisciplinas(event, itemStates) {
  let diretion = event.deltaY > 0 ? "down" : "up";
  const [disciplinas, setDisciplina, disciplina] = itemStates;
  let index = disciplinas.findIndex(
    (oneOfDisciplinas) => oneOfDisciplinas.codigo === disciplina.codigo
  );
  index += diretion === "up" ? -1 : 1;
  index = index < 0 ? disciplinas.length - 1 : index;
  index = index >= disciplinas.length ? 0 : index;
  let newOption = disciplinas[index];
  setDisciplina(newOption);
}

function scrollThroughSalas(event, itemStates) {
  const [salasFromJson, setSala, sala] = itemStates;
  let diretion = event.deltaY > 0 ? "down" : "up";
  let index = salasFromJson.findIndex(
    (oneOfSalas) => oneOfSalas.blocoSala === sala.blocoSala
  );
  index += diretion === "up" ? -1 : 1;
  index = index < 0 ? salasFromJson.length - 1 : index;
  index = index >= salasFromJson.length ? 0 : index;
  let newOption = salasFromJson[index];
  setSala(newOption);
}

function scrollThroughTurmas(event, itemStates) {
  const [turmas, setTurma, turma] = itemStates;
  let diretion = event.deltaY > 0 ? "down" : "up";
  let index = turmas.findIndex((oneOfTurmas) => oneOfTurmas.id === turma.id);
  index += diretion === "up" ? -1 : 1;
  index = index < 0 ? turmas.length - 1 : index;
  index = index >= turmas.length ? 0 : index;
  let newOption = turmas[index];
  setTurma(newOption);
}

function scrollThroughAlunos(event, itemsStates) {
  const [dados_agrupados, setAluno, aluno] = itemsStates;
  let diretion = event.deltaY > 0 ? "down" : "up";
  let index = dados_agrupados.findIndex(
    (oneOfAlunos) => oneOfAlunos.matricula === aluno.matricula
  );
  index += diretion === "up" ? -1 : 1;
  index = index < 0 ? dados_agrupados.length - 1 : index;
  index = index >= dados_agrupados.length ? 0 : index;
  let newOption = dados_agrupados[index];
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
