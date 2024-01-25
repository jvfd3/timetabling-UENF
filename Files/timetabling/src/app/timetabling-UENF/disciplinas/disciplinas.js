import "./disciplinas.css";
import React, { useEffect, useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { sqlDataFromJson } from "../../../DB/local/dataFromJSON";
import {
  SelectSubjectItem,
  SelectSubjectExpectedSemester,
} from "../../../components/mySelects";
// import { scrollThroughDisciplinas } from "../functions/firulas/minhasFirulas";
import {
  TextInputSubjectCode,
  TextInputSubjectName,
  TextInputSubjectAlias,
  TextInputSubjectId,
} from "../../../components/MyTextFields";
import { CRUDButtonsContainer } from "../../../components/CRUDButtons";
import {
  createSubject,
  readSubject,
  updateSubject,
  deleteSubject,
} from "../../../helpers/CRUDFunctions/subjectCRUD";

function SubjectSelection(mySubjectsStates) {
  const subjectCRUDFunctions = {
    createFunc: () => createSubject(mySubjectsStates),
    readFunc: () => readSubject(mySubjectsStates),
    updateFunc: () => updateSubject(mySubjectsStates),
    deleteFunc: () => deleteSubject(mySubjectsStates),
  };

  return (
    <div className="SelectionBar">
      <CRUDButtonsContainer {...subjectCRUDFunctions} />
      <SelectSubjectItem {...mySubjectsStates} />
    </div>
  );
}

function SubjectBaseInfo(mySubjectsStates) {
  return (
    <div className="showBasicDataCard">
      <h3>INFORMAÇÕES DA DISCIPLINA</h3>
      <table className="showBasicDataTable">
        <thead>
          <tr>
            <th>Chave</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Código</th>
            <td>
              <TextInputSubjectCode {...mySubjectsStates} />
            </td>
          </tr>
          <tr>
            <th>Nome</th>
            <td>
              <TextInputSubjectName {...mySubjectsStates} />
            </td>
          </tr>
          <tr>
            <th>Apelido</th>
            <td>
              <TextInputSubjectAlias {...mySubjectsStates} />
            </td>
          </tr>
          <tr>
            <th>Período Esperado</th>
            <td>
              <SelectSubjectExpectedSemester {...mySubjectsStates} />
            </td>
          </tr>
          <tr>
            <th>ID</th>
            <td>
              <TextInputSubjectId {...mySubjectsStates} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function SubjectCard(mySubjectsStates) {
  return (
    <div className="infoCard">
      <SubjectBaseInfo {...mySubjectsStates} />
      {/* <SubjectClasses {...myDisciplinasStates} /> */}
      {/* <SubjectRequirements {...myDisciplinasStates} /> */}
      {/* <SubjectDemandees {...myDisciplinasStates} /> */}
    </div>
  );
}

function Subjects() {
  const [subjects, setSubjects] = useState(sqlDataFromJson.subjects);
  const [subject, setSubject] = useState(subjects[36]);

  let mySubjectsStates = { subjects, setSubjects, subject, setSubject };

  useEffect(() => {}), [subject.apelido];

  return (
    <div className="CRUDContainComponents">
      <SubjectSelection {...mySubjectsStates} />
      <SubjectCard {...mySubjectsStates} />
    </div>
  );
}

function CRUDSubjects() {
  const defaultPageValue = options.constantValues.pageSelection.subjects;
  return (
    <div className="background">
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
