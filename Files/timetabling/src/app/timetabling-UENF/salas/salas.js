import { useState } from "react";
import Select from "react-select";
// import assets from "../../assets/imagesImport";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { allLocalJsonData } from "../../../DB/local/dataFromJSON";
import "./salas.css";
import { SalaItemSelection } from "../../../components/mySelects";
import { appendInfoFromTurmasUsingHorarios } from "../../../helpers/auxFunctions";

function Salas() {
  let salasFromJson = allLocalJsonData.SQL.salas;

  const [salas, setSalas] = useState(salasFromJson);
  const [sala, setSala] = useState(salasFromJson[20]);

  let mySalasStates = { salas, setSalas, sala, setSala };

  function SalaSelection({ mySalasStates }) {
    return (
      <div
        className="SelectionBar"
        onWheel={(event) => {
          // let itemStates = [salasFromJson, setSala, sala];
          // scrollThroughSalas(event, itemStates);
        }}
      >
        <SalaItemSelection mySalasStates={mySalasStates} />
      </div>
    );
  }

  function SalaCard(props) {
    let { currentSala } = props;

    function InformacoesBaseDaSala() {
      return (
        <div className="showBasicDataCard">
          <h3>INFORMAÇÕES DA SALA</h3>
          <table className="showBasicDataTable">
            <tbody>
              <tr>
                <th>Bloco</th>
                <td>{`${currentSala.bloco} (${currentSala.descricao})`}</td>
              </tr>
              <tr>
                <th>Código</th>
                <td>{currentSala.codigo}</td>
              </tr>
              <tr>
                <th>Capacidade</th>
                <td>{currentSala.capacidade}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    function TurmasNaSala({ lSala }) {
      function getTurmas(id) {
        let horarios = allLocalJsonData.SQL.horarios;
        let horariosNestaSala = [];
        for (const chaveTurma in horarios) {
          let horario = horarios[chaveTurma];
          if (horario.idSala === id) {
            horariosNestaSala.push(horario);
          }
        }
        let fullInfoFromTurmasNaSala =
          appendInfoFromTurmasUsingHorarios(horariosNestaSala);

        let dias = options.constantValues.days;

        fullInfoFromTurmasNaSala.sort((a, b) => {
          let diaA = dias.find((dia) => dia.value === a.dia);
          let diaB = dias.find((dia) => dia.value === b.dia);
          if (dias.indexOf(diaA) < dias.indexOf(diaB)) {
            return -1;
          }
          if (dias.indexOf(diaA) > dias.indexOf(diaB)) {
            return 1;
          }
          if (a.horaInicio < b.horaInicio) {
            return -1;
          }
          if (a.horaInicio > b.horaInicio) {
            return 1;
          }
          return 0;
        });
        return fullInfoFromTurmasNaSala;
      }
      let turmasNestaSala = getTurmas(lSala.id);
      return (
        <div className="showBasicDataCard">
          <h4>TURMAS NESTA SALA</h4>
          <table className="showBasicDataTable">
            <thead>
              <tr>
                <th>Ano.Semestre</th>
                <th>Disciplina</th>
                <th>Professor</th>
                <th>Dia</th>
                <th>Hora Início</th>
                <th>Duração</th>
              </tr>
            </thead>
            <tbody>
              {turmasNestaSala.map((turma, i) => {
                return (
                  <tr key={i}>
                    <td>
                      {turma.ano}.{turma.semestre}
                    </td>
                    <td>
                      {turma.codigoDisciplina} {turma.apelidoDisciplina}
                    </td>
                    <td>{turma.apelidoProfessor}</td>
                    <td>{turma.dia}</td>
                    <td>{turma.horaInicio}</td>
                    <td>{turma.duracao}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    function OcupacaoNaSala() {
      return (
        <div className="showBasicDataCard">
          {/* <img className="CRUD-room-placeholderimg" src={assets.room} alt="" /> */}
        </div>
      );
    }

    return (
      <div className="infoCard">
        <InformacoesBaseDaSala />
        <TurmasNaSala lSala={sala} />
        <OcupacaoNaSala />
      </div>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <SalaSelection mySalasStates={mySalasStates} />
      <SalaCard currentSala={sala} />
    </div>
  );
}

function CRUDrooms() {
  return (
    <div className="background">
      <CRUDPageSelection
        defaultValue={options.constantValues.pageSelection.salas}
      />
      <Salas />
    </div>
  );
}

export default CRUDrooms;
