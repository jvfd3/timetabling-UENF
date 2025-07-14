import { useEffect, useState } from "react";
import text from "../../../../config/frontText";
import myStyles from "../../../../config/myStyles";
import sqlDataFromJson from "../../../../DB/dataFromJSON";
import { sortRooms } from "../../../../components/Sorts/sortingFunctions";
import { RoomClasses } from "../../../../components/classTimesViewTable/SpecificClassTimeViewTables";
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
import NoSelectedObject from "../../../../components/Dumb/NoSelectedObject";

const defaultClassNames = myStyles.classNames.default;
const pageTexts = text.page.rooms;

function RoomSelection(roomStates) {
  const crudRoomStates = {
    ...roomStates,
    rooms: sortRooms(roomStates.rooms),
  };

  const roomCRUDFunctions = {
    createFunc: () => createRoom(crudRoomStates),
    readFunc: () => readRoom(crudRoomStates),
    updateFunc: () => updateRoom(crudRoomStates),
    deleteFunc: () => deleteRoom(crudRoomStates),
  };
  return (
    <div className={defaultClassNames.containerItemSelection}>
      <CRUDButtonsContainer {...roomCRUDFunctions} />
      <SelectRoomItem {...crudRoomStates} />
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
  const [room, setRoom] = useState(defaultRooms?.[0]);

  const roomStates = { rooms, setRooms, room, setRoom };
  const noRoom = { title: pageTexts.noSelectedObject };

  useEffect(() => {
    readRoom(roomStates);
  }, []);

  return (
    <div className={defaultClassNames.containerCards}>
      <RoomSelection {...roomStates} />
      {room ? <RoomCard {...roomStates} /> : <NoSelectedObject {...noRoom} />}
    </div>
  );
}

export default Rooms;
