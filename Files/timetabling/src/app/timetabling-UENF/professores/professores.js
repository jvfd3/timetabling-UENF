import "./professores.css";
import React, { useState } from "react";
import CRUDPageSelection from "../../../components/PageSelect";
import options from "../../../DB/local/options";
import {
  allLocalJsonData,
  sqlDataFromJson,
} from "../../../DB/local/dataFromJSON";
import { CRUDButtonsContainer } from "../../../components/CRUDButtons";
// import { scrollThroughProfessores } from "../functions/firulas/minhasFirulas";
import {
  SelectProfessorItem,
  SelectProfessorCourse,
  SelectProfessorLab,
} from "../../../components/mySelects";
import {
  safeCreateProfessores,
  safeReadProfessores,
  safeUpdateProfessores,
  safeDeleteProfessores,
} from "../../../DB/AWS/cleanCodeFromAxios";
import {
  TextInputProfessorId,
  TextInputProfessorName,
  TextinputProfessorAlias,
} from "../../../components/MyTextFields";

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
      <SelectProfessorItem {...professorStates} />
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
              <SelectProfessorLab {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>Curso</th>
            <td>
              <SelectProfessorCourse {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>Nome</th>
            <td>
              <TextInputProfessorName {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>Apelido</th>
            <td>
              <TextinputProfessorAlias {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>ID</th>
            <td>
              <TextInputProfessorId {...professorStates} />
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
  let defaultProfessors = sqlDataFromJson.professors;

  const [professors, setProfessors] = useState(defaultProfessors);
  const [professor, setProfessor] = useState(professors[professors.length - 1]);

  let professorStates = { professors, setProfessors, professor, setProfessor };

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
