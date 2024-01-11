import React, { useState, useEffect } from "react";
import options from "../../temp/options";
import "../CSS/defaultStyle.css";
import { allLocalJsonData, sqlDataFromJson } from "../../../DB/dataFromJSON";
import "./Timetable.css";

function ThisDummyComponent() {
  return (
    <div>
      <p>XXX</p>
    </div>
  );
}

function Tabela() {
  let dias = options.constantValues.days;
  let horas = options.constantValues.hours;

  function DiasHeader() {
    return dias.map((dia, i) => (
      <th className="HeaderDias" key={i}>
        {dia.value}
      </th>
    ));
  }

  function TabelaPreferenciasContent() {
    function cell(rowIndex, columnIndex) {
      return (
        <td key={1000 * columnIndex + 1 * rowIndex} className="TimetableCell">
          <ThisDummyComponent />
        </td>
      );
    }
    return horas.map((hora, rowIndex) => (
      <tr key={rowIndex} className="TimetableRow">
        <td key={100 + rowIndex} className="HorariosSideHeader">
          {hora.hora} ~ {parseInt(hora.hora) + 1}
        </td>
        {dias.map((dia, columnIndex) => cell(rowIndex, columnIndex))}
      </tr>
    ));
  }
  return (
    <table className="preferencesTable">
      <thead>
        <tr>
          <th className="HorariosHeader">Horários</th>
          <DiasHeader />
        </tr>
      </thead>
      <tbody>
        <TabelaPreferenciasContent />
      </tbody>
    </table>
  );
}

export default Tabela;
