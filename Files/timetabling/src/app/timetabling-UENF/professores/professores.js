import React, { useState, useEffect } from "react";
import CRUDPageSelection from "../../../components/PageSelect";
import options from "../../../DB/local/options";
import { allLocalJsonData } from "../../../DB/local/dataFromJSON";
import {
  ProfessorItemSelection,
  SelectCurso,
  SelectLaboratorio,
} from "../../../components/mySelects";
import {
  safeCreateProfessores,
  safeReadProfessores,
  safeUpdateProfessores,
  safeDeleteProfessores,
} from "../../../DB/AWS/cleanCodeFromAxios";
import {
  CreateDBButton,
  ReadDBButton,
  UpdateInfo,
  DeleteInfo,
} from "../../../components/Buttons/Dumb/Dumb";

import "./professores.css";
import {
  TextInputApelidoProfessor,
  TextInputIdProfessor,
  TextInputNomeProfessor,
} from "../../../components/MyTextFields";
// import { scrollThroughProfessores } from "../functions/firulas/minhasFirulas";

function ProfessoresDB() {
  let defaultProfessores = allLocalJsonData.SQL.professores;
  const [professores, setProfessores] = useState(defaultProfessores);
  const [professor, setProfessor] = useState(
    defaultProfessores[professores.length - 1]
  );

  let professorStates = {
    professores,
    setProfessores,
    professor,
    setProfessor,
  };

  useEffect(() => {
    // safeReadProfessores(professorStates);
  }, []);
  /* 
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
  } */

  function ProfessorSelection(professorStates) {
    return (
      <div className="SelectionBar">
        <ProfessorItemSelection professorStates={professorStates} />
        <div className="CRUDButtonsContainer">
          <CreateDBButton
            createFunc={() => {
              safeCreateProfessores(professorStates);
            }}
          />
          <ReadDBButton
            readFunc={() => {
              safeReadProfessores(professorStates);
            }}
          />
          <UpdateInfo
            updateFunc={() => {
              safeUpdateProfessores(professorStates);
            }}
          />
          <DeleteInfo
            deleteFunc={() => {
              safeDeleteProfessores(professorStates);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <ProfessorSelection {...professorStates} />
      <div className="showBasicDataCard">
        <h3>INFORMAÇÕES DO PROFESSOR</h3>
        <table className="showBasicDataTable">
          <tbody>
            <tr>
              <th>laboratório</th>
              <td>
                <SelectLaboratorio {...professorStates} />
              </td>
            </tr>
            <tr>
              <th>Curso</th>
              <td>
                <SelectCurso {...professorStates} />
              </td>
            </tr>
            <tr>
              <th>Nome</th>
              <td>
                <TextInputNomeProfessor {...professorStates} />
              </td>
            </tr>
            <tr>
              <th>Apelido</th>
              <td>
                <TextInputApelidoProfessor {...professorStates} />
              </td>
            </tr>
            <tr>
              <th>ID</th>
              <td>
                <TextInputIdProfessor {...professorStates} />
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
        defaultValue={options.constantValues.pageSelection.professors}
      />
      <ProfessoresDB />
    </div>
  );
}

export default CRUDprofessors;
