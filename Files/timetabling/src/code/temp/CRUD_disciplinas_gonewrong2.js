/* O que esta página deve fazer?

- Fazer uma visualização bonitinha para os selects:
  - Select de Código: Disciplina deve estar em cima na esquerda
  - Select de Período: à esquerda do Select de código
  - Select de professores deve estar abaixo do Select de Códigos.
  - Select de requisitos deve estar abaixo do Select de professores.
- Devo obter as informações das disciplinas do JSONBIN
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
import React, { useState } from "react";
import "../CSS/CRUD_disciplinas.css";
import "../CSS/defaultStyle.css";
import options from "./options";
import CRUDPageSelection from "../components/PageSelect";
import MySelectList from "../components/MySelectList";
// import data from "../temp/dataFromDB";
// import {
//   getNomesDasDisciplinas,
//   disciplinas_RS,
// } from "../functions/getListaDisciplinas";
// import { readData } from "../functions/CRUD_JSONBIN";

// let DBdisciplinas = await readData(options.JBVars.bins.infoDisciplinasCC);

function DisciplinaCard() {
  // const [disciplinas, setDisciplinas] = useState(RSdisciplinas);
  // const [disciplina, setDisciplina] = useState(disciplinas[2]);

  return (
    <div className="CRUD-subjects">
      <MySelectList
        isLabeled={true}
        newPlaceHolder="Disciplina"
        options={options.subjectCodeName}
        isMulti={false}
      />
      {/* <MySelectList
        newPlaceHolder="Período Esperado"
        options={options.expectedSemester}
      />
      <MySelectList
        isLabeled={true}
        newPlaceHolder="Requisitos de Disciplina"
        options={options.subjectCodeName}
        isMulti={true}
      />
      <MySelectList
        newPlaceHolder="YYY"
        options={options.professors}
        isMulti={true}
      /> */}
    </div>
  );
}

function CRUDDisciplinas() {
  return (
    <div className="background">
      <div className="CRUD-contain-components">
        <CRUDPageSelection defaultValue={options.CRUD.crud_disciplinas} />
        <DisciplinaCard />
      </div>
    </div>
  );
}

export default CRUDDisciplinas;
