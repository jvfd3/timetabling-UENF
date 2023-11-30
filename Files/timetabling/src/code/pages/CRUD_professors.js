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
  const { professor1, setProfessor1 } = props;

  const [preferencias, setPreferencias] = useState(
    allLocalJsonData.dynamic.preferenciasProfessores
  );
  const [preferencia, setPreferencia] = useState(
    getPreferenciasProfessor(professor1.nome)
  );

  useEffect(() => {
    setPreferencia(getPreferenciasProfessor(professor1.nome));
  }, [professor1]);

  let infoPreferencias = options.constantValues.niveisDePreferencia;
  let dias = options.days;

  function tabelaPreferenciasContent() {
    function ClickableCell(nivelDePreferencia, rowIndex, columnIndex) {
      let horaInicial = rowIndex + 7;
      let thisPreferenceRow = preferencia[horaInicial];
      let thisPreferenceDay = dias[columnIndex].value.toLowerCase();
      let thisPreferenceValue = thisPreferenceRow[thisPreferenceDay];
      const preferenceColor = getColorPreference(thisPreferenceValue);

      // console.log(`(${rowIndex}, ${columnIndex})`);
      // console.log(nivelDePreferencia);

      const handleClick = (e) => {
        let ctrlOrAltPressed = e.ctrlKey || e.altKey;
        let newValue = (nivelDePreferencia + (ctrlOrAltPressed?-1:1)) % dias.length;
        if (newValue < 0) newValue = dias.length - 1;
        let newPreference = {
          ...preferencia,
          [horaInicial]: {
            ...thisPreferenceRow,
            [thisPreferenceDay]: newValue,
          },
        };
        // console.log(newPreference);
        setPreferencia(newPreference);
        // console.log(newPreference[7]["seg"]);
        // setPreferenceIndex(
        //   (prevIndex) => (prevIndex + 1) % preferenceValues.length
        // );
      };

      return (
        <td
          key={100 * columnIndex + 1 * rowIndex}
          style={{
            backgroundColor: preferenceColor,
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          {thisPreferenceValue}
        </td>
      );
    }

    return Object.entries(preferencia).map(([horario, dias], rowIndex) => (
      <tr
        key={rowIndex}
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
        {Object.entries(dias).map(([dia, preferencia], columnIndex) => {
          return ClickableCell(preferencia, rowIndex, columnIndex);
        })}
      </tr>
    ));
  }

  function getPreferenciasProfessor(localNomeProfessor) {
    let preferenciasDesseProfessor = preferencias[localNomeProfessor];
    if (preferenciasDesseProfessor === undefined) {
      preferenciasDesseProfessor =
        allLocalJsonData.templates.preferenciasProfessores.preferenciaDict
          .diasNasHoras;
    }
    // console.log(preferenciasDesseProfessor);
    return preferenciasDesseProfessor;
  }

  function getColorPreference(nivelDePreferencia) {
    const infoPreferencia = infoPreferencias.find(
      (item) => item.nivel === nivelDePreferencia
    );
    let color = infoPreferencia ? infoPreferencia.cor : "white";
    return color;
  }

  function getLegenda() {
    // Contar as ocorrências de cada preferência
    let counts = [];
    infoPreferencias.forEach((info) => {
      const preferencia = info.nivel;
      let count = 0;
      Object.values(preferencias).forEach((dias) => {
        Object.values(dias).forEach((pref) => {
          if (pref === preferencia) {
            count++;
          }
        });
      });
      counts.push({
        preferencia,
        count,
        description: info.descricao,
        color: info.cor,
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
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {counts.map(({ preferencia, count, description, color }, i) => {
              return (
                <tr
                  key={i}
                  style={{
                    backgroundColor: color,
                    textAlign: "center",
                  }}
                >
                  <td>{preferencia}</td>
                  <td>{count}</td>
                  <td
                    style={{
                      textAlign: "left",
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingBottom: 5,
                      paddingTop: 5,
                    }}
                  >
                    {description}
                  </td>
                </tr>
              );
            })}
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
    // readData(options.JBVars.bins.infoProfessores).then((DBprofessores) => {
    //   // console.log(DBprofessores);
    //   setProfessores(DBprofessores);
    // });
    setProfessores(allLocalJsonData.static.infoProfessores);
    /*     const fetchData = async () => {
      let DBprofessores = await readData(options.JBVars.bins.infoProfessores);
      let RSprofessor = DBprofessores.map(professorDBtoRS);
      setProfessores(RSprofessor);
    };

    fetchData(); */
  }, []);
  /* 
  function updateProfessores(newProfessorValue) {
    let newProfessores = professores.map((professor, i) =>
      professor.id === newProfessorValue.id ? newProfessorValue : professores[i]
    );
    setProfessores(newProfessores);
  }

  useEffect(() => {
    // let message = "It seems that 'professor' have changed, so I will update everything for ya 🫡"
    // console.log(message);
    updateProfessores(professor);
  }, [professor]);
 */
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
        <PreferencesTable professor1={professor} setProfessor1={setProfessor} />
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
