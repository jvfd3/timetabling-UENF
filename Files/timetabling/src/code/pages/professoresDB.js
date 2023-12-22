import React, { useEffect, useRef, useState } from "react";
import CRUDPageSelection from "../components/PageSelect";
import options from "../temp/options";
import "../CSS/CRUD_professores.css";
import "../CSS/defaultStyle.css";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import {
  TextInputApelidoProfessor,
  TextInputNomeProfessor,
} from "../components/MyTextFields";
import {
  SelectCurso,
  SelectLaboratorio,
  SelectProfessorC,
} from "../components/mySelects";
import { FaTrash, FaEdit } from "react-icons/fa";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { AsyncProfessor } from "../components/SelectDB";
import {
  // createProfessor,
  // readProfessores,
  updateProfessor,
  thinDeleteProfessor,
} from "../../DB/dataFromDB";
import { readProfessores } from "../../DB/controller/axiosConnection";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import {
  safeCreateProfessores,
  safeReadProfessores,
  safeUpdateProfessores,
  safeDeleteProfessores,
} from "../functions/cleanCodeFromAxios";
import {
  CreateButton,
  ReadButton,
  UpdateButton,
  DeleteButton,
} from "../components/CRUDButtons/CRUDButtons";

function ProfessoresDB() {
  let dummyProfessor = allLocalJsonData.SQL.professores[2];
  const [professor, setProfessor] = useState(dummyProfessor);

  const inputRef1 = useRef();
  const inputRef2 = useRef();

  useEffect(() => {
    inputRef1.current.focus();
  }, [professor.nomeProfessor]);

  useEffect(() => {
    inputRef2.current.focus();
  }, [professor.apelidoProfessor]);

  function ProfessorTable({ professor }) {
    return (
      <table className="showBasicDataTable">
        <tbody>
          <tr>
            <th>Nome</th>
            <td>
              <TextInputNomeProfessor
                professor={professor}
                setProfessor={setProfessor}
                inputRef1={inputRef1}
              />
            </td>
          </tr>
          <tr>
            <th>Apelido</th>
            <td>
              <TextInputApelidoProfessor
                professor={professor}
                setProfessor={setProfessor}
                inputRef2={inputRef2}
              />
            </td>
          </tr>
          <tr>
            <th>Curso</th>
            <td>
              <SelectCurso
                professorAtual={professor}
                setNewProfessor={setProfessor}
              />
            </td>
          </tr>
          <tr>
            <th>Laboratório</th>
            <td>
              <SelectLaboratorio
                professorAtual={professor}
                setNewProfessor={setProfessor}
              />
            </td>
          </tr>
          <tr>
            <th>id</th>
            <td>{professor.idprofessor}</td>
          </tr>
          <tr>
            <td></td>
            <td>
              Nome: {professor.nomeProfessor}
              <br />
              Apelido: {professor.apelidoProfessor}
              <br />
              Curso: {professor.curso}
              <br />
              Laboratório: {professor.laboratorio}
              <br />
              id: {professor.idprofessor}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  function CRUDButtons({ professor, setProfessor }) {
    /* 
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
 */
    function internUpdateProfessor() {
      let updatedProfessor = { ...professor };
      /* let newProfessores = professores.map((professor) =>
        professor.idprofessor === updatedProfessor.idprofessor
          ? professor
          : updatedProfessor
      ); */
      // setProfessores(newProfessores);
      updateProfessor(professor);
    }

    function internDeleteProfessor() {
      // console.log("deleting: ", professor.idprofessor);
      // deleteProfessor(professores, setProfessores, professor.idprofessor);
      /* function filterProfessor(oldArray, id) {
        const newArray = oldArray.filter((item) => item.idprofessor !== id);
        return newArray;
      } */
      thinDeleteProfessor(professor.idprofessor);
      // setProfessores(filterProfessor(professores, professor.idprofessor));
    }

    return (
      <div
        style={{
          flexDirection: "row",
          paddingTop: 10,
          paddingRight: 10,
          paddingLeft: 50,
        }}
      >
        {/* <BsDatabaseFillAdd size="4em" onClick={internCreateProfessor} /> */}
        {/* <BsDatabaseDown size="4em" onClick={internReadProfessores} /> */}
        <FaEdit size="30px" onClick={internUpdateProfessor} />
        <FaTrash size="30px" onClick={internDeleteProfessor} />
      </div>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <AsyncProfessor professor={professor} setProfessor={setProfessor} />
      <div className="showBasicDataCard">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h3>INFORMAÇÕES DO PROFESSOR</h3>
          <CRUDButtons professor={professor} setProfessor={setProfessor} />
        </div>
        <ProfessorTable professor={professor} setProfessor={setProfessor} />
      </div>
    </div>
  );
}

function ProfessoresDBRefactor() {
  let defaultProfessores = allLocalJsonData.SQL.professores;
  const [professores, setProfessores] = useState(defaultProfessores);
  const [professor, setProfessor] = useState(
    defaultProfessores[professores.length - 1]
  );

  let professorStates = {
    professores: professores,
    setProfessores: setProfessores,
    professor: professor,
    setProfessor: setProfessor,
  };

  useEffect(() => {
    safeReadProfessores(professorStates);
  }, []);

  function createProfessor() {
    safeCreateProfessores(professorStates);
  }

  function readProfessor() {
    safeReadProfessores(professorStates);
  }

  function updateProfessor() {
    safeUpdateProfessores(professorStates);
  }

  function deleteProfessor() {
    safeDeleteProfessores(professorStates);
  }

  return (
    <div className="CRUDContainComponents">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Select
          styles={options.SelectStyles.fixedWidth}
          options={professores}
          value={professor}
          onChange={setProfessor}
          getOptionLabel={({ laboratorio, curso, apelidoProfessor }) =>
            `(${laboratorio} - ${curso}) ${apelidoProfessor}`
          }
          getOptionValue={(option) => option.idprofessor}
        />
        <CreateButton createFunction={createProfessor} />
        <ReadButton readFunction={readProfessor} />
        <UpdateButton updateFunction={updateProfessor} />
        <DeleteButton deleteFunction={deleteProfessor} />
      </div>
      <div>
        {/* <div>
          <pre>{JSON.stringify(professor, null, 2)
          /Just for debugging purposes
          }</pre>
        </div> */}
        <div>
          Laboratorio
          <SelectLaboratorio professorStates={professorStates} />
        </div>
        <div>
          Curso
          <SelectCurso professorStates={professorStates} />
        </div>
        <TextField
          value={professor.nomeProfessor}
          onChange={(event) => {
            let newProfessor = {
              ...professor,
              nomeProfessor: event.target.value,
            };
            setProfessor(newProfessor);
          }}
          fullWidth
          label="Nome do Professor"
        />
        <TextField
          value={professor.apelidoProfessor}
          onChange={(event) => {
            let newProfessor = {
              ...professor,
              apelidoProfessor: event.target.value,
            };
            setProfessor(newProfessor);
          }}
          fullWidth
          label="Apelido do Professor"
        />
        <TextField
          value={professor.idprofessor}
          fullWidth
          label="ID do Professor"
          disabled
        />
      </div>
    </div>
  );
}

function CRUDprofessors() {
  return (
    <div className="background">
      <CRUDPageSelection
        defaultValue={options.constantValues.pageSelection.professoresDB}
      />
      {/* <ProfessoresDB /> */}
      <ProfessoresDBRefactor />
      {/* <Professores /> */}
      {/* <LambdaCopilot /> */}
    </div>
  );
}

export default CRUDprofessors;
