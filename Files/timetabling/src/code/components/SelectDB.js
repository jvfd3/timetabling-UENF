import "../CSS/defaultStyle.css";
import React, { useEffect, useState } from "react";
import options from "../temp/options";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  createProfessor,
  readProfessores,
  updateProfessor,
  thinDeleteProfessor,
} from "../../DB/dataFromDB";
import AsyncSelect from "react-select/async";
import { readData } from "../functions/CRUD_JSONBIN";

function AsyncProfessor({ professor, setProfessor }) {
  // let allProf = allLocalJsonData.SQL.professores;

  async function loadOptions() {
    let response = await readProfessores();
    // not working for some mysterious reason
    /* 
    if (inputValue) {
      let filteredResponse = [];
      for (let i = 0; i < response.length; i++) {
        let nomeProfessor = response[i].nomeProfessor.toLowerCase();
        let pesquisa = inputValue.toLowerCase();
        // console.log("x", nomeProfessor.includes(pesquisa));
        console.log("ping");
        if (
          nomeProfessor.includes(pesquisa) ||
          response[i].apelidoProfessor.includes(pesquisa) ||
          response[i].curso.includes(pesquisa) ||
          response[i].laboratorio.includes(pesquisa)
        ) {
          // console.log(response[i]);
          filteredResponse.push(response[i]);
          // console.log(filteredResponse);
        }
        console.log("pong");
      }
      console.log("PANG");
      response = filteredResponse;
      console.log("filteredResponse", response);
    } */
    return response;
  }
  const handleChange = (selectedOption) => {
    setProfessor(selectedOption);
  };
  return (
    <div className="infoCard" style={{ color: "black" }}>
      <AsyncSelect
        cacheOptions
        defaultOptions
        styles={options.SelectStyles.fullWidth}
        value={professor}
        loadOptions={loadOptions}
        // defaultOptions={allProf}
        getOptionLabel={(option) => option.nomeProfessor}
        getOptionValue={(option) => option.idprofessor}
        onChange={handleChange}
        formatOptionLabel={(option) => {
          let optionName = option.nomeProfessor || "";
          let completeName = true;
          let nomeSeparado = optionName.split(" ");
          let nomeDenso =
            nomeSeparado[0] + " " + nomeSeparado[nomeSeparado.length - 1];
          let name = completeName ? optionName : nomeDenso;
          return `(${option.laboratorio}) ${name}`;
        }}
      />
    </div>
  );
}

export { AsyncProfessor };
