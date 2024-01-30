import "./salas.css";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { useEffect, useState } from "react";
import { SelectRoomItem, SelectRoomBlock } from "../../../components/mySelects";
import { CRUDButtonsContainer } from "../../../components/CRUDButtons";
import { sqlDataFromJson } from "../../../DB/local/dataFromJSON";
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
import { ClassesInRoom } from "../../../components/classTimesViewTable/SpecificClassTimeViewTables";

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

function RoomBaseInfo(roomStates) {
  return (
    <div className="showBasicDataCard">
      <h3>INFORMAÇÕES DA SALA</h3>
      <table className="showBasicDataTable">
        {/* <thead>
          <tr>
            <th>Chave</th>
            <th>Valor</th>
          </tr>
        </thead> */}
        <tbody>
          <tr>
            <th>Bloco</th>
            <td>
              <SelectRoomBlock {...roomStates} />
            </td>
            {/* For debug purposes */}
            {/* <td>{bloco}</td> */}
          </tr>
          <tr>
            <th>Descrição</th>
            <td>
              <TextInputRoomDescription {...roomStates} />
            </td>
            {/* For debug purposes */}
            {/* <td>{descricao}</td> */}
          </tr>
          <tr>
            <th>Código</th>
            {/* <td>{codigo}</td> */}
            <td>
              <TextInputRoomCode {...roomStates} />
            </td>
            {/* For debug purposes */}
            {/* <td>{codigo}</td> */}
          </tr>
          <tr>
            <th>Capacidade</th>
            <td>
              <TextInputRoomCapacity {...roomStates} />
            </td>
            {/* For debug purposes */}
            {/* <td>{capacidade}</td> */}
          </tr>
          <tr>
            <th>ID</th>
            <td>
              <TextInputRoomId {...roomStates} />
            </td>
            {/* For debug purposes */}
            {/* <td>{id}</td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function RoomCard(roomStates) {
  return (
    <div className="infoCard">
      <RoomBaseInfo {...roomStates} />
      <ClassesInRoom {...roomStates.room} />
    </div>
  );
}

function Rooms() {
  const defaultRooms = sqlDataFromJson.salas ?? [];

  const [rooms, setRooms] = useState(defaultRooms);
  const [room, setRoom] = useState(rooms?.[1] ?? rooms?.[0]);

  const roomStates = { rooms, setRooms, room, setRoom };

  useEffect(() => {
    readRoom(roomStates);
  }, []);

  return (
    <div className="CRUDContainComponents">
      <RoomSelection {...roomStates} />
      <RoomCard {...roomStates} />
    </div>
  );
}

function CRUDrooms() {
  const defaultPageValue = options.constantValues.pageSelection.classrooms;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Rooms />
    </div>
  );
}

export default CRUDrooms;
