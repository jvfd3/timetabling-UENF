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
  const { items, setItem, item } = itemStates;
  let diretion = event.deltaY > 0 ? "down" : "up";
  let index = items.findIndex((oneOfitems) => oneOfitems.nome === item.nome);
  index += diretion === "up" ? -1 : 1;
  index = index < 0 ? items.length - 1 : index;
  index = index >= items.length ? 0 : index;
  let newOption = items[index];
  setItem(newOption);
}

export { scrollThroughProfessores, scrollThroughItemList };
