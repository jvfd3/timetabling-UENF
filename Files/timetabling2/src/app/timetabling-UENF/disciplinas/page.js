"use client";
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
import Select from "react-select";
import options from "@/helpers/options";
import {
  allLocalJsonData,
  sqlDataFromJson,
} from "@/helpers/localDB/dataFromJSON";

function Disciplinas() {
  let disciplinas_RS = allLocalJsonData.static.infoDisciplinasCC;

  const [disciplinas, setDisciplinas] = useState(disciplinas_RS);
  const [disciplina, setDisciplina] = useState(disciplinas[36]);

  function DisciplinasSelection() {
    function scrollThroughDisciplinas(event) {
      let diretion = event.deltaY > 0 ? "down" : "up";
      let index = disciplinas.findIndex(
        (oneOfDisciplinas) => oneOfDisciplinas.codigo === disciplina.codigo
      );
      index += diretion === "up" ? -1 : 1;
      index = index < 0 ? disciplinas.length - 1 : index;
      index = index >= disciplinas.length ? 0 : index;
      let newOption = disciplinas[index];
      setDisciplina(newOption);
    }
    return (
      <div className="SelectionBar" onWheel={scrollThroughDisciplinas}>
        <Select
          className="itemSelectionBar"
          placeholder={"Disciplina"}
          value={disciplina}
          options={disciplinas}
          onChange={setDisciplina}
          // formatOptionLabel={props.formatOptionLabel}
          isMulti={false}
          getOptionValue={(option) => option.codigo}
          getOptionLabel={(option) => option.nome}
          formatOptionLabel={({ periodo, codigo, nome }) =>
            `(${periodo}) ${codigo}: ${nome}`
          }
        />
      </div>
    );
  }

  function DisciplinasCard() {
    function InformacoesBaseDaDisciplina() {
      function getCorrectPeriodo(periodo) {
        let correctPeriodo = options.constantValues.expectedSemester.find(
          (option) => option.value === periodo
        );
        return correctPeriodo;
      }

      function updatingSelect(newValue, individual, setIndividual) {
        console.log("Updating Select");
        console.log("individual: ", individual);

        let myIndividual = { ...individual };
        myIndividual["periodo"] = newValue.value;
        setIndividual(myIndividual);

        console.log("newValue: ", newValue);
        console.log("individual: ", individual);
      }

      return (
        <div className="showBasicDataCard">
          <h3>INFORMAÇÕES DA DISCIPLINA</h3>
          <table className="showBasicDataTable">
            <thead></thead>
            <tbody>
              <tr>
                <th>Código</th>
                <td>
                  {disciplina.codigo}
                  {/* <SelectDisciplinasCodigoC
                    disciplina={disciplina}
                    disciplinas={disciplinas}
                    setDisciplina={setDisciplina}
                    setDisciplinas={setDisciplinas}
                  /> */}
                </td>
              </tr>
              <tr>
                <th>Nome</th>
                <td>
                  {disciplina.nome}
                  {/* <SelectDisciplinasDisciplinaC
                    disciplina={disciplina}
                    disciplinas={disciplinas}
                    setDisciplina={setDisciplina}
                    setDisciplinas={setDisciplinas}
                  /> */}
                </td>
              </tr>
              <tr>
                <th>Período Esperado</th>
                <td>
                  <Select
                    className="SelectList"
                    newPlaceHolder="Período Esperado"
                    value={getCorrectPeriodo(disciplina.periodo)}
                    options={options.constantValues.expectedSemester}
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

    return (
      <div className="infoCard">
        <InformacoesBaseDaDisciplina />
        <div className="showBasicDataCard">
          <h3>Requisitos</h3>
          {/* <Select
            className="manyDisciplinasMultiSelect"
            placeholder={"Requisitos da disciplina"}
            options={disciplinas} // deveriam ser todas as disciplinas
            value={disciplina.requisitos}
            onChange={(option) => {
              let myNewValue = { ...disciplina };
              myNewValue["requisitos"] = option;
              setDisciplina(myNewValue);
            }}
            isMulti={true}
            isClearable={true}
            isSearchable={true}
            getOptionValue={(option) => option.codigo}
            getOptionLabel={(option) => option.nome}
            formatOptionLabel={({ codigo, nome }) => `${codigo}: ${nome}`}
          /> */}
        </div>
      </div>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <DisciplinasSelection />
      <DisciplinasCard />
    </div>
  );
}

function CRUDDisciplinas() {
  return (
    <div className="background">
      <Disciplinas />
    </div>
  );
}

export default CRUDDisciplinas;
