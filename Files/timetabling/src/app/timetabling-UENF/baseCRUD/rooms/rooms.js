import { useEffect, useState } from "react";
import text from "../../../../config/frontText";
import myStyles from "../../../../config/myStyles";
import configInfo from "../../../../config/configInfo";
import { CRUDButtonsContainer } from "../../../../components/CRUDButtons";
import { sqlDataFromJson } from "../../../../DB/local/dataFromJSON";
import { RoomClasses } from "../../../../components/classTimesViewTable/SpecificClassTimeViewTables";
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

const defaultClassNames = myStyles.classNames.default;
const pageTexts = text.page.rooms;

function RoomSelection(roomStates) {
  const roomCRUDFunctions = {
    createFunc: () => createRoom(roomStates),
    readFunc: () => readRoom(roomStates),
    updateFunc: () => updateRoom(roomStates),
    deleteFunc: () => deleteRoom(roomStates),
  };
  return (
    <div className={defaultClassNames.containerItemSelection}>
      <CRUDButtonsContainer {...roomCRUDFunctions} />
      <SelectRoomItem {...roomStates} />
    </div>
  );
}

function BaseInfoCard(roomStates) {
  return (
    <div className={defaultClassNames.containerCardBaseInfo}>
      <h3>{pageTexts.title}</h3>
      <table className={defaultClassNames.componentTable}>
        <tbody>
          <tr>
            <th>{pageTexts.tableTitles.block}</th>
            <td>
              <SelectRoomBlock {...roomStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.description}</th>
            <td>
              <TextInputRoomDescription {...roomStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.code}</th>
            <td>
              <TextInputRoomCode {...roomStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.capacity}</th>
            <td>
              <TextInputRoomCapacity {...roomStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.id}</th>
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
    <div className={defaultClassNames.containerCardsHolder}>
      <BaseInfoCard {...roomStates} />
      <RoomClasses {...roomStates.room} />
    </div>
  );
}

function Rooms() {
  const defaultRooms = sqlDataFromJson.salas ?? [];

  const [rooms, setRooms] = useState(defaultRooms);
  const [room, setRoom] = useState(null);

  const roomStates = { rooms, setRooms, room, setRoom };

  useEffect(() => {
    readRoom(roomStates);
  }, []);

  return (
    <div className={defaultClassNames.containerCards}>
      <RoomSelection {...roomStates} />
      <RoomCard {...roomStates} />
    </div>
  );
}

export default Rooms;
