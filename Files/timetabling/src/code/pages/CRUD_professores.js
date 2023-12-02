import React, { useEffect, useState } from "react";
import "../CSS/CRUD_professores.css";
import "../CSS/defaultStyle.css";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";
import Select from "react-select";
import { getNomesDasDisciplinas } from "../functions/getListaDisciplinas";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import { readData, updateData } from "../functions/CRUD_JSONBIN";
// import { allLocalJsonData } from "../../DB/dataFromJSON";
// import { updateDB } from "../functions/update_DB";
// updateDB(options.JBVars.bins.infoProfessores);

function Professores() {
  let localData = allLocalJsonData.static.infoProfessores;
  const [professores, setProfessores] = useState(localData);
  const [professor, setProfessor] = useState(professores[0]); //Rivera
  // const [professor, setProfessor] = useState(localData[2]); //Tang
  // const [professor, setProfessor] = useState(professores[7]); //Oscar
  // const [professor, setProfessor] = useState(professores[16]); //Marcenilda
  // console.log("professoresRS:", professores)
  // console.log("professoresJSON:", allLocalJsonData.static.infoProfessores)
  // console.log("professor:", professor)

  const [preferencias, setPreferencias] = useState(
    allLocalJsonData.dynamic.preferenciasProfessores
  );
  const [preferencia, setPreferencia] = useState(
    getPreferenciasProfessor(professor.nome)
  );

  useEffect(() => {
    setPreferencia(getPreferenciasProfessor(professor.nome));
  }, [professor]);

  function updatePreferencias(newPreferenciaValue) {
    console.log("Updating preferencias...");
    let newPreferencias = { ...preferencias };
    newPreferencias[professor.nome] = newPreferenciaValue;
    setPreferencias(newPreferencias);
    // updateData(newPreferencias, options.JBVars.bins.preferenciasProfessores);
  }

  useEffect(() => {
    // let message = "It seems that 'professor' have changed, so I will update everything for ya 🫡"
    // console.log(message);
    updatePreferencias(preferencia);
  }, [preferencia]);

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

  function ProfessorSelection() {
    return (
      <div className="itemSelectionBar">
        <Select
          className="professorSelect"
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
      </div>
    );
  }

  function ProfessorCard() {
    function InformacoesBaseDoProfessor() {
      return (
        <div className="showBasicDataCard">
          <h3>Informações do professor</h3>
          <table className="showBasicDataTable">
            <thead></thead>
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
        </div>
      );
    }

    function PreferencesTable(props) {
      const { preferencia1, setPreferencia1 } = props;

      let infoPreferencias = options.constantValues.niveisDePreferencia;
      let dias = options.days;
      let hasNumbers = false;

      function tabelaPreferenciasContent() {
        function ClickableCell(nivelDePreferencia, rowIndex, columnIndex) {
          let horaInicial = rowIndex + 7;
          let thisPreferenceRow = preferencia1[horaInicial];
          let thisPreferenceDay = dias[columnIndex].value.toLowerCase();
          let thisPreferenceValue = thisPreferenceRow[thisPreferenceDay];
          const preferenceColor = getColorPreference(thisPreferenceValue);

          // console.log(`(${rowIndex}, ${columnIndex})`);
          // console.log(nivelDePreferencia);

          const handleClick = (e) => {
            let ctrlOrAltPressed = e.ctrlKey || e.altKey;
            let newValue =
              (nivelDePreferencia + (ctrlOrAltPressed ? -1 : 1)) % dias.length;
            if (newValue < 0) newValue = dias.length - 1;
            let newPreference = {
              ...preferencia1,
              [horaInicial]: {
                ...thisPreferenceRow,
                [thisPreferenceDay]: newValue,
              },
            };
            // console.log(newPreference);
            setPreferencia1(newPreference);
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
              {hasNumbers && thisPreferenceValue}
            </td>
          );
        }

        return Object.entries(preferencia1).map(([horario, dias], rowIndex) => (
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

      function getColorPreference(nivelDePreferencia) {
        const infoPreferencia = infoPreferencias.find(
          (item) => item.nivel === nivelDePreferencia
        );
        let color = infoPreferencia ? infoPreferencia.cor : "white";
        return color;
      }

      function Legenda() {
        // Contar as ocorrências de cada preferência
        let counts = [];
        for (const info of infoPreferencias) {
          counts.push({
            ...info,
            count: 0,
          });
        }

        for (const [horario, dias] of Object.entries(preferencia1)) {
          for (const [dia, preferencia] of Object.entries(dias)) {
            counts[preferencia].count += 1;
          }
        }
        // console.log(counts);

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
                {counts.map(({ cor, nivel, count, descricao }, i) => {
                  return (
                    <tr
                      key={i}
                      style={{
                        backgroundColor: cor,
                        textAlign: "center",
                      }}
                    >
                      <td>{nivel}</td>
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
                        {descricao}
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
          className="PreferenciasProfessor"
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
          <Legenda />
        </div>
      );
    }

    function DisciplinasMinistradasPeloProfessor() {
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
              className="manyDisciplinasMultiSelect"
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

      return (
        <table>
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
      );
    }

    return (
      <div className="infoCard">
        <InformacoesBaseDoProfessor />
        <PreferencesTable
          preferencia1={preferencia}
          setPreferencia1={setPreferencia}
        />
        <DisciplinasMinistradasPeloProfessor />
      </div>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <ProfessorSelection />
      <ProfessorCard />
    </div>
  );
}

function CRUDprofessors() {
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={options.CRUD.crud_professores} />
      <Professores />
    </div>
  );
}

export default CRUDprofessors;
