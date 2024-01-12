import "./salas.css";
import { useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { sqlDataFromJson } from "../../../DB/local/dataFromJSON";
import { SelectRoomItem, SelectRoomBlock } from "../../../components/mySelects";
import { getTurmasData } from "../../../DB/retrieveData";
import { splitTurmas } from "../../../helpers/conflicts/auxiliarConflictsFunctions";
import {
  TextInputRoomCapacity,
  TextInputRoomCode,
  TextInputRoomDescription,
  TextInputRoomId,
} from "../../../components/MyTextFields";
import {
  createRoom,
  readRoom,
  updateRoom,
  deleteRoom,
} from "../../../helpers/CRUDFunctions/roomCRUD";
import { CRUDButtonsContainer } from "../../../components/CRUDButtons";

function RoomSelection(roomStates) {
  const roomCRUDFunctions = {
    createFunc: () => createRoom(roomStates),
    readFunc: () => readRoom(roomStates),
    updateFunc: () => updateRoom(roomStates),
    deleteFunc: () => deleteRoom(roomStates),
  };
  return (
    <div className="SelectionBar">
      <CRUDButtonsContainer {...roomCRUDFunctions} />
      <SelectRoomItem {...roomStates} />
    </div>
  );
}

function RoomBaseInfo(myRoomsStates) {
  return (
    <div className="showBasicDataCard">
      <h3>INFORMAÇÕES DA SALA</h3>
      <table className="showBasicDataTable">
        <thead>
          <tr>
            <th>Chave</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Bloco</th>
            <td>
              <SelectRoomBlock {...myRoomsStates} />
            </td>
            {/* For debug purposes */}
            {/* <td>{bloco}</td> */}
          </tr>
          <tr>
            <th>Descrição</th>
            <td>
              <TextInputRoomDescription {...myRoomsStates} />
            </td>
            {/* For debug purposes */}
            {/* <td>{descricao}</td> */}
          </tr>
          <tr>
            <th>Código</th>
            {/* <td>{codigo}</td> */}
            <td>
              <TextInputRoomCode {...myRoomsStates} />
            </td>
            {/* For debug purposes */}
            {/* <td>{codigo}</td> */}
          </tr>
          <tr>
            <th>Capacidade</th>
            <td>
              <TextInputRoomCapacity {...myRoomsStates} />
            </td>
            {/* For debug purposes */}
            {/* <td>{capacidade}</td> */}
          </tr>
          <tr>
            <th>ID</th>
            <td>
              <TextInputRoomId {...myRoomsStates} />
            </td>
            {/* For debug purposes */}
            {/* <td>{id}</td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ClassesInRoom(room) {
  const { id } = room;
  /* function getTurmas(id) {
        let horarios = sqlDataFromJson.classtimes;
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
  let classes = getTurmasData();
  let splittedClasses = splitTurmas(classes);
  let turmasNestaSala = splittedClasses.filter((splittedClass) => {
    let found = splittedClass.sala?.id === id;
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

function RoomCard(myRoomsStates) {
  return (
    <div className="infoCard">
      <RoomBaseInfo {...myRoomsStates} />
      <ClassesInRoom {...myRoomsStates.room} />
    </div>
  );
}

function Rooms() {
  let roomsFromJSON = sqlDataFromJson.rooms;

  const [rooms, setRooms] = useState(roomsFromJSON);
  const [room, setRoom] = useState(roomsFromJSON[3]);

  let myRoomsStates = { rooms, setRooms, room, setRoom };

  return (
    <div className="CRUDContainComponents">
      <RoomSelection {...myRoomsStates} />
      <RoomCard {...myRoomsStates} />
    </div>
  );
}

function CRUDrooms() {
  let defaultPageValue = options.constantValues.pageSelection.classrooms;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Rooms />
    </div>
  );
}

export default CRUDrooms;
