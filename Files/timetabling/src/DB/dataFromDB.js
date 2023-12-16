// import options from "../code/temp/options";
// import { readData } from "../code/functions/CRUD_JSONBIN";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

let baseUrl = "http://localhost:8800/";

async function getDataFromURL(endPoint) {
  try {
    const res = await axios.get(baseUrl + endPoint);
    return res.data;
  } catch (error) {
    toast.error(error);
  }
}

async function getProfessores() {
  let endPoint = "professores";
  return getDataFromURL(endPoint);
}

async function getDisciplinas() {
  let endPoint = "disciplinas";
  return getDataFromURL(endPoint);
}

async function getSalas() {
  let endPoint = "salas";
  return getDataFromURL(endPoint);
}

async function getTurmas() {
  let endPoint = "turmas";
  return getDataFromURL(endPoint);
}

async function addToDB(endPoint, myData) {
  await axios
    .post(baseUrl + endPoint, myData)
    .then(({ data }) => toast.success(data))
    .catch(({ data }) => toast.error(data));
}

async function addProfessor(professor) {
  let endPoint = "professor";
  addToDB(endPoint, professor);
}

async function addDisciplina(disciplina) {
  let endPoint = "disciplina";
  addToDB(endPoint, disciplina);
}

async function addSala(sala) {
  let endPoint = "sala";
  addToDB(endPoint, sala);
}

async function addTurma(turma) {
  let endPoint = "turma";
  addToDB(endPoint, turma);
}

export {
  getProfessores,
  getDisciplinas,
  getSalas,
  getTurmas,
  addProfessor,
  addDisciplina,
  addSala,
  addTurma,
};
