import React, { useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import {
  getApelidoDisciplina,
  getApelidoProfessor,
  getFullHorarios,
  getPeriodoEsperado,
  getTurmasDaHora,
  getTurmasDoAnoSemestre,
  getTurmasDoDia,
} from "../../../helpers/auxFunctions";
import { SelectAnoSemestre } from "../../../components/mySelects";
import "./ccTable.css";

function VisualizacaoCC() {
  let semestres = options.constantValues.semesters;
  let anos = options.constantValues.years;
  let dias = options.constantValues.days;
  let horasTang = options.constantValues.hoursTang;
  const [ano, setAno] = useState(anos[10]);
  const [semestre, setSemestre] = useState(semestres[0]);

  let myTimeStates = {
    ano,
    setAno,
    semestre,
    setSemestre,
  };

  let turmas = getFullHorarios();
  let TurmasDoSemestre = getTurmasDoAnoSemestre(
    turmas,
    ano.value,
    semestre.value
  );

  function TabelaCC() {
    function Header() {
      function TopLeft() {
        return <th className="TopLeftCorner"></th>;
      }

      function TopRow() {
        let dias = options.constantValues.days.map((dia) => {
          return <th className="DiasHeader">{dia.label}</th>;
        });

        return [dias];
      }
      return (
        <thead>
          <tr className="HeaderRow">
            <TopLeft />
            <TopRow />
          </tr>
        </thead>
      );
    }

    function Body() {
      function Linha({ hora }) {
        let turmasDaHora = getTurmasDaHora(TurmasDoSemestre, hora);
        let colunasDosDias = dias.map((dia) => {
          let turmasDoDia = getTurmasDoDia(turmasDaHora, dia.value);

          function CellContent({ turmas }) {
            let listaDeTurmas = turmas.map((turma) => {
              return (
                <div className="eachClassInCell">
                  {turma.disciplina.periodo} - {turma.disciplina.apelido} - (
                  {turma.professor.apelido} / {turma.sala.bloco} -{" "}
                  {turma.sala.numero})
                </div>
              );
            });

            return listaDeTurmas;
          }

          return (
            <td className="ContentCell">
              <CellContent turmas={turmasDoDia} />
            </td>
          );
        });

        return (
          <tr key={`Linha: ${hora}`}>
            <td className="HorariosCol">{hora}</td>
            {colunasDosDias}
          </tr>
        );
      }

      return (
        <tbody>
          {horasTang.map((hora, rowIndex) => (
            <Linha
              key={`${rowIndex}-${JSON.stringify(hora)}`}
              hora={hora.hora}
            />
          ))}
        </tbody>
      );
    }

    return (
      <table className="TabelaCC">
        <Header />
        <Body />
      </table>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <div className="infoCard">
        <SelectAnoSemestre {...myTimeStates} />
        <TabelaCC />
      </div>
    </div>
  );
}

function CCTable() {
  let defaultPage = options.constantValues.pageSelection.CCTable;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPage} />
      <VisualizacaoCC />
    </div>
  );
}

export default CCTable;

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
