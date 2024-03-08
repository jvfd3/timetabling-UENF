import emptyObjects from "../../config/emptyObjects";
import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/defaultAxiosFunctions";
import {
  refreshShownItem,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "room";

function createRoom({ setRooms, setRoom }) {
  const emptyRoom = emptyObjects.room;

  function getNewRoom(newId) {
    const newRoom = { ...emptyRoom, id: newId };
    return newRoom;
  }

  function insertNewRoomFromDB(newId) {
    const newRoom = getNewRoom(newId);
    setRoom(newRoom);
    setRooms((oldRooms) => [...oldRooms, newRoom]);
  }

  defaultDBCreate(itemName, emptyRoom)
    .then(insertNewRoomFromDB)
    .catch(defaultHandleError);
}

function readRoom({ rooms, setRooms, setRoom }) {
  function insertNewRoomsFromDB(roomsFromDB) {
    setRooms(roomsFromDB);
    setRoom((oldRoom) => {
      const showedRoom = refreshShownItem(oldRoom, rooms, roomsFromDB);
      return showedRoom;
    });
  }

  defaultDBRead(itemName).then(insertNewRoomsFromDB).catch(defaultHandleError);
}

function updateRoom({ setRooms, room }) {
  function updateRoomOnList(newRoom) {
    // setRoom(newRoom);
    setRooms((oldRooms) => {
      const updatedRooms = replaceNewItemInListById(newRoom, oldRooms);
      return updatedRooms;
    });
  }

  defaultDBUpdate(itemName, room)
    .then(updateRoomOnList)
    .catch(defaultHandleError);
}

function deleteRoom({ rooms, setRooms, room, setRoom }) {
  function deleteRoomOnList(deletedRoom) {
    if (deletedRoom) {
      setRooms((oldRooms) => {
        const updatedRooms = removeItemInListById(deletedRoom, oldRooms);
        const showedRoom = refreshShownItem(room, rooms, updatedRooms);
        setRoom(showedRoom);
        return updatedRooms;
      });
    }
  }

  defaultDBDelete(itemName, room)
    .then(deleteRoomOnList)
    .catch(defaultHandleError);
}

export { createRoom, readRoom, updateRoom, deleteRoom };
