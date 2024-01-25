import React, { useState, useEffect } from "react";
import options from "../../temp/options";
import "../CSS/defaultStyle.css";
import { sqlDataFromJson } from "../../DB/dataFromJSON";
import "./Timetable.css";

function ThisDummyComponent() {
  return (
    <div>
      <p>XXX</p>
    </div>
  );
}

function Tabela() {
  const days = options.constantValues.days;
  const hours = options.constantValues.hours;

  function DiasHeader() {
    return days.map((dia, i) => (
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
    return hours.map((hora, rowIndex) => (
      <tr key={rowIndex} className="TimetableRow">
        <td key={100 + rowIndex} className="HorariosSideHeader">
          {hora.hora} ~ {parseInt(hora.hora) + 1}
        </td>
        {days.map((dia, columnIndex) => cell(rowIndex, columnIndex))}
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
