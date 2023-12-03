import "../CSS/defaultStyle.css";
import "../CSS/CRUD_salas.css";
import assets from "../../assets/imagesImport";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import react, { useState } from "react";
import Select from "react-select";
import BotaoRemover from "../components/botaoRemover";

function Salas() {
  let salasFromJson = allLocalJsonData.static.infoSalas;

  const [salas, setSalas] = useState(salasFromJson);
  const [sala, setSala] = useState(salas[0]);

  function SalaSelection() {
    function scrollThroughSalas(event) {
      let diretion = event.deltaY > 0 ? "down" : "up";
      let index = salas.findIndex(
        (oneOfSalas) => oneOfSalas.blocoSala === sala.blocoSala
      );
      index += diretion === "up" ? -1 : 1;
      index = index < 0 ? salas.length - 1 : index;
      index = index >= salas.length ? 0 : index;
      let newOption = salas[index];
      setSala(newOption);
    }
    return (
      <div className="SelectionBar" onWheel={scrollThroughSalas}>
        <Select
          className="itemSelectionBar"
          options={salas}
          value={sala}
          onChange={setSala}
          getOptionValue={(option) => option.blocoSala}
          getOptionLabel={(option) => option.capacidade}
          formatOptionLabel={(sala) =>
            `(${sala.capacidade}) ${sala.bloco}-${sala.codigo}`
          }
        />
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
                <td>{`${currentSala.bloco} (${currentSala.descricaoBloco})`}</td>
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

    function TurmasNaSala({ blocoSala }) {
      function getTurmas() {
        let turmasTeste = allLocalJsonData.dynamic.turmasTeste;
        // console.log(turmasTeste);
        let horariosNestaSala = [];
        for (const chaveTurma in turmasTeste) {
          let turma = turmasTeste[chaveTurma];
          for (const chaveHorario in turma.horarios) {
            let horario = turma.horarios[chaveHorario];
            let salaDoHorario = horario.sala;
            // console.log(salaDoHorario);
            // console.log(blocoSala);
            if (blocoSala === salaDoHorario) {
              let newTurma = { ...turmasTeste[chaveTurma] };
              newTurma.horarios = { ...horario };
              horariosNestaSala.push(newTurma);
            }
          }
        }
        return horariosNestaSala;
      }

      let turmasNestaSala = getTurmas();
      // console.log(turmasNestaSala);
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
                      {turma.disciplina.codigo} {turma.disciplina.nome}
                    </td>
                    <td>{turma.professor}</td>
                    <td>{turma.horarios.dia}</td>
                    <td>{turma.horarios.horaInicio}</td>
                    <td>{turma.horarios.duracao}</td>
                    {/* <td>
                      <BotaoRemover placeholder="Remover" />
                    </td> */}
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
          <img className="CRUD-room-placeholderimg" src={assets.room} alt="" />
        </div>
      );
    }

    return (
      <div className="infoCard">
        <InformacoesBaseDaSala />
        <TurmasNaSala blocoSala={currentSala.blocoSala} />
        <OcupacaoNaSala />
      </div>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <SalaSelection />
      <SalaCard currentSala={sala} />
    </div>
  );
}

function CRUDrooms() {
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={options.CRUD.crud_salas} />
      <Salas />
    </div>
  );
}

export default CRUDrooms;
