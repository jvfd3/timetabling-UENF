import React, { useState, useEffect } from "react";
import CRUDPageSelection from "../components/PageSelect";
import options from "../temp/options";
import "../CSS/professores.css";
import "../CSS/defaultStyle.css";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import { SelectCurso, SelectLaboratorio } from "../components/mySelects";
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
// import { scrollThroughProfessores } from "../functions/firulas/minhasFirulas";

function ProfessoresDB() {
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

  function ProfessorSelection({ professorStates }) {
    const { professores, /* setProfessores, */ professor, setProfessor } =
      professorStates;
    return (
      <div className="SelectionBar">
        <Select
          className="itemSelectionBar"
          styles={options.SelectStyles.anotherOne}
          options={professores}
          value={professor}
          onChange={setProfessor}
          getOptionLabel={({ laboratorio, curso, apelidoProfessor }) =>
            `(${laboratorio} - ${curso}) ${apelidoProfessor}`
          }
          getOptionValue={(option) => option.idprofessor}
        />
        <div className="CRUDButtonsContainer">
          <CreateButton createFunction={createProfessor} />
          <ReadButton readFunction={readProfessor} />
          <UpdateButton updateFunction={updateProfessor} />
          <DeleteButton deleteFunction={deleteProfessor} />
        </div>
      </div>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <ProfessorSelection professorStates={professorStates} />
      <div className="showBasicCardData">
        <h3>INFORMAÇÕES DO PROFESSOR</h3>
        <table className="showBasicDataTable">
          <tbody>
            <tr>
              <th>laboratório</th>
              <td>
                <SelectLaboratorio professorStates={professorStates} />
              </td>
            </tr>
            <tr>
              <th>Curso</th>
              <td>
                <SelectCurso professorStates={professorStates} />
              </td>
            </tr>
            <tr>
              <th>Nome</th>
              <td>
                <TextField
                  className="f"
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
              </td>
            </tr>
            <tr>
              <th>Apelido</th>
              <td>
                <TextField
                  className="g"
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
              </td>
            </tr>
            <tr>
              <th>ID</th>
              <td>
                <TextField
                  className="h"
                  value={professor.idprofessor}
                  fullWidth
                  label="ID do Professor"
                  disabled
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CRUDprofessors() {
  return (
    <div className="background">
      <CRUDPageSelection
        defaultValue={options.constantValues.pageSelection.professores}
      />
      <ProfessoresDB />
    </div>
  );
}

export default CRUDprofessors;
