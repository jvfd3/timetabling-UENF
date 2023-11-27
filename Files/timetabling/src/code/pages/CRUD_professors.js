import React, { useState } from "react";
import "../CSS/CRUD_professors.css";
import "../CSS/defaultStyle.css";
import options from "../temp/options";
import assets from "../../assets/imagesImport";
import CRUDPageSelection from "../components/PageSelect";
import Select from "react-select";
import {
  getNomesDasDisciplinas,
  getCodigoNomeDisciplinas,
} from "../functions/getListaDisciplinas";
import { readData } from "../functions/CRUD_JSONBIN";
import { allLocalJsonData } from "../../DB/dataFromJSON";

let disciplinas_RS = getCodigoNomeDisciplinas();
let DBprofessores = await readData(options.JBVars.bins.infoProfessores);

function SelectDisciplinas(props) {
  const {
    myPlaceHolder,
    myCurrentOptions,
    myOptions,
    currentItem,
    updateStudent,
  } = props;
  return (
    <div>
      <Select
        placeholder={myPlaceHolder}
        options={myOptions}
        value={myCurrentOptions}
        onChange={(option) => {
          let myItem = { ...currentItem };
          myItem["disciplinas"] = option;
          updateStudent(myItem);
        }}
        isMulti={true}
        className="DisciplinasProfessor"
        isClearable={false}
        isSearchable={true}
        getOptionLabel={(option) => `${option.value}`}
      />
    </div>
  );
}

function convertToRS(recebeProfessor) {
  let codigoNome = getNomesDasDisciplinas(recebeProfessor.disciplinas);
  return {
    label: recebeProfessor.laboratorio,
    curso: recebeProfessor.curso,
    value: recebeProfessor.nome,
    disciplinas: codigoNome,
  };
}

let RSprofessor = DBprofessores.map(convertToRS);


function CRUDprofessors() {
  const [professores, setProfessores] = useState(RSprofessor);
  // const [professor, setProfessor] = useState(professores[2]); //Tang
  const [professor, setProfessor] = useState(professores[16]); //Marcenilda
  // console.log("professoresRS:", professores)
  // console.log("professoresJSON:", allLocalJsonData.static.infoProfessores)
  // console.log("professor:", professor)
  return (
    <div className="background">
      <div className="CRUD-contain-components">
        <CRUDPageSelection defaultValue={options.CRUD.crud_professores} />
        <div className="CRUD-outro">
          <div className="CRUD-docentes-properties">
            <Select
              options={professores}
              defaultValue={professor}
              onChange={setProfessor}
              getOptionLabel={(option) => `${option.label}: ${option.value}`}
              isMulti={false}
              isSearchable={true}
              isClearable={false}
              newPlaceHolder="Docente"
            />
            <p className="whiteColor">
              CURSO: {professor.curso}
              <br />
              LAB: {professor.label}
              <br />
              DISCIPLINAS:
            </p>
            <SelectDisciplinas
              myPlaceHolder="Disciplinas ministradas"
              myCurrentOptions={professor.disciplinas}
              myOptions={disciplinas_RS}
              currentItem={professor}
              updateStudent={setProfessor}
            />
          </div>
          <img
            className="CRUD-docentes-placeholderimg"
            src={assets.professorMap}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default CRUDprofessors;
