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
    createProfessores(professor)
      .then((newId) => {
        if (newId) {
          let newProfessor = { ...professor, idprofessor: newId };
          setProfessores([...professores, newProfessor]);
          setProfessor({ ...professores, newProfessor });
        }
      })
      .catch((error) => console.error(error));
  }

  function internReadProfessores() {
    readProfessores()
      .then((professoresFromDB) => {
        setProfessores(professoresFromDB);
      })
      .catch((error) => console.error(error));
  }

  function internUpdateProfessor() {
    function updateProfessorFromList(oldArray, newProfessor) {
      const newArray = oldArray.map((professorAntigo) => {
        return professorAntigo.idprofessor === newProfessor.idprofessor
          ? newProfessor
          : professorAntigo;
      });
      return newArray;
    }
    updateProfessores(professor)
      .then((newProfessor) => {
        setProfessores(updateProfessorFromList(professores, newProfessor));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function internDeleteProfessor() {
    function deleteProfessorFromList(oldArray, deletedProfessor) {
      const newArray = oldArray.filter(
        (oldProfessor) =>
          oldProfessor.idprofessor !== deletedProfessor.idprofessor
      );
      return newArray;
    }
    setProfessor(professores[professores.length - 1]);
    deleteProfessores(professor)
      .then((deletedProfessor) => {
        if (deletedProfessor) {
          setProfessores(deleteProfessorFromList(professores, deletedProfessor));
        }
      })
      .catch((error) => console.error("internDelete>", error));
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
