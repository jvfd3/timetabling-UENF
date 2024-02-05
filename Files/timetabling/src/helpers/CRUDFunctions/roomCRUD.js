import emptyObjects from "../../config/emptyObjects";
import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import {
  refreshShownItem,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "room";

function createRoom({ rooms, setRooms, room, setRoom }) {
  const emptyRoom = emptyObjects.room;

  function getNewRoom(newId) {
    const newRoom = { ...emptyRoom, id: newId };
    return newRoom;
  }

  function insertNewRoomFromDB(newId) {
    const newRoom = getNewRoom(newId);
    const newRooms = [...rooms, newRoom];
    setRoom(newRoom);
    setRooms(newRooms);
  }

  defaultDBCreate(itemName, emptyRoom)
    .then(insertNewRoomFromDB)
    .catch(defaultHandleError);
}

function readRoom({ rooms, setRooms, setRoom, room }) {
  function insertNewRoomsFromDB(roomsFromDB) {
    setRooms(roomsFromDB);

    const showedRoom = refreshShownItem(room, rooms, roomsFromDB);
    setRoom(showedRoom);
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
      const showedRoom = refreshShownItem(room, deletedRoomList);
      setRoom(showedRoom);
      setRooms(deletedRoomList);
    }
  }

  defaultDBDelete(itemName, room)
    .then(deleteRoomOnList)
    .catch(defaultHandleError);
}

export { createRoom, readRoom, updateRoom, deleteRoom };
