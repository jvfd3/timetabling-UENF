import { useState } from "react";
// import assets from "../../assets/imagesImport";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { allLocalJsonData } from "../../../DB/local/dataFromJSON";
import "./salas.css";
import { SalaItemSelection } from "../../../components/mySelects";
import { getTurmasData } from "../../../DB/retrieveData";
import { splitTurmas } from "../../../helpers/conflicts/auxiliarConflictsFunctions";

function SalaSelection({ mySalasStates }) {
  return (
    <div
      className="SelectionBar"
      onWheel={(event) => {
        // let itemStates = [salasFromJson, setSala, sala];
        // scrollThroughSalas(event, itemStates);
      }}
    >
      <SalaItemSelection mySalasStates={mySalasStates} />
    </div>
  );
}

function InformacoesBaseDaSala(mySalasStates) {
  const { sala } = mySalasStates;
  const { id, capacidade, bloco, codigo, descricao } = sala;
  // {"id":  5, "capacidade":  24,  "bloco": "P5",           "codigo": "112",  "descricao": "P5"                                  },

  return (
    <div className="showBasicDataCard">
      <h3>INFORMAÇÕES DA SALA</h3>
      <table className="showBasicDataTable">
        <tbody>
          <tr>
            <th>Bloco</th>
            <td>{`${bloco} (${descricao})`}</td>
          </tr>
          <tr>
            <th>Código</th>
            <td>{codigo}</td>
          </tr>
          <tr>
            <th>Capacidade</th>
            <td>{capacidade}</td>
          </tr>
          {/*  <tr>
            <th>ID</th>
            <td>{id}</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

function TurmasNaSala(lSala) {
  /* function getTurmas(id) {
        let horarios = allLocalJsonData.SQL.horarios;
        let horariosNestaSala = [];
        for (const chaveTurma in horarios) {
          let horario = horarios[chaveTurma];
          if (horario.idSala === id) {
            horariosNestaSala.push(horario);
          }
        }
        let fullInfoFromTurmasNaSala =
          appendInfoFromTurmasUsingHorarios(horariosNestaSala);

        let dias = options.constantValues.days;

        fullInfoFromTurmasNaSala.sort((a, b) => {
          let diaA = dias.find((dia) => dia.value === a.dia);
          let diaB = dias.find((dia) => dia.value === b.dia);
          if (dias.indexOf(diaA) < dias.indexOf(diaB)) {
            return -1;
          }
          if (dias.indexOf(diaA) > dias.indexOf(diaB)) {
            return 1;
          }
          if (a.horaInicio < b.horaInicio) {
            return -1;
          }
          if (a.horaInicio > b.horaInicio) {
            return 1;
          }
          return 0;
        });
        return fullInfoFromTurmasNaSala;
      } */
  let idSala = lSala.id;
  let classes = getTurmasData();
  let splittedClasses = splitTurmas(classes);
  let turmasNestaSala = splittedClasses.filter((splittedClass) => {
    let found = splittedClass.sala?.id === idSala;
    return found;
  });
  return turmasNestaSala.length === 0 ? (
    <div className="showBasicDataCard">
      <h5>Não há turmas nesta sala</h5>
    </div>
  ) : (
    <div className="showBasicDataCard">
      <h4>TURMAS NESTA SALA</h4>

      <table className="showBasicDataTable">
        <thead>
          <tr>
            <th>idTurma</th>
            <th>idHorario</th>
            <th>Ano.Semestre</th>
            <th>Disciplina</th>
            <th>Professor</th>
            <th>Dia</th>
            <th>Hora Início</th>
            <th>Duração</th>
          </tr>
        </thead>
        <tbody>
          {turmasNestaSala.map((turma, i) => {
            function checkIndefinition(value) {
              return value ? value : "Indef.";
            }

            return (
              <tr key={i}>
                <td>{turma.idTurma}</td>
                <td>{turma.idHorario}</td>
                <td>
                  {turma.ano}.{turma.semestre}
                </td>
                <td>
                  {turma.codigoDisciplina && turma.apelidoDisciplina
                    ? `${turma.codigoDisciplina} - ${turma.apelidoDisciplina}`
                    : "Indef."}
                </td>
                <td>{checkIndefinition(turma.apelidoProfessor)}</td>
                <td>{checkIndefinition(turma.dia)}</td>
                <td>{checkIndefinition(turma.horaInicio)}</td>
                <td>{checkIndefinition(turma.duracao)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SalaCard(mySalasStates) {
  return (
    <div className="infoCard">
      <InformacoesBaseDaSala {...mySalasStates} />
      <TurmasNaSala {...mySalasStates.sala} />
    </div>
  );
}

function Salas() {
  let salasFromJson = allLocalJsonData.SQL.salas;

  const [salas, setSalas] = useState(salasFromJson);
  const [sala, setSala] = useState(salasFromJson[20]);

  let mySalasStates = { salas, setSalas, sala, setSala };

  return (
    <div className="CRUDContainComponents">
      <SalaSelection mySalasStates={mySalasStates} />
      <SalaCard {...mySalasStates} />
    </div>
  );
}

function CRUDrooms() {
  return (
    <div className="background">
      <CRUDPageSelection
        defaultValue={options.constantValues.pageSelection.classrooms}
      />
      <Salas />
    </div>
  );
}

export default CRUDrooms;
