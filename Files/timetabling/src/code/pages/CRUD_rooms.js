import "../CSS/CRUD_rooms.css";
import "../CSS/defaultStyle.css";
import assets from "../../assets/imagesImport";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import react, { useState } from "react";
import Select from "react-select";

function TurmasNaSala({ blocoSala }) {
  function getTurmas() {
    let codigoDaSalaDoBloco = blocoSala;
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
  console.log(turmasNestaSala);
  return (
    <div>
      <h4>Informações de Turmas nesta sala</h4>
      <table>
        <thead>
          <tr>
            <th>Ano.Semestre</th>
            <th>Disciplina</th>
            <th>Professor</th>
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
                <td>{turma.horarios.horaInicio}</td>
                <td>{turma.horarios.duracao}</td>
                <td>
                  <button key={i}>Remover</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function VisualizacaoSala(props) {
  let { currentSala } = props;
  return (
    <div>
      <h4>Informações da Sala</h4>
      <table>
        <thead>
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
        </thead>
      </table>
      <TurmasNaSala blocoSala={currentSala.blocoSala} />
      <img className="CRUD-room-placeholderimg" src={assets.room} alt="" />
    </div>
  );
}

function Salas() {
  let salasFromJson = getSalasData();

  const [salas, setSalas] = useState(salasFromJson);
  const [sala, setSala] = useState(salas[0]);

  function getSalasData() {
    let salasFromJson = allLocalJsonData.static.infoSalas;
    // console.log(salasList)
    return salasFromJson;
  }

  return (
    <div className="CRUD-outro">
      <div
        style={{ backgroundColor: "#996633", padding: 20 }}
        className="CRUD-properties"
      >
        <Select
          className="CRUD-room-select"
          options={salas}
          value={sala}
          onChange={setSala}
          getOptionValue={(option) => option.blocoSala}
          getOptionLabel={(option) => option.capacidade}
          formatOptionLabel={(sala) =>
            `(${sala.capacidade}) ${sala.bloco}-${sala.codigo}`
          }
        />
        <VisualizacaoSala currentSala={sala} />
      </div>
    </div>
  );
}

function CRUDrooms() {
  return (
    <div className="background">
      <div className="CRUD-contain-components">
        <CRUDPageSelection defaultValue={options.CRUD.crud_salas} />
        <Salas />
      </div>
    </div>
  );
}

export default CRUDrooms;
