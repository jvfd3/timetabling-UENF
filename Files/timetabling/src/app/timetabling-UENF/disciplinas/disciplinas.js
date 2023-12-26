import React, { useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { allLocalJsonData } from "../../../DB/local/dataFromJSON";
import "./disciplinas.css";
import {
  DisciplinasSelection,
  SelectPeriodoEsperado,
} from "../../../components/mySelects";
// import { scrollThroughDisciplinas } from "../functions/firulas/minhasFirulas";

function Disciplinas() {
  // let disciplinasFromJB = await readData(options.JBVars.bins.infoDisciplinasCC);
  // let disciplinas_RS = disciplinasFromJB.map(disciplinaDBtoRS);
  // let disciplinas_RS = allLocalJsonData.static.infoDisciplinasCC;
  let disciplinas_RS = allLocalJsonData.SQL.disciplinas;

  const [disciplinas, setDisciplinas] = useState(disciplinas_RS);
  const [disciplina, setDisciplina] = useState(disciplinas[36]);

  let myDisciplinasStates = {
    disciplinas,
    setDisciplinas,
    disciplina,
    setDisciplina,
  };

  function DisciplinasCard() {
    function InformacoesBaseDaDisciplina() {
      return (
        <div className="showBasicDataCard">
          <h3>INFORMAÇÕES DA DISCIPLINA</h3>
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
                  <SelectPeriodoEsperado
                    myDisciplinasStates={myDisciplinasStates}
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
        {/* <div className="showBasicDataCard">
          <table className="showBasicDataTable">
            <thead>
              <tr>
                <th>Requisitos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Select
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
                    formatOptionLabel={({ codigo, nome }) =>
                      `${codigo}: ${nome}`
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <DisciplinasSelection
        disciplina={disciplina}
        disciplinas={disciplinas}
        setDisciplina={setDisciplina}
      />
      <DisciplinasCard />
    </div>
  );
}

function CRUDDisciplinas() {
  return (
    <div className="background">
      <CRUDPageSelection
        defaultValue={options.constantValues.pageSelection.disciplinas}
      />
      <Disciplinas />
    </div>
  );
}

export default CRUDDisciplinas;

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
