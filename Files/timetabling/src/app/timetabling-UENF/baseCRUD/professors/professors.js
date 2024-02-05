import React, { useEffect, useState } from "react";
import text from "../../../../config/frontText";
import myStyles from "../../../../config/myStyles";
import configInfo from "../../../../config/configInfo";
import { CRUDButtonsContainer } from "../../../../components/CRUDButtons";
import { ProfessorClasses } from "../../../../components/classTimesViewTable/SpecificClassTimeViewTables";
import { sqlDataFromJson } from "../../../../DB/local/dataFromJSON";
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

const defaultClassNames = myStyles.classNames.default;
const pageTexts = text.page.professors;

function ProfessorSelection(professorStates) {
  const professorCRUDFunctions = {
    createFunc: () => createProfessor(professorStates),
    readFunc: () => readProfessor(professorStates),
    updateFunc: () => updateProfessor(professorStates),
    deleteFunc: () => deleteProfessor(professorStates),
  };
  return (
    <div className={defaultClassNames.containerItemSelection}>
      <CRUDButtonsContainer {...professorCRUDFunctions} />
      <SelectProfessorItem {...professorStates} />
    </div>
  );
}

function BaseInfoCard(professorStates) {
  return (
    <div className={defaultClassNames.containerCardBaseInfo}>
      <h3>{pageTexts.title}</h3>
      <table className={defaultClassNames.componentTable}>
        <tbody>
          <tr>
            <th>{pageTexts.tableTitles.lab}</th>
            <td>
              <SelectProfessorLab {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.course}</th>
            <td>
              <SelectProfessorCourse {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.name}</th>
            <td>
              <TextInputProfessorName {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.alias}</th>
            <td>
              <TextinputProfessorAlias {...professorStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.id}</th>
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
    <div className={defaultClassNames.containerCardsHolder}>
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
    <div className={defaultClassNames.containerCards}>
      <ProfessorSelection {...professorStates} />
      <ProfessorCard {...professorStates} />
    </div>
  );
}

export default Professors;
