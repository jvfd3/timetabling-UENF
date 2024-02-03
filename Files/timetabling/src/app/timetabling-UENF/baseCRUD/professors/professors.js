import React, { useEffect, useState } from "react";
import configInfo from "../../../../config/configInfo";
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
  background: "background",
  CRUDContainComponents: "CRUDContainComponents",
  selectionBar: "selectionBar",
  infoCard: "infoCard",
  showBasicDataCard: "showBasicDataCard",
  showBasicDataTable: "showBasicDataTable",
};
const baseInfoCard = {
  title: "INFORMAÇÕES DO PROFESSOR",
  tableTitles: {
    lab: "laboratório",
    course: "curso",
    name: "nome",
    alias: "apelido",
    id: "ID",
  },
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

function BaseInfoCard(professorStates) {
  return (
    <div className={classNames.showBasicDataCard}>
      <h3>{baseInfoCard.title}</h3>
      <table className={classNames.showBasicDataTable}>
        <tbody>
          <tr>
            <th>{baseInfoCard.lab}</th>
            <td>
              <SelectProfessorLab {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.course}</th>
            <td>
              <SelectProfessorCourse {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.name}</th>
            <td>
              <TextInputProfessorName {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.alias}</th>
            <td>
              <TextinputProfessorAlias {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.id}</th>
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
      <BaseInfoCard {...professorStates} />
      <ProfessorClasses {...professorStates.professor} />
      {/* <ProfessorPreferences {...professorStates} /> */}
    </div>
  );
}

function Professors() {
  const defaultProfessors = sqlDataFromJson.professors ?? [];

  const [professors, setProfessors] = useState(defaultProfessors);
  const [professor, setProfessor] = useState(
    professors?.[configInfo.defaultIndexes.professor] ?? professors?.[0]
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
  const defaultPageValue = configInfo.pageSelection.professors;
  return (
    <div className={classNames.background}>
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Professors />
    </div>
  );
}

export default CRUDprofessors;
