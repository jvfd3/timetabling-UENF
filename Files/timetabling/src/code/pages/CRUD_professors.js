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

function PreferencesTable(props) {
  const { nomeProfessor } = props;
  let dias = options.days;

  function getPreferenciasProfessor(localNomeProfessor) {
    let localPreferences = allLocalJsonData.dynamic.preferenciasProfessores;
    let preferencias = [];
    let preferenciasDesseProfessor = localPreferences[localNomeProfessor];
    if (preferenciasDesseProfessor === undefined) {
      console.log(
        "Amigão, o professor tá sem preferência, adiciona uma preferência vazia aí pra ele."
      );
    } else {
      preferencias = preferenciasDesseProfessor;
    }
    return preferencias;
  }
  let preferencias = getPreferenciasProfessor(nomeProfessor);

  function getColorPreference(nivelDePreferencia) {
    let color = "white";
    let colors = {
      0: "#747474",
      1: "#489B14",
      2: "#EEDF58",
      3: "#DC8324",
      9: "#B70000",
      10: "#000000",
    };
    color = colors[nivelDePreferencia];
    if (color === undefined) {
      color = "white";
    }
    return color;
  }

  function tabelaPreferenciasContent() {
    return Object.entries(preferencias).map(([horario, dias], i) => (
      <tr
        key={i}
        style={{
          color: "#000000",
          textAlign: "center",
        }}
      >
        <td
          style={{
            backgroundColor: "#FFCB8E",
            fontWeight: "bold",
            fontSize: "1.0em",
            paddingTop: 5,
          }}
        >
          {horario} ~ {parseInt(horario) + 1}
        </td>
        <td
          style={{
            backgroundColor: getColorPreference(dias.seg),
          }}
        >
          {dias.seg}
        </td>
        <td
          style={{
            backgroundColor: getColorPreference(dias.ter),
          }}
        >
          {dias.ter}
        </td>
        <td
          style={{
            backgroundColor: getColorPreference(dias.qua),
          }}
        >
          {dias.qua}
        </td>
        <td
          style={{
            backgroundColor: getColorPreference(dias.qui),
          }}
        >
          {dias.qui}
        </td>
        <td
          style={{
            backgroundColor: getColorPreference(dias.sex),
          }}
        >
          {dias.sex}
        </td>
      </tr>
    ));
  }

  function getLegenda() {
    // Contar as ocorrências de cada preferência
    let counts = {};
    Object.values(preferencias).forEach((dias) => {
      Object.values(dias).forEach((preferencia) => {
        counts[preferencia] = (counts[preferencia] || 0) + 1;
      });
    });

    return (
      <div>
        <h3>Legenda</h3>
        <table>
          <thead>
            <tr>
              <th>Nível de preferência</th>
              <th>Quantidade de ocorrências</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(counts).map(([preferencia, count], i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: getColorPreference(preferencia),
                  textAlign: "center",
                }}
              >
                <td>{preferencia}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "moccasin",
        alignSelf: "center",
        justifyContent: "center",
        padding: 10,
        flexDirection: "column",
      }}
    >
      <h4>Preferências</h4>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: "#64584A", padding: 10 }}>
              Horários
            </th>
            {dias.map((dia, i) => (
              <th
                key={i}
                style={{ backgroundColor: "#FFBC58", paddingLeft: 10 }}
              >
                {dia.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tabelaPreferenciasContent()}</tbody>
      </table>
      {getLegenda()}
    </div>
  );
}

function SelectDisciplinas(props) {
  const {
    myCurrentOptions,
    currentProfessor,
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
        options={disciplinas}
        value={myNewCurrentOptions}
        onChange={(option) => {
          let myItem = { ...currentProfessor };
          myItem["disciplinas"] = option;
          updateStudent(myItem);
          atualizarProfessores(
            professoresPraAtualizar,
            atualizandoProfessores,
            myItem
          );
        }}
        placeholder={"Disciplinas ministradas"}
        className="DisciplinasProfessor"
        isMulti={true}
        isClearable={false}
        isSearchable={true}
        getOptionValue={(option) => option.codigo}
        getOptionLabel={(option) => option.nome}
        formatOptionLabel={({ nome, codigo }) => `${codigo}: ${nome}`}
      />
    </div>
  );
}

function Professores() {
  let localData = allLocalJsonData.static.infoProfessores;
  const [professores, setProfessores] = useState(localData);
  // const [professor, setProfessor] = useState(localData[2]); //Tang
  const [professor, setProfessor] = useState(professores[7]); //Oscar
  // const [professor, setProfessor] = useState(professores[16]); //Marcenilda
  // console.log("professoresRS:", professores)
  // console.log("professoresJSON:", allLocalJsonData.static.infoProfessores)
  // console.log("professor:", professor)
  useEffect(() => {
    readData(options.JBVars.bins.infoProfessores).then((DBprofessores) => {
      // console.log(DBprofessores);
      setProfessores(DBprofessores);
    });
    // setProfessor(allLocalJsonData.static.infoProfessores);
    /*     const fetchData = async () => {
      let DBprofessores = await readData(options.JBVars.bins.infoProfessores);
      let RSprofessor = DBprofessores.map(professorDBtoRS);
      setProfessores(RSprofessor);
    };

    fetchData(); */
  }, []);
  return (
    <div className="CRUD-outro">
      <div className="CRUD-docentes-properties">
        <Select
          options={professores}
          value={professor}
          onChange={setProfessor}
          getOptionValue={(option) => option.nome}
          getOptionLabel={(option) => option.laboratorio}
          formatOptionLabel={({ nome, laboratorio }, { context }) => {
            return context === "value" ? `${nome}` : `(${laboratorio}) ${nome}`;
          }}
          isMulti={false}
          isSearchable={true}
          isClearable={false}
          placeholder="Selecione um professor"
        />
        <table
          className="table"
          style={{ color: "black", backgroundColor: "blanchedalmond" }}
        >
          <tbody>
            <tr>
              <th>Nome</th>
              <td>{professor.nome}</td>
            </tr>
            <tr>
              <th>Curso</th>
              <td>{professor.curso}</td>
            </tr>
            <tr>
              <th>laboratório</th>
              <td>{professor.laboratorio}</td>
            </tr>
          </tbody>
        </table>
        <table
          className="table"
          style={{ backgroundColor: "powderblue", color: "black" }}
        >
          <tbody>
            <tr>
              <th>Disciplinas</th>
            </tr>
            <tr>
              <td>
                <SelectDisciplinas
                  myCurrentOptions={professor.disciplinas}
                  currentProfessor={professor}
                  updateStudent={setProfessor}
                  atualizandoProfessores={setProfessores}
                  professoresPraAtualizar={professores}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PreferencesTable nomeProfessor={professor.nome} />
      <img
        className="CRUD-docentes-placeholderimg"
        src={assets.professorMap}
        alt=""
      />
    </div>
  );
}

function CRUDprofessors() {
  return (
    <div className="background">
      <div className="CRUD-contain-components">
        <CRUDPageSelection defaultValue={options.CRUD.crud_professores} />
        <Professores />
      </div>
    </div>
  );
}

export default CRUDprofessors;
