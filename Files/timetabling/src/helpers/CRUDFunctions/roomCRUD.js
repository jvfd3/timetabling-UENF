function createRoom(roomStates) {
  console.log("createRoom", roomStates.room.id);
}

function readRoom(roomStates) {
  console.log("readRoom", roomStates.room.id);
}

function updateRoom(roomStates) {
  console.log("updateRoom", roomStates.room.id);
}

function deleteRoom(roomStates) {
  console.log("deleteRoom", roomStates.room.id);
}

export { createRoom, readRoom, updateRoom, deleteRoom };
