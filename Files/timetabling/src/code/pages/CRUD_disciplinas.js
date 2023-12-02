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
import React, { useState } from "react";
import "../CSS/CRUD_disciplinas.css";
import "../CSS/defaultStyle.css";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";
import Select from "react-select";
import { readData } from "../functions/CRUD_JSONBIN";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import { getNomesDasDisciplinas } from "../functions/getListaDisciplinas";

// let disciplinasFromJB = await readData(options.JBVars.bins.infoDisciplinasCC);
// let disciplinas_RS = disciplinasFromJB.map(disciplinaDBtoRS);
let DBdisciplinas = allLocalJsonData.static.infoDisciplinasCC;
let disciplinas_RS = DBdisciplinas.map((disciplina) => {
  return {
    codigo: disciplina.codigo,
    nome: disciplina.nome,
    periodo: disciplina.periodo,
    requisitos: getNomesDasDisciplinas(disciplina.codigo_requisitos),
  };
});

function updatingSelect(
  newValue,
  coletivo,
  setColetivo,
  individual,
  setIndividual
) {
  console.log("Updating Select");
  console.log("individual: ", individual);

  let myIndividual = { ...individual };
  myIndividual["periodo"] = newValue.value;
  setIndividual(myIndividual);

  console.log("newValue: ", newValue);
  console.log("individual: ", individual);
}

function Disciplinas() {
  const [disciplinas, setDisciplinas] = useState(disciplinas_RS);
  const [disciplina, setDisciplina] = useState(disciplinas[36]);

  function getCorrectPeriodo(periodo) {
    let correctPeriodo = options.expectedSemester.find(
      (option) => option.value === periodo
    );
    return correctPeriodo;
  }

  function InformacoesBaseDaDisciplina() {
    return (
      <div className="showBasicDataCard">
        <h3>Informações da disciplina</h3>
        <table className="showBasicDataTable">
          <thead></thead>
          <tbody>
            <tr>
              <th>Código</th>
              <td>{disciplina.codigo}</td>
            </tr>
            <tr>
              <th>Nome</th>
              <td>{disciplina.nome}</td>
            </tr>
            <tr>
              <th>Período Esperado</th>
              <td>
                <Select
                  newPlaceHolder="Período Esperado"
                  value={getCorrectPeriodo(disciplina.periodo)}
                  options={options.expectedSemester}
                  onChange={(newValue) => {
                    updatingSelect(
                      newValue,
                      disciplinas,
                      setDisciplinas,
                      disciplina,
                      setDisciplina
                    );
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // console.log("Disciplina: ", disciplina);
  return (
    <div>
      <Select
        placeholder={"Disciplina"}
        value={disciplina}
        options={disciplinas}
        onChange={setDisciplina}
        // formatOptionLabel={props.formatOptionLabel}
        isMulti={false}
        className="SelectList-disciplinas"
        getOptionValue={(option) => option.codigo}
        getOptionLabel={(option) => option.nome}
        formatOptionLabel={({ periodo, codigo, nome }) =>
          `(${periodo}) ${codigo}: ${nome}`
        }
      />
      <InformacoesBaseDaDisciplina />

      <table>
        <thead>
          <tr>
            <th>Requisitos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Select
                placeholder={"Requisitos"}
                options={disciplinas} // deveriam ser todas as disciplinas
                value={disciplina.requisitos}
                onChange={(option) => {
                  let myNewValue = { ...disciplina };
                  myNewValue["requisitos"] = option;
                  setDisciplina(myNewValue);
                }}
                className="SelectDisciplinas"
                isMulti={true}
                isClearable={true}
                isSearchable={true}
                getOptionValue={(option) => option.codigo}
                getOptionLabel={(option) => option.nome}
                formatOptionLabel={({ codigo, nome }) => `${codigo}: ${nome}`}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function CRUDDisciplinas() {
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={options.CRUD.crud_disciplinas} />
      <div className="CRUDContainComponents">
        <Disciplinas />
      </div>
    </div>
  );
}

export default CRUDDisciplinas;
