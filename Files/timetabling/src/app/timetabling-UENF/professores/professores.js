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

import "./professores.css";
import {
  TextInputApelidoProfessor,
  TextInputIdProfessor,
  TextInputNomeProfessor,
} from "../../../components/MyTextFields";
import { CRUDButtonsContainer } from "../../../components/CRUDButtons";
// import { scrollThroughProfessores } from "../functions/firulas/minhasFirulas";

function ProfessorSelection(professorStates) {
  let crudFunctions = {
    createFunc: () => {
      safeCreateProfessores(professorStates);
    },
    readFunc: () => {
      safeReadProfessores(professorStates);
    },
    updateFunc: () => {
      safeUpdateProfessores(professorStates);
    },
    deleteFunc: () => {
      safeDeleteProfessores(professorStates);
    },
  };
  return (
    <div className="SelectionBar">
      <CRUDButtonsContainer {...crudFunctions} />
      <ProfessorItemSelection {...professorStates} />
    </div>
  );
}

function BaseProfessorData(professorStates) {
  return (
    <div className="showBasicDataCard">
      <h3>INFORMAÇÕES DO PROFESSOR</h3>
      <table className="showBasicDataTable">
        <thead>
          <tr>
            <th>Chave</th>
            <th>Valor</th>
          </tr>
        </thead>
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
  );
}

function ProfessorCard(professorStates) {
  return (
    <div className="infoCard">
      <BaseProfessorData {...professorStates} />
      {/* <ProfessorClasses {...professorStates} /> */}
      {/* <ProfessorPreferences {...professorStates} /> */}
    </div>
  );
}

function Professors() {
  let defaultProfessors = allLocalJsonData.SQL.professores;

  const [professores, setProfessores] = useState(defaultProfessors);
  const [professor, setProfessor] = useState(
    defaultProfessors[professores.length - 1]
  );

  let professorStates = {
    professores,
    setProfessores,
    professor,
    setProfessor,
  };

  return (
    <div className="CRUDContainComponents">
      <ProfessorSelection {...professorStates} />
      <ProfessorCard {...professorStates} />
    </div>
  );
}

function CRUDprofessors() {
  return (
    <div className="background">
      <CRUDPageSelection
        defaultValue={options.constantValues.pageSelection.professors}
      />
      <Professors />
    </div>
  );
}

export default CRUDprofessors;
