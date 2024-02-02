import options from "../../DB/local/options";
import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import {
  keepOldItem,
  removeItemInListById,
  getItemIndexInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "room";

function createRoom({ rooms, setRooms, room, setRoom }) {
  function getNewRoom(newId) {
    const emptyRoom = options.emptyObjects.room;
    const newRoom = { ...emptyRoom, id: newId };
    return newRoom;
  }

  function insertNewRoomFromDB(newId) {
    const newRoom = getNewRoom(newId);
    const newRooms = [...rooms, newRoom];
    setRoom(newRoom);
    setRooms(newRooms);
  }

  defaultDBCreate(itemName, room)
    .then(insertNewRoomFromDB)
    .catch(defaultHandleError);
}

function readRoom({ setRooms, setRoom, room }) {
  function insertNewRoomsFromDB(roomsFromDB) {
    const showedRoom = keepOldItem(room, roomsFromDB);
    setRoom(showedRoom);
    setRooms(roomsFromDB);
  }

  defaultDBRead(itemName).then(insertNewRoomsFromDB).catch(defaultHandleError);
}

function updateRoom({ rooms, setRooms, room }) {
  function updateRoomOnList(newRoom) {
    const updatedRooms = replaceNewItemInListById(newRoom, rooms);
    // setRoom(newRoom);
    setRooms(updatedRooms);
  }

  defaultDBUpdate(itemName, room)
    .then(updateRoomOnList)
    .catch(defaultHandleError);
}

function deleteRoom({ rooms, setRooms, room, setRoom }) {
  function deleteRoomOnList(deletedRoom) {
    if (deletedRoom) {
      const deletedRoomList = removeItemInListById(deletedRoom, rooms);
      const showedRoom = keepOldItem(room, deletedRoomList);
      setRoom(showedRoom);
      setRooms(deletedRoomList);
    }
  }

  defaultDBDelete(itemName, room)
    .then(deleteRoomOnList)
    .catch(defaultHandleError);
}

export { createRoom, readRoom, updateRoom, deleteRoom };
