import React from "react";
import options from "../../../temp/options";
import {
  allLocalJsonData,
  sqlDataFromJson,
} from "../../../../src/DB/local/dataFromJSON";

function PreferencesTable(props) {
  const { preferencia1, setPreferencia1 } = props;

  let infoPreferencias = options.constantValues.preferenceLevels;
  let dias = options.constantValues.days;
  let hasNumbers = false;

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

  function Preferencias() {
    function TabelaPreferenciasContent() {
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
    return (
      <table className="preferencesTable">
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
        <tbody>
          <TabelaPreferenciasContent />
        </tbody>
      </table>
    );
  }

  return (
    <div className="showBasicDataCard">
      <h3>Preferências</h3>
      <Preferencias />
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
    let disciplinas = sqlDataFromJson.subjects;

    let myNewCurrentOptions = getNomesDasDisciplinas(myCurrentOptions);
    return (
      <Select
        className="manyDisciplinasMultiSelect"
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
        isMulti={true}
        isClearable={false}
        isSearchable={true}
        getOptionValue={(option) => option.codigo}
        getOptionLabel={(option) => option.nome}
        formatOptionLabel={({ nome, codigo }) => `${codigo}: ${nome}`}
      />
    );
  }

  return (
    <div className="showBasicDataCard">
      <table className="showBasicDataTable">
        <tbody>
          <tr>
            <th>Disciplinas</th>
          </tr>
          <tr>
            <td>
              {/* Depois checar para externalizar e relacionar com o BD */}
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
  );
}

export { PreferencesTable, DisciplinasMinistradasPeloProfessor };
