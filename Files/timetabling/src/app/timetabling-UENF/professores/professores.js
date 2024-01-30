import "./professores.css";
import React, { useEffect, useState } from "react";
import CRUDPageSelection from "../../../components/PageSelect";
import options from "../../../DB/local/options";
import { CRUDButtonsContainer } from "../../../components/CRUDButtons";
import { sqlDataFromJson } from "../../../DB/local/dataFromJSON";
// import { scrollThroughProfessores } from "../functions/firulas/minhasFirulas";
import {
  SelectProfessorItem,
  SelectProfessorCourse,
  SelectProfessorLab,
} from "../../../components/mySelects";
import {
  TextInputProfessorId,
  TextInputProfessorName,
  TextinputProfessorAlias,
} from "../../../components/MyTextFields";
import {
  createProfessor,
  readProfessor,
  updateProfessor,
  deleteProfessor,
} from "../../../helpers/CRUDFunctions/professorCRUD";
import { ProfessorClasses } from "../../../components/classTimesViewTable/SpecificClassTimeViewTables";

function ProfessorSelection(professorStates) {
  const professorCRUDFunctions = {
    createFunc: () => createProfessor(professorStates),
    readFunc: () => readProfessor(professorStates),
    updateFunc: () => updateProfessor(professorStates),
    deleteFunc: () => deleteProfessor(professorStates),
  };
  return (
    <div className="SelectionBar">
      <CRUDButtonsContainer {...professorCRUDFunctions} />
      <SelectProfessorItem {...professorStates} />
    </div>
  );
}

function BaseProfessorData(professorStates) {
  return (
    <div className="showBasicDataCard">
      <h3>INFORMAÇÕES DO PROFESSOR</h3>
      <table className="showBasicDataTable">
        {/* 
        <thead>
          <tr>
            <th>Chave</th>
            <th>Valor</th>
          </tr>
        </thead>
        */}
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
      <ProfessorClasses {...professorStates.professor} />
      {/* <ProfessorPreferences {...professorStates} /> */}
    </div>
  );
}

function Professors() {
  const defaultProfessors = sqlDataFromJson.professors ?? [];

  const [professors, setProfessors] = useState(defaultProfessors);
  const [professor, setProfessor] = useState(
    professors?.[2] ?? professors?.[0]
  );

  const professorStates = {
    professors,
    setProfessors,
    professor,
    setProfessor,
  };

  useEffect(() => {
    readProfessor(professorStates);
  }, []);

  return (
    <div className="CRUDContainComponents">
      <ProfessorSelection {...professorStates} />
      <ProfessorCard {...professorStates} />
    </div>
  );
}

function CRUDprofessors() {
  const defaultPageValue = options.constantValues.pageSelection.professors;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Professors />
    </div>
  );
}

export default CRUDprofessors;
