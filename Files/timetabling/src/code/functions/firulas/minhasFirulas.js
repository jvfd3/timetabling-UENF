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

export {
  scrollThroughProfessores,
  scrollThroughItemList,
  changePageByScrolling,
};
