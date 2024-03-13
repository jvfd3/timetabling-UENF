import React, { useEffect, useState } from "react";
import text from "../../../../config/frontText";
import myStyles from "../../../../config/myStyles";
import sqlDataFromJson from "../../../../DB/dataFromJSON";
import { SubjectClasses } from "../../../../components/classTimesViewTable/SpecificClassTimeViewTables";
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
import { sortSubjects } from "../../../../components/Sorts/sortingFunctions";
import NoSelectedObject from "../../../../components/Dumb/NoSelectedObject";

const defaultClassNames = myStyles.classNames.default;
const pageTexts = text.page.subjects;

function SubjectSelection(subjectStates) {
  // console.log("subjectStates", subjectStates);
  const CRUDSubjects = {
    ...subjectStates,
    subjects: sortSubjects(subjectStates?.subjects),
  };

  const subjectCRUDFunctions = {
    createFunc: () => createSubject(CRUDSubjects),
    readFunc: () => readSubject(CRUDSubjects),
    updateFunc: () => updateSubject(CRUDSubjects),
    deleteFunc: () => deleteSubject(CRUDSubjects),
  };

  return (
    <div className={defaultClassNames.containerItemSelection}>
      <CRUDButtonsContainer {...subjectCRUDFunctions} />
      <SelectSubjectItem {...CRUDSubjects} />
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
  const [subject, setSubject] = useState(null);

  const subjectStates = { subjects, setSubjects, subject, setSubject };
  const noSubject = { title: pageTexts.noSelectedObject };

  useEffect(() => {
    readSubject(subjectStates);
  }, []);

  return (
    <div className={defaultClassNames.containerCards}>
      <SubjectSelection {...subjectStates} />
      {subject ? (
        <SubjectCard {...subjectStates} />
      ) : (
        <NoSelectedObject {...noSubject} />
      )}
    </div>
  );
}

export default Subjects;
