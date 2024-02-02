import React, { useEffect, useState } from "react";
import options from "../../../../DB/local/options";
import CRUDPageSelection from "../../../../components/PageSelect";
import { sqlDataFromJson } from "../../../../DB/local/dataFromJSON";
import { ProfessorClasses } from "../../../../components/classTimesViewTable/SpecificClassTimeViewTables";
import { CRUDButtonsContainer } from "../../../../components/CRUDButtons";
// import { scrollThroughProfessores } from "../functions/firulas/minhasFirulas";
import {
  SelectProfessorLab,
  SelectProfessorItem,
  SelectProfessorCourse,
} from "../../../../components/mySelects";
import {
  TextInputProfessorId,
  TextInputProfessorName,
  TextinputProfessorAlias,
} from "../../../../components/MyTextFields";
import {
  createProfessor,
  readProfessor,
  updateProfessor,
  deleteProfessor,
} from "../../../../helpers/CRUDFunctions/professorCRUD";

const classNames = {
  selectionBar: "SelectionBar",
  showBasicDataCard: "showBasicDataCard",
  showBasicDataTable: "showBasicDataTable",
  infoCard: "infoCard",
  CRUDContainComponents: "CRUDContainComponents",
  background: "background",
};

function ProfessorSelection(professorStates) {
  const professorCRUDFunctions = {
    createFunc: () => createProfessor(professorStates),
    readFunc: () => readProfessor(professorStates),
    updateFunc: () => updateProfessor(professorStates),
    deleteFunc: () => deleteProfessor(professorStates),
  };
  return (
    <div className={classNames.selectionBar}>
      <CRUDButtonsContainer {...professorCRUDFunctions} />
      <SelectProfessorItem {...professorStates} />
    </div>
  );
}

function BaseProfessorData(professorStates) {
  const professorTitle = "INFORMAÇÕES DO PROFESSOR";
  const professorInfoHeader = {
    lab: "laboratório",
    course: "curso",
    name: "nome",
    alias: "apelido",
    id: "ID",
  };
  return (
    <div className={classNames.showBasicDataCard}>
      <h3>{professorTitle}</h3>
      <table className={classNames.showBasicDataTable}>
        <tbody>
          <tr>
            <th>{professorInfoHeader.lab}</th>
            <td>
              <SelectProfessorLab {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>{professorInfoHeader.course}</th>
            <td>
              <SelectProfessorCourse {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>{professorInfoHeader.name}</th>
            <td>
              <TextInputProfessorName {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>{professorInfoHeader.alias}</th>
            <td>
              <TextinputProfessorAlias {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>{professorInfoHeader.id}</th>
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
    <div className={classNames.infoCard}>
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
    professors?.[options.config.defaultIndexes.professor] ?? professors?.[0]
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
    <div className={classNames.CRUDContainComponents}>
      <ProfessorSelection {...professorStates} />
      <ProfessorCard {...professorStates} />
    </div>
  );
}

function CRUDprofessors() {
  const defaultPageValue = options.constantValues.pageSelection.professors;
  return (
    <div className={classNames.background}>
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Professors />
    </div>
  );
}

export default CRUDprofessors;
