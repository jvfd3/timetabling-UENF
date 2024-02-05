import React, { useEffect, useState } from "react";
import text from "../../../../config/frontText";
import myStyles from "../../../../config/myStyles";
import configInfo from "../../../../config/configInfo";
import { SubjectClasses } from "../../../../components/classTimesViewTable/SpecificClassTimeViewTables";
import { sqlDataFromJson } from "../../../../DB/local/dataFromJSON";
import { CRUDButtonsContainer } from "../../../../components/CRUDButtons";
// import { scrollThroughDisciplinas } from "../functions/firulas/minhasFirulas";
import {
  SelectSubjectItem,
  SelectSubjectExpectedSemester,
} from "../../../../components/mySelects";
import {
  TextInputSubjectId,
  TextInputSubjectCode,
  TextInputSubjectName,
  TextInputSubjectAlias,
} from "../../../../components/MyTextFields";
import {
  createSubject,
  readSubject,
  updateSubject,
  deleteSubject,
} from "../../../../helpers/CRUDFunctions/subjectCRUD";

const defaultClassNames = myStyles.classNames.default;
const pageTexts = text.page.subjects;

function SubjectSelection(subjectStates) {
  const subjectCRUDFunctions = {
    createFunc: () => createSubject(subjectStates),
    readFunc: () => readSubject(subjectStates),
    updateFunc: () => updateSubject(subjectStates),
    deleteFunc: () => deleteSubject(subjectStates),
  };

  return (
    <div className={defaultClassNames.containerItemSelection}>
      <CRUDButtonsContainer {...subjectCRUDFunctions} />
      <SelectSubjectItem {...subjectStates} />
    </div>
  );
}

function BaseInfoCard(subjectStates) {
  return (
    <div className={defaultClassNames.containerCardBaseInfo}>
      <h3>{pageTexts.title}</h3>
      <table className={defaultClassNames.componentTable}>
        <tbody>
          <tr>
            <th>{pageTexts.tableTitles.code}</th>
            <td>
              <TextInputSubjectCode {...subjectStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.name}</th>
            <td>
              <TextInputSubjectName {...subjectStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.alias}</th>
            <td>
              <TextInputSubjectAlias {...subjectStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.expectedSemester}</th>
            <td>
              <SelectSubjectExpectedSemester {...subjectStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.id}</th>
            <td>
              <TextInputSubjectId {...subjectStates} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function SubjectCard(subjectStates) {
  return (
    <div className={defaultClassNames.containerCardsHolder}>
      <BaseInfoCard {...subjectStates} />
      <SubjectClasses {...subjectStates?.subject} />
      {/* <SubjectRequirements {...myDisciplinasStates} /> */}
      {/* <SubjectDemandees {...myDisciplinasStates} /> */}
    </div>
  );
}

function Subjects() {
  const defaultSubjects = sqlDataFromJson.subjects ?? [];

  const [subjects, setSubjects] = useState(defaultSubjects);
  const [subject, setSubject] = useState(
    subjects?.[configInfo.defaultIndexes.subject] ?? subjects?.[0]
  );

  const subjectStates = { subjects, setSubjects, subject, setSubject };

  useEffect(() => {
    readSubject(subjectStates);
  }, []);

  return (
    <div className={defaultClassNames.containerCards}>
      <SubjectSelection {...subjectStates} />
      <SubjectCard {...subjectStates} />
    </div>
  );
}

export default Subjects;
