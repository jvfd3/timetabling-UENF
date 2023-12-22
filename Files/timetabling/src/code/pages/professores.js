import React, { useEffect, useState } from "react";
import "../CSS/CRUD_professores.css";
import "../CSS/defaultStyle.css";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";
import Select from "react-select";
import { getNomesDasDisciplinas } from "../functions/auxFunctions";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import { readData, updateData } from "../functions/CRUD_JSONBIN";
import {
  SelectCurso,
  SelectLaboratorio,
  SelectProfessorC,
} from "../components/mySelects";

// import { allLocalJsonData } from "../../DB/dataFromJSON";
// import { updateDB } from "../functions/update_DB";
// updateDB(options.JBVars.bins.infoProfessores);

function Professores() {
  let localData = allLocalJsonData.static.infoProfessores; //Tá repetido com o useEffect
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

  function updateProfessores(newProfessor) {
    let newProfessores = professores.map((professor) =>
      professor.nome === newProfessor.nome ? newProfessor : professor
    );
    // console.log("professores", professores[0]);
    // console.log("newProfessor", newProfessor);
    // console.log("newProfessores", newProfessores[0]);
    setProfessores(newProfessores);
  }

  useEffect(() => {
    // setPreferencia(getPreferenciasProfessor(professor.nome));
    /* Get all professores, find the  */
    updateProfessores(professor);
  }, [professor]);

  function updatePreferencias(newPreferenciaValue) {
    // console.log("Updating preferencias...");
    let newPreferencias = { ...preferencias };
    newPreferencias[professor.nome] = newPreferenciaValue;
    setPreferencias(newPreferencias);
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
    function scrollThroughProfessores(event) {
      let diretion = event.deltaY > 0 ? "down" : "up";
      let index = professores.findIndex(
        (oneOfProfessores) => oneOfProfessores.nome === professor.nome
      );
      index += diretion === "up" ? -1 : 1;
      index = index < 0 ? professores.length - 1 : index;
      index = index >= professores.length ? 0 : index;
      let newOption = professores[index];
      setProfessor(newOption);
    }
    return (
      <div className="SelectionBar" onWheel={scrollThroughProfessores}>
        <Select
          className="itemSelectionBar"
          options={professores}
          value={professor}
          onChange={setProfessor}
          getOptionValue={(option) => option.nome}
          getOptionLabel={(option) => option.laboratorio}
          formatOptionLabel={({ nome, laboratorio }, { context }) => {
            return context === "value"
              ? `(${laboratorio}) ${nome}`
              : `(${laboratorio}) ${nome}`;
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
          <h3>INFORMAÇÕES DO PROFESSOR</h3>
          <table className="showBasicDataTable">
            <thead></thead>
            <tbody>
              <tr>
                <th>Nome</th>
                <td>
                  <SelectProfessorC
                    professorAtual={professor}
                    setNewProfessor={setProfessor}
                    professoresAtuais={professores}
                    setNewProfessores={setProfessores}
                  />
                </td>
              </tr>
              <tr>
                <th>Curso</th>
                <td>
                  <SelectCurso
                    professorAtual={professor}
                    setNewProfessor={setProfessor}
                  />
                </td>
              </tr>
              <tr>
                <th>laboratório</th>
                <td>
                  <SelectLaboratorio
                    professorAtual={professor}
                    setNewProfessor={setProfessor}
                  />
                </td>
              </tr>
            </tbody>
          </table>
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

    return (
      <div className="infoCard">
        <InformacoesBaseDoProfessor />
        {/* <PreferencesTable
          preferencia1={preferencia}
          setPreferencia1={setPreferencia}
        /> */}
        {/* <DisciplinasMinistradasPeloProfessor /> */}
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
      <CRUDPageSelection
        defaultValue={options.constantValues.pageSelection.professores}
      />
      <Professores />
    </div>
  );
}

export default CRUDprofessors;
