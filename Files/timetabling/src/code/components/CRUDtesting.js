import React, { useEffect, useState } from "react";
import "../CSS/defaultStyle.css";
// import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { BsDatabaseDown, BsDatabaseFillAdd } from "react-icons/bs";
import {
  // createDisciplina,
  createProfessor,
  // createTurma,
  // createSala,
  // readDisciplinas,
  readProfessores,
  // readTurmas,
  // readSalas,
  // updateDisciplina,
  updateProfessor,
  // updateTurma,
  // updateSala,
  // deleteDisciplina,
  // deleteProfessor,
  thinDeleteProfessor,
  // deleteTurma,
  // deleteSala,
} from "../../DB/dataFromDB";
import options from "../temp/options";
import {
  newReadProfessores,
  newCreateProfessor,
} from "../../DB/controller/CRUDConverter";
import { toast } from "react-toastify";

function CRUDTesting() {
  let dummyProfessor = { ...options.dbTemplates.professor };
  dummyProfessor.apelidoProfessor = "Prof";
  dummyProfessor.curso = "Engenharia de Software";
  dummyProfessor.idprofessor = 1234;
  dummyProfessor.laboratorio = "Lab 1";
  dummyProfessor.nomeProfessor = "Professor";

  useEffect(() => {
    /* readProfessores().then((data) => {
        setProfessores(data);
      }); */
  }, []);

  const [professores, setProfessores] = useState([dummyProfessor]);
  const [professor, setProfessor] = useState(
    professores[professores.length - 1]
  );
  const [lastProfessor, setLastProfessor] = useState(
    professores[professores.length - 1]
  );
  const [lastId, setLastId] = useState(0);

  useEffect(() => {
    let ultimo = professores[professores.length - 1];
    setLastProfessor(ultimo);
    setLastId(ultimo.idprofessor);
  }, [professores]);

  useEffect(() => {
    setProfessor(lastProfessor);
  }, [lastProfessor]);

  function internCreateProfessor() {
    let newProfessor = { ...professor };
    newProfessor.idprofessor += 1;
    setProfessores([...professores, newProfessor]);
    newCreateProfessor(newProfessor);
    // internReadProfessores();
  }

  function internReadProfessores() {
    let data = newReadProfessores();
    data.then((data) => {
      console.log("interno", data);
      setProfessores(data);
    });
  }

  useEffect(() => {
    internReadProfessores();
  }, []);

  function internUpdateProfessor() {
    let updatedProfessor = { ...professor };
    let newProfessores = professores.map((localProfessor) =>
      localProfessor.idprofessor === updatedProfessor.idprofessor
        ? localProfessor
        : updatedProfessor
    );
    setProfessores(newProfessores);
    updateProfessor(professor);
  }

  function internDeleteProfessor() {
    // console.log("deleting: ", professor.idprofessor);
    // deleteProfessor(professores, setProfessores, professor.idprofessor);
    function filterProfessor(oldArray, id) {
      const newArray = oldArray.filter((item) => item.idprofessor !== id);
      return newArray;
    }
    console.log(professor.idprofessor);
    thinDeleteProfessor(professor.idprofessor);
    setProfessores(filterProfessor(professores, professor.idprofessor));
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
        <BsDatabaseFillAdd size="4em" onClick={internCreateProfessor} />
        <BsDatabaseDown size="4em" onClick={internReadProfessores} />
        <FaEdit size="4em" onClick={internUpdateProfessor} />
        <FaTrash size="4em" onClick={internDeleteProfessor} />
      </div>
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>last id</div>
          <div>{lastId}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>id professor</div>
          <div>{professores[professores.length - 1].idprofessor}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>id lastprofessor</div>
          <div>{lastProfessor.idprofessor}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>id professor atual</div>
          <div>{professor.idprofessor}</div>
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
