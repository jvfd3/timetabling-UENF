import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import {
  getItemIndexInListById,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "professor";

function createProfessor({
  professors,
  setProfessors,
  professor,
  setProfessor,
}) {
  function insertNewProfessorFromDB(newId) {
    const newProfessor = { ...professor, id: newId };
    setProfessor(newProfessor);
    setProfessors([...professors, newProfessor]);
  }
  defaultDBCreate(itemName, professor)
    .then(insertNewProfessorFromDB)
    .catch(defaultHandleError);
}

function readProfessor({ setProfessors, setProfessor, professor }) {
  function insertNewProfessorsFromDB(professoresFromDB) {
    const index = getItemIndexInListById(professor, professoresFromDB);
    const keepCurrentProfessor = professoresFromDB?.[index];
    const lastProfessor = professoresFromDB[professoresFromDB.length - 1];
    const showedProfessor = keepCurrentProfessor ?? lastProfessor;
    setProfessor(showedProfessor);
    setProfessors(professoresFromDB);
  }

  defaultDBRead(itemName)
    .then(insertNewProfessorsFromDB)
    .catch(defaultHandleError);
}

function updateProfessor({ professors, setProfessors, professor }) {
  function updateProfessorOnList(newProfessor) {
    const updatedProfessors = replaceNewItemInListById(
      newProfessor,
      professors
    );
    setProfessors(updatedProfessors);
  }

  defaultDBUpdate(itemName, professor)
    .then(updateProfessorOnList)
    .catch(defaultHandleError);
}

function deleteProfessor({
  professors,
  setProfessors,
  professor,
  setProfessor,
}) {
  function deleteProfessorOnList(deletedProfessor) {
    if (deletedProfessor) {
      const updatedProfessorList = removeItemInListById(
        deletedProfessor,
        professors
      );

      const index = getItemIndexInListById(deletedProfessor, professors);
      let newProfessor = null;
      if (index > 0) {
        newProfessor = updatedProfessorList[index - 1]; // continua do anterior
      } else if (updatedProfessorList.length > 0) {
        newProfessor = updatedProfessorList[0];
        // Se estou apagando o primeiro e ainda tem mais...
      } else {
        console.error(
          "Uai, não tem mais professores! Como diria o Silvio Santos: 'Está certo disto?'"
        );
      }

      setProfessor(newProfessor);
      setProfessors(updatedProfessorList);
    }
  }

  defaultDBDelete(itemName, professor)
    .then(deleteProfessorOnList)
    .catch(defaultHandleError);
}

export { createProfessor, readProfessor, updateProfessor, deleteProfessor };
