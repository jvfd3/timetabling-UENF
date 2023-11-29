import "../CSS/CRUD_rooms.css";
import "../CSS/defaultStyle.css";
import assets from "../../assets/imagesImport";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import react, { useState } from "react";
import Select from "react-select";

function Salas() {
  function getSalasData() {
    let salasFromJson = allLocalJsonData.static.infoSalas;
    // console.log(salasList)
    return salasFromJson;
  }

  let salasFromJson = getSalasData();

  const [salas, setSalas] = useState(salasFromJson);
  const [sala, setSala] = useState(salas[0]);

  function VisualizacaoSala({ currentSala }) {
    return (
      <div>
        <table>
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
        </table>
        <img className="CRUD-room-placeholderimg" src={assets.room} alt="" />
      </div>
    );
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
