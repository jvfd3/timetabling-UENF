// import options from "../code/temp/options";
// import { readData } from "../code/functions/CRUD_JSONBIN";
import axios from "axios";
import { toast } from "react-toastify";

let baseUrl = "http://localhost:8800/";

async function createInDB(endPoint, myData) {
  // let toastMessage = `Dados criados com sucesso: ${endPoint}`;
  await axios
    .post(baseUrl + endPoint, myData)
    .then(({ data }) => toast.success(data))
    .catch(({ data }) => toast.error(data));
}

async function createDisciplina(disciplinas, setDisciplinas, disciplina) {
  setDisciplinas([...disciplinas, disciplina]);
  let endPoint = "disciplina";
  createInDB(endPoint, disciplina);
}

async function createProfessor(professor) {
  let endPoint = "professor";
  console.log("adding to DB", professor);
  createInDB(endPoint, professor);
}

async function createTurma(turma) {
  let endPoint = "turma";
  createInDB(endPoint, turma);
}

async function createSala(sala) {
  let endPoint = "sala";
  createInDB(endPoint, sala);
}

async function readDataFromURL(endPoint) {
  try {
    const res = await axios.get(baseUrl + endPoint);
    toast.success(`Dados lidos com sucesso: ${endPoint}`);
    return res.data;
  } catch (error) {
    toast.error(error);
  }
}

async function readDisciplinas() {
  let endPoint = "disciplinas";
  return readDataFromURL(endPoint);
}

async function readProfessores() {
  let endPoint = "professores";
  return readDataFromURL(endPoint);
}

async function readTurmas() {
  let endPoint = "turmas";
  return readDataFromURL(endPoint);
}

async function readSalas() {
  let endPoint = "salas";
  return readDataFromURL(endPoint);
}

async function updateInDB(endPoint, newData) {
  /* Vou atualizar as informações locais independente de dar erro. Isso pode causar conflito no futuro */
  let url = baseUrl + endPoint + newData.id;
  console.log("url", url);
  console.log("newData", newData);
  await axios
    .put(baseUrl + endPoint + newData.id, newData)
    .then(({ data }) => toast.success(data))
    .catch(({ data }) => toast.error(data));
}

async function updateDisciplina(
  disciplinas,
  setDisciplinas,
  updatedDisciplina
) {
  let endPoint = "disciplina/";
  let newDisciplinas = disciplinas.map((disciplina) =>
    disciplina.iddisciplina === updatedDisciplina.iddisciplina
      ? updatedDisciplina
      : disciplina
  );
  setDisciplinas(newDisciplinas);
  updatedDisciplina.id = updatedDisciplina.iddisciplina;
  updateInDB(endPoint, updatedDisciplina);
}

async function updateProfessor(updatedProfessor) {
  let endPoint = "professor/";
  updatedProfessor.id = updatedProfessor.idprofessor;
  updateInDB(endPoint, updatedProfessor);
}

async function updateTurma(turma) {
  let endPoint = "turma/";
  updateInDB(endPoint, turma);
}

async function updateSala(sala) {
  let endPoint = "sala/";
  updateInDB(endPoint, sala);
}

async function defaultDelete(endPoint, id, filterFunction) {
  await axios
    .delete(baseUrl + endPoint + id)
    .then(filterFunction)
    .then(({ data }) => toast.success(data))
    .then(() => console.log("deleted?"))
    .then(({ data }) => console.log("deleted?", { data }))
    .catch(({ data }) => toast.error(data));
}

async function deleteDisciplina(disciplinas, setDisciplinas, id) {
  let endPoint = "disciplina/";
  const filterFunction = ({ data }) => {
    const newArray = disciplinas.filter(
      (disciplina) => disciplina.iddisciplina !== id
    );
    setDisciplinas(newArray);
    return { data };
  };
  await defaultDelete(endPoint, id, filterFunction);
}

async function deleteProfessor(professores, setProfessores, id) {
  let endPoint = "professor/";
  const filterFunction = ({ data }) => {
    const newArray = professores.filter(
      (professor) => professor.idprofessor !== id
    );
    setProfessores(newArray);
    return { data };
  };
  await defaultDelete(endPoint, id, filterFunction);
}

async function thinDefaultDelete(endPoint, id) {
  await axios
    .delete(baseUrl + endPoint + id)
    .then(({ data }) => toast.success(data))
    .catch(({ data }) => toast.error(data));
}

async function thinDeleteProfessor(id) {
  let endPoint = "professor/";
  await thinDefaultDelete(endPoint, id);
}

async function deleteTurma(turmas, setTurmas, id) {
  let endPoint = "turma/";
  const filterFunction = ({ data }) => {
    const newArray = turmas.filter((turma) => turma.idturma !== id);
    setTurmas(newArray);
    return { data };
  };
  await defaultDelete(endPoint, id, filterFunction);
}

async function deleteSala(salas, setSalas, id) {
  let endPoint = "sala/";
  const filterFunction = ({ data }) => {
    const newArray = salas.filter((sala) => sala.idsala !== id);
    setSalas(newArray);
    return { data };
  };
  await defaultDelete(endPoint, id, filterFunction);
}

export {
  createDisciplina,
  createProfessor,
  createTurma,
  createSala,
  readDisciplinas,
  readProfessores,
  readTurmas,
  readSalas,
  updateDisciplina,
  updateProfessor,
  updateTurma,
  updateSala,
  deleteDisciplina,
  deleteProfessor,
  thinDeleteProfessor,
  deleteTurma,
  deleteSala,
};
