import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import {
  getItemIndexInListById,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "room";

function createRoom({ rooms, setRooms, room, setRoom }) {
  function insertNewRoomFromDB(newId) {
    const newRoom = { ...room, id: newId };
    setRoom(newRoom);
    setRooms([...rooms, newRoom]);
  }

  defaultDBCreate(itemName, room)
    .then(insertNewRoomFromDB)
    .catch(defaultHandleError);
}

function readRoom({ setRooms, setRoom }) {
  function insertNewRoomsFromDB(roomsFromDB) {
    const lastRoom = roomsFromDB[roomsFromDB.length - 1];
    setRoom(lastRoom);
    setRooms(roomsFromDB);
  }

  defaultDBRead(itemName).then(insertNewRoomsFromDB).catch(defaultHandleError);
}

function updateRoom({ rooms, setRooms, room }) {
  function updateRoomOnList(newRoom) {
    const updatedRooms = replaceNewItemInListById(newRoom, rooms);
    setRooms(updatedRooms);
  }

  defaultDBUpdate(itemName, room)
    .then(updateRoomOnList)
    .catch(defaultHandleError);
}

function deleteRoom({ rooms, setRooms, room, setRoom }) {
  function deleteRoomOnList(deletedRoom) {
    if (deletedRoom) {
      let deletedRoomList = rooms;
      deletedRoomList = removeItemInListById(deletedRoom, rooms);
      setRooms(deletedRoomList);
      const index = getItemIndexInListById(deletedRoom, rooms);
      let newRoom = null;
      if (index > 0) {
        newRoom = rooms[index - 1];
      } else if (deletedRoomList.length > 0) {
        newRoom = rooms[0];
      } else {
        console.error(
          "Uai, não tem mais professores! Como diria o Silvio Santos: 'Está certo disto?'"
        );
      }
      setRoom(newRoom);
    }
  }

  defaultDBDelete(itemName, room)
    .then(deleteRoomOnList)
    .catch(defaultHandleError);
}

export { createRoom, readRoom, updateRoom, deleteRoom };
