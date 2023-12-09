import "../CSS/CRUD_turmas.css";
import "../CSS/defaultStyle.css";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";
import React, { useState, useEffect } from "react";

import { allLocalJsonData } from "../../DB/dataFromJSON";
import {
  SelectDisciplina,
  SelectProfessor,
  SelectSala,
  SelectDia,
  SelectHoraTang,
  SelectDuracao,
} from "../components/mySelects";
// import AsyncSelect from "react-select/async";
// import { readData } from "../functions/CRUD_JSONBIN";

function Turmas() {
  let allTurmas = allLocalJsonData.dynamic.turmas;
  const [turmas, setTurmas] = useState(allTurmas);
  const [turma, setTurma] = useState(turmas[0]);

  function updateTurmas(newTurmaValue) {
    let newTurmas = turmas.map((turma, i) =>
      turma.id === newTurmaValue.id ? newTurmaValue : turmas[i]
    );
    setTurmas(newTurmas);
  }

  useEffect(() => {
    // let message = "It seems that 'turma' have changed, so I will update everything for ya 🫡"
    // console.log(message);
    updateTurmas(turma);
  }, [turma]);

  function TurmasCard(props) {
    function TurmasTable() {
      return (
        <table className="showBasicDataTable">
          <thead>
            <tr>
              <th>Código - Nome</th>
              <th>Professor</th>
              <th>Demanda Estimada</th>
              <th>Horarios</th>
            </tr>
          </thead>
          <tbody>
            {turmas.map((turma) => {
              let horario1 = turma.horarios[0];
              let horario2 = turma.horarios[1];
              return (
                <tr
                  key={`${turma.id}-${turma.disciplina.codigo}-${turma.professor}`}
                >
                  <td>
                    <SelectDisciplina dTurma={turma} setDTurma={setTurma} />
                  </td>
                  <td>
                    <SelectProfessor pTurma={turma} setPTurma={setTurma} />
                  </td>
                  <td>
                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="0"
                      defaultValue={turma.demandaEstimada}
                      // value={turma.demandaEstimada}
                      max="999"
                      style={{ width: "50px" }}
                    ></input>
                  </td>
                  <td>
                    <table>
                      <thead>
                        <tr key={turma.id * 100}>
                          <th>Sala</th>
                          <th>Dia</th>
                          <th>Hora Início</th>
                          <th>Duração</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          key={`${turma.id}-${horario1.sala}-${horario1.dia}-${horario1.horaInicio}`}
                        >
                          <td>
                            <SelectSala
                              sTurma={turma}
                              setSTurma={setTurma}
                              indexHorario={1}
                            />
                          </td>
                          <td>
                            <SelectDia
                              lTurma={turma}
                              setLTurma={setTurma}
                              indexHorario={1}
                            />
                          </td>
                          <td>
                            <SelectHoraTang
                              lTurma={turma}
                              setLTurma={setTurma}
                              indexHorario={1}
                            />
                          </td>
                          <td>
                            <SelectDuracao
                              lTurma={turma}
                              setLTurma={setTurma}
                              indexHorario={1}
                            />
                          </td>
                        </tr>
                        <tr
                          key={`${turma.id}-${horario2.sala}-${horario2.dia}-${horario2.horaInicio}`}
                        >
                          <td>
                            <SelectSala
                              sTurma={turma}
                              setSTurma={setTurma}
                              indexHorario={2}
                            />
                          </td>
                          <td>
                            <SelectDia
                              lTurma={turma}
                              setLTurma={setTurma}
                              indexHorario={2}
                            />
                          </td>
                          <td>
                            <SelectHoraTang
                              lTurma={turma}
                              setLTurma={setTurma}
                              indexHorario={2}
                            />
                          </td>
                          <td>
                            <SelectDuracao
                              lTurma={turma}
                              setLTurma={setTurma}
                              indexHorario={2}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    return (
      <div className="infoCard">
        <TurmasTable turmas={turmas} />
      </div>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <TurmasCard turma={turma} setTurma={setTurma} />
    </div>
  );
}

function CRUDclass() {
  return (
    <div className="background">
      <CRUDPageSelection
        defaultValue={options.constantValues.pageSelection.multiTurmas}
      />
      <Turmas />
    </div>
  );
}

export default CRUDclass;
