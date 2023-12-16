// import options from "../code/temp/options";
// import { readData } from "../code/functions/CRUD_JSONBIN";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

let baseUrl = "http://localhost:8800/";

async function createInDB(endPoint, myData) {
  await axios
    .post(baseUrl + endPoint, myData)
    .then(({ data }) => toast.success(data))
    .catch(({ data }) => toast.error(data));
}

async function createDisciplina(disciplina) {
  let endPoint = "disciplina";
  createInDB(endPoint, disciplina);
}

async function createProfessor(professor) {
  let endPoint = "professor";
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

async function defaultDelete(endPoint, id, filterFunction) {
  await axios
    .delete(baseUrl + endPoint + id)
    .then(filterFunction)
    .then(({ data }) => toast.success(data))
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
  deleteDisciplina,
  deleteProfessor,
  deleteTurma,
  deleteSala,
};
