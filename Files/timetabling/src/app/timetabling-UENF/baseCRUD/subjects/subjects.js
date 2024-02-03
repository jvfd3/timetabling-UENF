import React, { useEffect, useState } from "react";
import configInfo from "../../../../config/configInfo";
import CRUDPageSelection from "../../../../components/PageSelect";
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

const classNames = {
  selectionBar: "selectionBar",
  showBasicDataCard: "showBasicDataCard",
  showBasicDataTable: "showBasicDataTable",
  infoCard: "infoCard",
  CRUDContainComponents: "CRUDContainComponents",
  background: "background",
};
const baseInfoCard = {
  title: "INFORMAÇÕES DA DISCIPLINA",
  tableTitles: {
    code: "Código",
    name: "Nome",
    alias: "Apelido",
    expectedSemester: "Período Esperado",
    id: "ID",
  },
};

function SubjectSelection(subjectStates) {
  const subjectCRUDFunctions = {
    createFunc: () => createSubject(subjectStates),
    readFunc: () => readSubject(subjectStates),
    updateFunc: () => updateSubject(subjectStates),
    deleteFunc: () => deleteSubject(subjectStates),
  };

  return (
    <div className={classNames.selectionBar}>
      <CRUDButtonsContainer {...subjectCRUDFunctions} />
      <SelectSubjectItem {...subjectStates} />
    </div>
  );
}

function BaseInfoCard(subjectStates) {
  return (
    <div className={classNames.showBasicDataCard}>
      <h3>{baseInfoCard.title}</h3>
      <table className={classNames.showBasicDataTable}>
        <tbody>
          <tr>
            <th>{baseInfoCard.tableTitles.code}</th>
            <td>
              <TextInputSubjectCode {...subjectStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.tableTitles.name}</th>
            <td>
              <TextInputSubjectName {...subjectStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.tableTitles.alias}</th>
            <td>
              <TextInputSubjectAlias {...subjectStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.tableTitles.expectedSemester}</th>
            <td>
              <SelectSubjectExpectedSemester {...subjectStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.tableTitles.id}</th>
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
    <div className={classNames.infoCard}>
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
    <div className={classNames.CRUDContainComponents}>
      <SubjectSelection {...subjectStates} />
      <SubjectCard {...subjectStates} />
    </div>
  );
}

function CRUDSubjects() {
  const defaultPageValue = configInfo.pageSelection.subjects;
  return (
    <div className={classNames.background}>
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Subjects />
    </div>
  );
}

export default CRUDSubjects;
