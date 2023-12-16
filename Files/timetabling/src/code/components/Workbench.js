import React, { useEffect, useState } from "react";
import "../CSS/defaultStyle.css";
// import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
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
  deleteProfessor,
  thinDeleteProfessor,
  // deleteTurma,
  // deleteSala,
} from "../../DB/dataFromDB";
import options from "../temp/options";

function Workbench() {
  function Workbench2() {
    let dummyProfessor = { ...options.dbTemplates.professor };
    dummyProfessor.apelidoProfessor = "Prof";
    dummyProfessor.curso = "Engenharia de Software";
    dummyProfessor.idprofessor = 1234;
    dummyProfessor.laboratorio = "Lab 1";
    dummyProfessor.nomeProfessor = "Professor";

    const [professores, setProfessores] = useState([dummyProfessor]);
    const [professor, setProfessor] = useState(
      professores[professores.length - 1]
    );
    const [lastProfessor, setLastProfessor] = useState(
      professores[professores.length - 1]
    );
    const [lastId, setLastId] = useState(0);

    useEffect(() => {
      setLastProfessor(professores[professores.length - 1]);
      setLastId(professores[professores.length - 1].idprofessor);
    }, [professores]);

    useEffect(() => {
      setProfessor(lastProfessor);
    }, [lastProfessor]);

    function internCreateProfessor() {
      let newProfessor = { ...professor };
      newProfessor.idprofessor += 1;
      setProfessores([...professores, newProfessor]);
      createProfessor(newProfessor);
      // internReadProfessores();
    }

    function internReadProfessores() {
      readProfessores().then((data) => {
        setProfessores(data);
      });
    }

    function internUpdateProfessor() {
      let updatedProfessor = { ...professor };
      let newProfessores = professores.map((professor) =>
        professor.idprofessor === updatedProfessor.idprofessor
          ? professor
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
      thinDeleteProfessor(professor.idprofessor);
      setProfessores(filterProfessor(professores, professor.idprofessor));
    }

    return (
      <div className="" style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={internCreateProfessor}>Create Professor</button>
        <button onClick={internReadProfessores}>Read Professores</button>
        <button onClick={internUpdateProfessor}>Update Professor</button>
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
        <button onClick={internDeleteProfessor}>Delete Professor</button>
        {/* Crie um botão que faça surgir um Toast por 2 segundos */}
      </div>
    );
  }

  return (
    <div className="showBasicDataCard">
      <Workbench2 />
    </div>
  );
}

export default Workbench;
