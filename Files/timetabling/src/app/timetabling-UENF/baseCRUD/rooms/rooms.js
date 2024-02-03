import { useEffect, useState } from "react";
import configInfo from "../../../../config/configInfo";
import CRUDPageSelection from "../../../../components/PageSelect";
import { RoomClasses } from "../../../../components/classTimesViewTable/SpecificClassTimeViewTables";
import { sqlDataFromJson } from "../../../../DB/local/dataFromJSON";
import { CRUDButtonsContainer } from "../../../../components/CRUDButtons";
import {
  SelectRoomItem,
  SelectRoomBlock,
} from "../../../../components/mySelects";
import {
  TextInputRoomId,
  TextInputRoomCode,
  TextInputRoomCapacity,
  TextInputRoomDescription,
} from "../../../../components/MyTextFields";
import {
  createRoom,
  readRoom,
  updateRoom,
  deleteRoom,
} from "../../../../helpers/CRUDFunctions/roomCRUD";

const classNames = {
  selectionBar: "selectionBar",
  showBasicDataCard: "showBasicDataCard",
  showBasicDataTable: "showBasicDataTable",
  infoCard: "infoCard",
  CRUDContainComponents: "CRUDContainComponents",
  background: "background",
};

const baseInfoCard = {
  title: "INFORMAÇÕES DA SALA",
  tableTitles: {
    block: "Bloco",
    description: "Descrição",
    code: "Código",
    capacity: "Capacidade",
    id: "ID",
  },
};

function RoomSelection(roomStates) {
  const roomCRUDFunctions = {
    createFunc: () => createRoom(roomStates),
    readFunc: () => readRoom(roomStates),
    updateFunc: () => updateRoom(roomStates),
    deleteFunc: () => deleteRoom(roomStates),
  };
  return (
    <div className={classNames.selectionBar}>
      <CRUDButtonsContainer {...roomCRUDFunctions} />
      <SelectRoomItem {...roomStates} />
    </div>
  );
}

function BaseInfoCard(roomStates) {
  return (
    <div className={classNames.showBasicDataCard}>
      <h3>{baseInfoCard.title}</h3>
      <table className={classNames.showBasicDataTable}>
        <tbody>
          <tr>
            <th>{baseInfoCard.tableTitles.block}</th>
            <td>
              <SelectRoomBlock {...roomStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.tableTitles.description}</th>
            <td>
              <TextInputRoomDescription {...roomStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.tableTitles.code}</th>
            <td>
              <TextInputRoomCode {...roomStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.tableTitles.capacity}</th>
            <td>
              <TextInputRoomCapacity {...roomStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.tableTitles.id}</th>
            <td>
              <TextInputRoomId {...roomStates} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function RoomCard(roomStates) {
  return (
    <div className={classNames.infoCard}>
      <BaseInfoCard {...roomStates} />
      <RoomClasses {...roomStates.room} />
    </div>
  );
}

function Rooms() {
  const defaultRooms = sqlDataFromJson.salas ?? [];

  const [rooms, setRooms] = useState(defaultRooms);
  const [room, setRoom] = useState(
    rooms?.[configInfo.defaultIndexes.room] ?? rooms?.[0]
  );

  const roomStates = { rooms, setRooms, room, setRoom };

  useEffect(() => {
    readRoom(roomStates);
  }, []);

  return (
    <div className={classNames.CRUDContainComponents}>
      <RoomSelection {...roomStates} />
      <RoomCard {...roomStates} />
    </div>
  );
}

function CRUDrooms() {
  const defaultPageValue = configInfo.pageSelection.rooms;
  return (
    <div className={classNames.background}>
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Rooms />
    </div>
  );
}

export default CRUDrooms;
