// database.js
const { ref, set, get } = require('firebase/database')
const { admin } = require('./config/config')
console.log('admin', admin)
const database = admin.database()

async function getSnapshot(reference) {
  const snapshot = await database.ref(reference).get()
  return snapshot
}
// Save individual room to the DB
function persistRoomData(room) {
  console.log('persisted')
  database.ref(`rooms/${room.id}`).set(room, (error) => {
    if (error) {
      console.error(`Failed to persist room ${room.id} data:`, error)
    }
  })
}
//check for expired rooms
const ROOM_EXPIRATION_TIME = 20 * 60 * 1000
function checkForExpiredRooms(rooms, currentTime, io) {
  if (rooms !== undefined) {
    Object.keys(rooms).forEach((roomId) => {
      const room = rooms[roomId]
      if (currentTime - room.startTime > ROOM_EXPIRATION_TIME) {
        //Check for overdue rooms and delete them
        if (currentTime - room.startTime > ROOM_EXPIRATION_TIME * 3) {
          console.log('#### Removing overdue rooms ####')
          // Remove this room from Firebase
          database.ref(`rooms/${room.id}`).set(null, (error) => {
            if (error) {
              console.error(`Failed to delete the room ${room.id} data:`, error)
            }
          })
          // Remove room from the local rooms object
          delete rooms[roomId]
        }

        if (room.onExtendedTime) {
          // Notify the clients in this room
          io.in(room.id).emit('room_expired_hard')
        } else {
          // Notify the clients in this room
          io.in(room.id).emit('room_expired')
        }
      } else {
      }
    })
  }
}

// Remove this room from Firebase
function removeRoom(roomId) {
  database.ref(`rooms/${roomId}`).set(null, (error) => {
    if (error) {
      console.error(`Failed to delete the room ${roomId} data:`, error)
    }
  })
}

module.exports = {
  database,
  getSnapshot,
  persistRoomData,
  checkForExpiredRooms,
  removeRoom,
}
