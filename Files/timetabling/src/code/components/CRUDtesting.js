import React, { useEffect, useState } from "react";
import "../CSS/defaultStyle.css";
import "./CRUDtesting.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { BsDatabaseDown, BsDatabaseFillAdd } from "react-icons/bs";
import options from "../temp/options";
import {
  readProfessores,
  deleteProfessores,
  createProfessores,
  updateProfessores,
} from "../../DB/controller/axiosConnection";
import { toast } from "react-toastify";

function CreateButton({ receivedFunction }) {
  return (
    <div className="iconCreate">
      <BsDatabaseFillAdd size="4em" onClick={receivedFunction} />
    </div>
  );
}

function ReadButton({ receivedFunction }) {
  return (
    <div className="iconRead">
      <BsDatabaseDown size="4em" onClick={receivedFunction} />
    </div>
  );
}

function UpdateButton({ receivedFunction }) {
  return (
    <div className="iconUpdate">
      <FaEdit size="4em" onClick={receivedFunction} />
    </div>
  );
}

function DeleteButton({ receivedFunction }) {
  return (
    <div className="iconDelete">
      <FaTrash size="4em" onClick={receivedFunction} />
    </div>
  );
}

function CRUDTesting() {
  let dummyProfessor = { ...options.dbTemplates.professor };
  dummyProfessor.apelidoProfessor = "Prof";
  dummyProfessor.curso = "Engenharia de Software";
  dummyProfessor.idprofessor = 1234;
  dummyProfessor.laboratorio = "Lab 1";
  dummyProfessor.nomeProfessor = "Professor";

  const [professores, setProfessores] = useState([dummyProfessor]);
  const [professor, setProfessor] = useState(dummyProfessor);

  useEffect(() => {
    let ultimo = professores[professores.length - 1];
    setProfessor(ultimo);
  }, [professores]);

  function internCreateProfessor() {
    let newProfessor = { ...professor };
    createProfessores(newProfessor).then((newId) => {
      newProfessor.idprofessor = newId;
      setProfessor(newProfessor);
      setProfessores([...professores, newProfessor]);
    });
  }

  function internReadProfessores() {
    let local = "CRUDTesting>internReadProfessores";
    let dataReceived = readProfessores();
    dataReceived.then((data) => {
      setProfessores(data);
    }).catch((error) => {
      console.log(`${local}>Deu Erro`, error)
    });
  }

  function internUpdateProfessor() {
    let updatedProfessor = { ...professor };
    let oldProfessores = [...professores];
    let newProfessores = professores.map((localProfessor) =>
      localProfessor.idprofessor === updatedProfessor.idprofessor
        ? localProfessor
        : updatedProfessor
    );
    setProfessores(newProfessores);
    updateProfessores(updatedProfessor).catch((error) => {
      toast.warning(
        "Retornando aos valores anteriores, houve um erro ao atualizar professor: ",
        error
      );
      setProfessores(oldProfessores);
    });
  }

  function internDeleteProfessor() {
    function filterProfessor(oldArray, id) {
      const newArray = oldArray.filter((item) => item.idprofessor !== id);
      return newArray;
    }

    console.log("deleting: ", professor.idprofessor);
    let oldProfessores = [...professores];
    setProfessores(filterProfessor(professores, professor.idprofessor));
    deleteProfessores(professor.idprofessor).catch((error) => {
      toast.warning(
        "Retornando aos valores anteriores, houve um erro ao atualizar professor: ",
        error
      );
      setProfessores(oldProfessores);
    });
  }

  return (
    <div className="" style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          paddingBottom: 10,
        }}
      >
        <CreateButton receivedFunction={internCreateProfessor} />
        <ReadButton receivedFunction={internReadProfessores} />
        <UpdateButton receivedFunction={internUpdateProfessor} />
        <DeleteButton receivedFunction={internDeleteProfessor} />
      </div>
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>id do último professor</div>
          <div>
            {professor ? professor.idprofessor : "Professor não definido"}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label>Nome Professor</label>
          <input
            type="text"
            value={professor.nomeProfessor || ""}
            onChange={(e) => {
              setProfessor({
                ...professor,
                nomeProfessor: e.target.value,
              });
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label>Apelido Professor</label>
          <input
            type="text"
            value={professor.apelidoProfessor || ""}
            onChange={(e) => {
              setProfessor({
                ...professor,
                apelidoProfessor: e.target.value,
              });
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label>Curso</label>
          <input
            type="text"
            value={professor.curso || ""}
            onChange={(e) => {
              setProfessor({
                ...professor,
                curso: e.target.value,
              });
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label>Laboratorio</label>
          <input
            type="text"
            value={professor.laboratorio || ""}
            onChange={(e) => {
              setProfessor({
                ...professor,
                laboratorio: e.target.value,
              });
            }}
          />
        </div>
      </>
    </div>
  );
}

export default CRUDTesting;
