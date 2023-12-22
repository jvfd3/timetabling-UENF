import React, { useEffect, useState } from "react";
import CRUDPageSelection from "../components/PageSelect";
import options from "../temp/options";
import "../CSS/CRUD_professores.css";
import "../CSS/defaultStyle.css";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import { SelectCurso, SelectLaboratorio } from "../components/mySelects";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import {
  safeCreateProfessores,
  safeReadProfessores,
  safeUpdateProfessores,
  safeDeleteProfessores,
} from "../functions/cleanCodeFromAxios";
import {
  CreateButton,
  ReadButton,
  UpdateButton,
  DeleteButton,
} from "../components/CRUDButtons/CRUDButtons";

function ProfessoresDB() {
  let defaultProfessores = allLocalJsonData.SQL.professores;
  const [professores, setProfessores] = useState(defaultProfessores);
  const [professor, setProfessor] = useState(
    defaultProfessores[professores.length - 1]
  );

  let professorStates = {
    professores: professores,
    setProfessores: setProfessores,
    professor: professor,
    setProfessor: setProfessor,
  };

  useEffect(() => {
    safeReadProfessores(professorStates);
  }, []);

  function createProfessor() {
    safeCreateProfessores(professorStates);
  }

  function readProfessor() {
    safeReadProfessores(professorStates);
  }

  function updateProfessor() {
    safeUpdateProfessores(professorStates);
  }

  function deleteProfessor() {
    safeDeleteProfessores(professorStates);
  }

  return (
    <div className="CRUDContainComponents">
      <div className="a" style={{ display: "flex", flexDirection: "row" }}>
        <Select
          className="b"
          styles={options.SelectStyles.fixedWidth}
          options={professores}
          value={professor}
          onChange={setProfessor}
          getOptionLabel={({ laboratorio, curso, apelidoProfessor }) =>
            `(${laboratorio} - ${curso}) ${apelidoProfessor}`
          }
          getOptionValue={(option) => option.idprofessor}
        />
        <CreateButton createFunction={createProfessor} />
        <ReadButton readFunction={readProfessor} />
        <UpdateButton updateFunction={updateProfessor} />
        <DeleteButton deleteFunction={deleteProfessor} />
      </div>
      <div className="c">
        <div className="d">
          Laboratorio
          <SelectLaboratorio professorStates={professorStates} />
        </div>
        <div className="e">
          Curso
          <SelectCurso professorStates={professorStates} />
        </div>
        <TextField
          className="f"
          value={professor.nomeProfessor}
          onChange={(event) => {
            let newProfessor = {
              ...professor,
              nomeProfessor: event.target.value,
            };
            setProfessor(newProfessor);
          }}
          fullWidth
          label="Nome do Professor"
        />
        <TextField
          className="g"
          value={professor.apelidoProfessor}
          onChange={(event) => {
            let newProfessor = {
              ...professor,
              apelidoProfessor: event.target.value,
            };
            setProfessor(newProfessor);
          }}
          fullWidth
          label="Apelido do Professor"
        />
        <TextField
          className="h"
          value={professor.idprofessor}
          fullWidth
          label="ID do Professor"
          disabled
        />
      </div>
    </div>
  );
}

function CRUDprofessors() {
  return (
    <div className="background">
      <CRUDPageSelection
        defaultValue={options.constantValues.pageSelection.professoresDB}
      />
      <ProfessoresDB />
    </div>
  );
}

export default CRUDprofessors;
