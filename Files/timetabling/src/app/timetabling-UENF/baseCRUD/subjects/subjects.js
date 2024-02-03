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
      <h3>INFORMAÇÕES DA DISCIPLINA</h3>
    <div className={classNames.showBasicDataCard}>
      <table className={classNames.showBasicDataTable}>
        <tbody>
          <tr>
            <th>Código</th>
            <td>
              <TextInputSubjectCode {...subjectStates} />
            </td>
          </tr>
          <tr>
            <th>Nome</th>
            <td>
              <TextInputSubjectName {...subjectStates} />
            </td>
          </tr>
          <tr>
            <th>Apelido</th>
            <td>
              <TextInputSubjectAlias {...subjectStates} />
            </td>
          </tr>
          <tr>
            <th>Período Esperado</th>
            <td>
              <SelectSubjectExpectedSemester {...subjectStates} />
            </td>
          </tr>
          <tr>
            <th>ID</th>
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

/* O que esta página deve fazer?

- Fazer uma visualização bonitinha para os selects:
  - Select de Código: Disciplina deve estar em cima na esquerda
  - Select de Período: à esquerda do Select de código
  - Select de professores deve estar abaixo do Select de Códigos.
  - Select de requisitos deve estar abaixo do Select de professores.
- [x] Devo obter as informações das disciplinas do JSONBIN
- Transformar as informações para que cada nome de disciplina esteja na key "label" e o código na key "value"
- devo converter a lista de codigos de requisitos para uma lista de dicionários com a estrutura {label: "nome", value: "codigo"}
  - essa lista deve ser definida como value do Select de requisitos
- a seleção de disciplinas é a seleção principal, seu valor base deve ser a disciplina monografia
- ao alterar a disciplina, deve-se alterar todos os outros selects.
- ao alterar cada um dos selects, deve-se alterar o valor do estado da página.
- para cada disciplina, deve-se vasculhar quais são os professores que o têm na lista de disciplinas que ministram.
  - Os professores encontrados devem se tornar uma lista de dicionários com a estrutura {value = "nome do professor", label = "laboratório"}
  - esse valor deve estar definido como value no Select de Docentes
- ao alterar cada um dos selects, a alteração deve ser enviada ao JSONBIN. - DO LATER
*/
