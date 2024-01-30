import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import {
  removeItemInListById,
  getItemIndexInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "room";

function createRoom({ rooms, setRooms, room, setRoom }) {
  function getNewRoom(newId) {
    const newRoom = { ...room, id: newId };
    return newRoom;
  }

  function insertNewRoomFromDB(newId) {
    const newRoom = getNewRoom(newId);
    setRoom(newRoom);
    setRooms([...rooms, newRoom]);
  }

  defaultDBCreate(itemName, room)
    .then(insertNewRoomFromDB)
    .catch(defaultHandleError);
}

function readRoom({ setRooms, setRoom, room }) {
  function insertNewRoomsFromDB(roomsFromDB) {
    const index = getItemIndexInListById(room, roomsFromDB);
    const keepCurrentRoom = roomsFromDB?.[index];
    const lastRoom = roomsFromDB[roomsFromDB.length - 1];
    const showedRoom = keepCurrentRoom ?? lastRoom;
    setRoom(showedRoom);
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
      const deletedRoomList = removeItemInListById(deletedRoom, rooms);
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
      setRooms(deletedRoomList);
    }
  }

  defaultDBDelete(itemName, room)
    .then(deleteRoomOnList)
    .catch(defaultHandleError);
}

export { createRoom, readRoom, updateRoom, deleteRoom };
