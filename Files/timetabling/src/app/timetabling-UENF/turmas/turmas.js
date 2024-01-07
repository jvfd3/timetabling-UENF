import React, { useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import {
  SelectDia,
  SelectDisciplina,
  SelectDuracao,
  SelectHoraTang,
  SelectProfessor,
  SelectSala,
  SelectAnoTurma,
  SelectSemestreTurma,
  TurmaItemSelection,
} from "../../../components/mySelects";
import "./turmas.css";
import {
  getFullHorarios,
  splittedToUnified2,
} from "../../../helpers/auxFunctions";
import {
  SmartCreateHora,
  SmartDeleteHora,
} from "../../../components/Buttons/Smart/Smart";

function Turmas() {
  let allTurmas = getFullHorarios();
  let unifiedHorarios = splittedToUnified2(allTurmas);
  const [turmas, setTurmas] = useState(unifiedHorarios);
  const [turma, setTurma] = useState(turmas[0]);

  let myTurmaStates = { turmas, setTurmas, turma, setTurma };

  function TurmaSelection(myTurmaStates) {
    return (
      <div
        className="SelectionBar"
        onWheel={(event) => {
          // let itemStates = [turmas, setTurma, turma];
          // scrollThroughTurmas(event, itemStates);
        }}
      >
        <TurmaItemSelection {...myTurmaStates} />
      </div>
    );
  }

  function DadosTurma({ turma, setTurma }) {
    return (
      <div className="showBasicDataCard">
        <h3>INFORMAÇÕES DA TURMA</h3>
        <table className="showBasicDataTable">
          <thead></thead>
          <tbody>
            <tr>
              <th>Ano/Semestre</th>
              <td>
                <div className="SelectAnoSemestre">
                  <SelectAnoTurma lTurma={turma} setLTurma={setTurma} />
                  <SelectSemestreTurma lTurma={turma} setLTurma={setTurma} />
                </div>
              </td>
            </tr>
            <tr>
              <th>Disciplina</th>
              <td>
                <SelectDisciplina lTurma={turma} setLTurma={setTurma} />
              </td>
            </tr>
            <tr>
              <th>Professor</th>
              <td>
                <SelectProfessor lTurma={turma} setLTurma={setTurma} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  function HorariosTurma({ turma, setTurma }) {
    let quantidadeHorarios = turma.horarios.length;

    function HorariosTable(turmaProps) {
      const { turma, setTurma } = turmaProps;
      return (
        <table className="showBasicDataTable">
          <thead>
            <tr>
              <th>
                <SmartCreateHora {...turmaProps} />
              </th>
              <th>Dia</th>
              <th>Hora de início</th>
              <th>Duração</th>
              <th>Sala</th>
            </tr>
          </thead>
          <tbody>
            {turma.horarios.map((horario, index) => {
              let smartDeleteProps = {
                turma: turma,
                setTurma: setTurma,
                horaIndex: index,
              };
              return (
                <tr key={`Linha Horário: ${horario.idHorario}-${index}`}>
                  <td>
                    <SmartDeleteHora {...smartDeleteProps} />
                  </td>
                  <td>
                    <SelectDia
                      lTurma={turma}
                      setLTurma={setTurma}
                      indexHorario={index}
                    />
                  </td>
                  <td>
                    <SelectHoraTang
                      lTurma={turma}
                      setLTurma={setTurma}
                      indexHorario={index}
                    />
                  </td>
                  <td>
                    <SelectDuracao
                      lTurma={turma}
                      setLTurma={setTurma}
                      indexHorario={index}
                    />
                  </td>
                  <td>
                    <SelectSala
                      lTurma={turma}
                      setLTurma={setTurma}
                      indexHorario={index}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }

    return (
      <div className="showBasicDataCard">
        <h3>
          {quantidadeHorarios > 0 ? "" : "Sem "}
          Horários
        </h3>
        {quantidadeHorarios > 0 ? (
          <HorariosTable turma={turma} setTurma={setTurma} />
        ) : (
          <SmartCreateHora turma={turma} setTurma={setTurma} />
        )}
      </div>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <TurmaSelection {...myTurmaStates} />
      <div className="infoCard">
        <DadosTurma {...myTurmaStates} />
        <HorariosTurma {...myTurmaStates} />
        {/* <Participants {...myTurmaStates} /> */}
      </div>
    </div>
  );
}

function CRUDclass() {
  let defaultPageValue = options.constantValues.pageSelection.turmas;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Turmas />
    </div>
  );
}

export default CRUDclass;
