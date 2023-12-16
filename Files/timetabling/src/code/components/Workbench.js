import React, { useEffect, useState } from "react";
import "../CSS/defaultStyle.css";
// import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  createDisciplina,
  // createProfessor,
  // createTurma,
  // createSala,
  readDisciplinas,
  // readProfessores,
  // readTurmas,
  // readSalas,
  updateDisciplina,
  // updateProfessor,
  // updateTurma,
  // updateSala,
  deleteDisciplina,
  // deleteProfessor,
  // deleteTurma,
  // deleteSala,
} from "../../DB/dataFromDB";
import options from "../temp/options";

function Workbench() {
  function Workbench2() {
    let dummyDisciplina = { ...options.dbTemplates.disciplina };
    dummyDisciplina.iddisciplina = 1234;
    dummyDisciplina.periodoEsperado = 1234;
    dummyDisciplina.codigoDisciplina = "B";
    dummyDisciplina.nomeDisciplina = "B";
    dummyDisciplina.apelidoDisciplina = "B";

    const [disciplinas, setDisciplinas] = useState([dummyDisciplina]);

    useEffect(() => {
      readDisciplinas().then((data) => setDisciplinas(data));
    }, []);

    const [disciplina, setDisciplina] = useState(
      disciplinas[disciplinas.length - 1]
    );

    useEffect(() => {
      setDisciplina(disciplinas[disciplinas.length - 1]);
    }, [disciplinas]);

    console.log(
      "disciplinas",
      disciplinas[disciplinas.length - 1].iddisciplina
    );
    console.log("disciplina", disciplina.iddisciplina);

    return (
      <div className="" style={{ display: "flex", flexDirection: "column" }}>
        <div>{disciplina.iddisciplina}</div>
        <div>{disciplinas[disciplinas.length - 1].iddisciplina}</div>
        <button
          onClick={() =>
            createDisciplina(disciplinas, setDisciplinas, disciplina)
          }
        >
          Create Disciplina
        </button>
        <button
          onClick={() => readDisciplinas().then((data) => setDisciplinas(data))}
        >
          Read Disciplinas
        </button>
        {/* Botão para atualizar a disciplina */}
        <button
          onClick={() => {
            console.log("disciplina", disciplina);
            updateDisciplina(disciplinas, setDisciplinas, disciplina);
          }}
        >
          Update Disciplina
        </button>
        <>
          {/* Create here a place where I can show and edit the select disciplina data */}
          <div>
            <label>Periodo Esperado</label>
            <input
              type="number"
              value={disciplina.periodoEsperado}
              onChange={(e) => {
                setDisciplina({
                  ...disciplina,
                  periodoEsperado: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label>Codigo Disciplina</label>
            <input
              type="text"
              value={disciplina.codigoDisciplina}
              onChange={(e) => {
                setDisciplina({
                  ...disciplina,
                  codigoDisciplina: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label>Nome Disciplina</label>
            <input
              type="text"
              value={disciplina.nomeDisciplina}
              onChange={(e) => {
                setDisciplina({
                  ...disciplina,
                  nomeDisciplina: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label>Apelido Disciplina</label>
            <input
              type="text"
              value={disciplina.apelidoDisciplina}
              onChange={(e) => {
                setDisciplina({
                  ...disciplina,
                  apelidoDisciplina: e.target.value,
                });
              }}
            />
          </div>
        </>
        <button
          onClick={() =>
            deleteDisciplina(
              disciplinas,
              setDisciplinas,
              disciplina.iddisciplina
            )
          }
        >
          Delete Disciplina
        </button>
        {/* Crie um botão que faça surgir um Toast por 2 segundos */}
        <button
          onClick={() => {
            toast("neutral");
            toast.success("Success!");
            toast.error("Error.");
          }}
        >
          Toast
        </button>
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
