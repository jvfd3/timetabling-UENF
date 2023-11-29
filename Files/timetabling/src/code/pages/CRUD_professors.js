import React, { useEffect, useState } from "react";
import "../CSS/CRUD_professors.css";
import "../CSS/defaultStyle.css";
import options from "../temp/options";
import assets from "../../assets/imagesImport";
import CRUDPageSelection from "../components/PageSelect";
import Select from "react-select";
import { getNomesDasDisciplinas } from "../functions/getListaDisciplinas";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import { readData, updateData } from "../functions/CRUD_JSONBIN";
// import { allLocalJsonData } from "../../DB/dataFromJSON";
// import { updateDB } from "../functions/update_DB";
// updateDB(options.JBVars.bins.infoProfessores);

function SelectDisciplinas(props) {
  const {
    myPlaceHolder,
    myCurrentOptions,
    currentItem,
    updateStudent,
    atualizandoProfessores,
    professoresPraAtualizar,
  } = props;
  function atualizarProfessores(
    professoresPraAtualizar,
    atualizandoProfessores,
    professorAtual
  ) {
    // console.log("OLD Professores: ", professoresPraAtualizar)
    let myProfessores = [...professoresPraAtualizar];
    let myProfessor = { ...professorAtual };
    let myIndex = myProfessores.findIndex(
      (professor) => professor.value === myProfessor.value
    );
    myProfessores[myIndex] = myProfessor;
    atualizandoProfessores(myProfessores);
    updateData(myProfessores, options.JBVars.bins.infoProfessores);
  }
  let disciplinas = allLocalJsonData.static.infoDisciplinasCC;
  let myNewCurrentOptions = getNomesDasDisciplinas(myCurrentOptions);
  return (
    <div>
      <Select
        placeholder={myPlaceHolder}
        options={disciplinas}
        value={myNewCurrentOptions}
        onChange={(option) => {
          let myItem = { ...currentItem };
          myItem["disciplinas"] = option;
          updateStudent(myItem);
          atualizarProfessores(
            professoresPraAtualizar,
            atualizandoProfessores,
            myItem
          );
        }}
        isMulti={true}
        className="DisciplinasProfessor"
        isClearable={false}
        isSearchable={true}
        getOptionLabel={(option) => option.nome}
        getOptionValue={(option) => option.codigo}
        formatOptionLabel={({ nome, codigo }, { context }) => {
          return context === "nome" ? `${nome}` : `${nome}: ${codigo}`;
        }}
      />
    </div>
  );
}

function CRUDprofessors() {
  let localData = allLocalJsonData.static.infoProfessores;
  const [professores, setProfessores] = useState(localData);
  const [professor, setProfessor] = useState(localData[2]); //Tang
  // const [professor, setProfessor] = useState(professores[16]); //Marcenilda
  // console.log("professoresRS:", professores)
  // console.log("professoresJSON:", allLocalJsonData.static.infoProfessores)
  // console.log("professor:", professor)
  useEffect(() => {
    readData(options.JBVars.bins.infoProfessores).then((DBprofessores) => {
      // console.log(DBprofessores);
      setProfessores(DBprofessores);
    });
    /*     const fetchData = async () => {
      let DBprofessores = await readData(options.JBVars.bins.infoProfessores);
      let RSprofessor = DBprofessores.map(professorDBtoRS);
      setProfessores(RSprofessor);
    };

    fetchData(); */
  }, []);
  return (
    <div className="background">
      <div className="CRUD-contain-components">
        <CRUDPageSelection defaultValue={options.CRUD.crud_professores} />
        <div className="CRUD-outro">
          <div className="CRUD-docentes-properties">
            <Select
              options={professores}
              value={professor}
              onChange={setProfessor}
              getOptionValue={(option) => option.nome}
              getOptionLabel={(option) => option.laboratorio}
              formatOptionLabel={({ nome, laboratorio }, { context }) => {
                return context === "value"
                  ? `${nome}`
                  : `(${laboratorio}) ${nome}`;
              }}
              nome
              isMulti={false}
              isSearchable={true}
              isClearable={false}
              newPlaceHolder="Docente"
            />
            <div
              style={{ backgroundColor: "blanchedalmond" }}
              className="VisualizeData"
            >
              <table className="table" style={{ color: "black" }}>
                <tbody>
                  <tr>
                    <td>Nome</td>
                    <td>{professor.nome}</td>
                  </tr>
                  <tr>
                    <td>Curso</td>
                    <td>{professor.curso}</td>
                  </tr>
                  <tr>
                    <td>laboratório:</td>
                    <td>{professor.laboratorio}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <table
              className="table"
              style={{ backgroundColor: "powderblue", color: "black" }}
            >
              <tbody>
                <tr>
                  <td>
                    <h4>Disciplinas</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <SelectDisciplinas
                      myPlaceHolder="Disciplinas ministradas"
                      myCurrentOptions={professor.disciplinas}
                      currentItem={professor}
                      updateStudent={setProfessor}
                      atualizandoProfessores={setProfessores}
                      professoresPraAtualizar={professores}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
