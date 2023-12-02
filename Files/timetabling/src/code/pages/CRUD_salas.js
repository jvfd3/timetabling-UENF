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

  function SalaCard(props) {
    let { currentSala } = props;

    function InformacoesBaseDaSala() {
      return (
        <div className="showBasicDataCard">
          <h3>Informações da Sala</h3>
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
          <h4>Informações de Turmas nesta sala</h4>
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
                    <td>
                      <BotaoRemover key={i} placeholder="Remover" />
                    </td>
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
        <img className="CRUD-room-placeholderimg" src={assets.room} alt="" />
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
