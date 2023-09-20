//Express
const express = require('express')
const socket = require('socket.io')
const appExpress = express()
//Firebase
const { firebaseConfig } = require('./firebase')
const { initializeApp } = require('firebase/app')
const { getDatabase, ref, set, get } = require('firebase/database')

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

const server = appExpress.listen(3001, function () {
  console.log('server running on port 3001')
})

const io = socket(server, {
  cors: { credentials: true, origin: 'http://localhost:5173' },
})

// Save individual room to the DB
function persistRoomData(room) {
  set(ref(database, `rooms/${room.id}`), room).catch((error) => {
    console.error(`Failed to persist room ${room.id} data:`, error)
  })
}

//Local Rooms
let rooms = {}
//20 minutes in milliseconds
const ROOM_EXPIRATION_TIME = 10 * 60 * 1000
//Local ads
let ads = {
  bar: {
    name: 'Moes Bar',
    header: 'https://placehold.co/600x400',
    fullPage: 'https://placehold.co/800x800',
  },
  restaurant: {
    name: 'Red Lobster',
    header: 'https://placehold.co/600x400',
    fullPage: 'https://placehold.co/800x800',
  },
  default: {
    name: 'Default',
    header: 'https://placehold.co/600x400',
    fullPage: 'https://placehold.co/800x800',
  },
}

// Periodic Check
setInterval(() => {
  console.log('#### Checking Rooms Expiring Date ####')
  const currentTime = Date.now()

  Object.keys(rooms).forEach((roomId) => {
    const room = rooms[roomId]
    if (currentTime - room.startTime > ROOM_EXPIRATION_TIME) {
      //Check for overdue rooms and delete them
      if (currentTime - room.startTime > ROOM_EXPIRATION_TIME * 3) {
        console.log('#### Removing overdue rooms ####')
        // Remove this room from Firebase
        set(ref(database, `rooms/${roomId}`), null).catch((error) => {
          console.error(`Failed to remove room ${roomId} from database:`, error)
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
    }
  })
}, 30 * 1000) // Run every 30 seconds

async function initializeRoomsFromDatabase() {
  try {
    const snapshot = await get(ref(database, 'rooms'))
    if (snapshot.exists()) {
      const persistedRooms = snapshot.val()
      // Directly assign the object from Firebase to the rooms variable
      rooms = { ...persistedRooms }
    } else {
      console.log('No rooms data available in database.')
    }
  } catch (error) {
    console.error('Failed to fetch rooms data:', error)
  }
}

initializeRoomsFromDatabase()

async function initializeClientsFromDatabase() {
  try {
    const snapshot = await get(ref(database, 'clients'))
    if (snapshot.exists()) {
      const persistedClients = snapshot.val()
      // Directly assign the object from Firebase to the rooms variable
      ads = { ...persistedClients }
      console.log('Clients', ads)
    } else {
      console.log('No clients data available in database.')
    }
  } catch (error) {
    console.error('Failed to fetch clients data:', error)
  }
}

initializeClientsFromDatabase()

io.on('connection', (socket) => {
  socket.on('onLanding', async (data, ackCallback) => {
    ads[data]
      ? ackCallback({ res: true, data: ads[data] })
      : ackCallback({ res: false, data: ads['default'] })
  })
  socket.on('onPlayerLanding', async (data, ackCallback) => {
    ads[data]
      ? ackCallback({ data: ads[data] })
      : ackCallback({ data: ads['default'] })
  })

  //A Host Enters, is added to Room Array
  socket.on('create_room', (data) => {
    console.log(
      `${data.playerName} with socketId: ${socket.id} has created a room: ${data.roomId}`
    )
    const startTime = Date.now()
    const roomAds = ads[data.roomAds] ? ads[data.roomAds] : ads['default']
    rooms[data.roomId] = {
      id: data.roomId,
      name: data.roomName,
      ads: roomAds,
      hostId: data.playerId,
      hostName: data.playerName,
      startTime: startTime,
      onExtendedTime: false,
      players: [
        {
          id: data.playerId,
          name: data.playerName,
          avatar: data.playerAvatar,
          status: 'not-ready',
          points: 0,
        },
      ],
    }

    console.log('Rooms the socket is in:', socket.rooms)
    persistRoomData(rooms[data.roomId])
  })

  //A player Enters, is added to Room Array
  socket.on('join_room', async (data) => {
    let roomToJoin = rooms[data.roomId]

    if (roomToJoin) {
      roomToJoin.players.push({
        id: data.playerId,
        name: data.playerName,
        avatar: data.playerAvatar,
        status: 'not-ready',
        points: 0,
      })

      persistRoomData(rooms[data.roomId])
    } else {
      console.log('No such Room!')
    }
  })

  socket.on('onLobby', (data) => {
    //A player enters the lobby and Join the Socket.io Room
    socket.join(data)
    let playersRoom = rooms[data]
    //Send Updated Room
    io.in(data).emit('player_joined', playersRoom)
  })

  socket.on('player_status_change', (data) => {
    //A player has changed his status
    let roomTochange = rooms[data.roomId]

    let playerToChange = roomTochange.players.find(
      (player) => player.id === data.id
    )
    playerToChange.status = data.status
    //Send Updated Room
    io.in(data.roomId).emit('player_update', roomTochange)
    persistRoomData(rooms[data.roomId])
  })

  socket.on('game_selected', (data) => {
    io.in(data.roomId).emit('game_to_players', data.game)
  })

  socket.on('onGame', (data) => {
    //Player Enters Game Page
    socket.join(data.gameId)
    let playersRoom = rooms[data.roomId]
    //Sends The Room the players are in
    io.in(data.gameId).emit('game_start', playersRoom)
  })

  socket.on('game_finished', (data) => {
    //Game has ended, Player's status and points updated
    console.log('game finished!')
    let roomTochange = rooms[data.roomId]

    let playerToChange = roomTochange.players.find(
      (player) => player.id === data.id
    )
    playerToChange.points += data.points
    playerToChange.status = data.status

    //Send Updated Room
    io.in(data.roomId).emit('player_update', roomTochange)
    persistRoomData(rooms[data.roomId])
  })

  socket.on('end_room', (data) => {
    console.log(`${rooms[data]} is going to end the room!`)
    // Remove this room from Firebase
    set(ref(database, `rooms/${data}`), null).catch((error) => {
      console.error(`Failed to remove room ${data} from database:`, error)
    })

    // Remove room from the local rooms object
    delete rooms[data]
  })

  socket.on('keep_playing', (data) => {
    const newStartTime = Date.now()
    rooms[data].startTime = newStartTime
    rooms[data].onExtendedTime = true
    console.log(`${rooms[data]} is going to keep playing, timer reset!`)
    persistRoomData(rooms[data])
  })
})
