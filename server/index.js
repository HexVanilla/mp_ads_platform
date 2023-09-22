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

console.log('db', database)
//UID
const { v4: uuidv4 } = require('uuid')

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
const ROOM_EXPIRATION_TIME = 20 * 60 * 1000
//Local ads
let ads = {}
//Local avatars
let avatars = []
//Local Games
let games = {
  trivia: {
    name: 'Trivia',
    img: 'https://firebasestorage.googleapis.com/v0/b/multiplayerplatform-71d9a.appspot.com/o/Games%2Ftrivia.jpg?alt=media&token=13adcab0-2030-4aec-ac76-88ed904924dd',
  },
}
//Trivia Game
let triviaGameQuestions
let triviaPlayerIdToQuestion = {}

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
}, 60 * 1000) // Run every minute

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

async function initializeAvatarsFromDatabase() {
  try {
    const snapshot = await get(ref(database, 'avatars'))
    if (snapshot.exists()) {
      const persistedAvatars = snapshot.val()
      // Directly assign the object from Firebase to the rooms variable
      avatars = { ...persistedAvatars }
      console.log('Avatars', avatars)
    } else {
      console.log('No Avatars data available in database.')
    }
  } catch (error) {
    console.error('Failed to fetch Avatars data:', error)
  }
}
initializeAvatarsFromDatabase()

async function initializeTriviaQuestionsFromDb() {
  try {
    const snapshot = await get(ref(database, 'questions'))
    if (snapshot.exists()) {
      const persistedQuestions = snapshot.val()
      // Directly assign the object from Firebase to the rooms variable
      triviaGameQuestions = { ...persistedQuestions }
      //console.log('triviaGameQuestions', triviaGameQuestions)
    } else {
      console.log('No Trivia Questions data available in database.')
    }
  } catch (error) {
    console.error('Failed to fetch Trivia Questions data:', error)
  }
}
initializeTriviaQuestionsFromDb()

//Sockets

io.on('connection', async (socket) => {
  const sockets = await io.fetchSockets()

  console.log(`A user connected. Total connections: ${sockets.length}`)

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

  socket.on('avatarSelector', async (ackCallback) => {
    ackCallback(avatars)
  })

  //A Host Enters, is added to Room Array
  socket.on('create_room', async (data, ackCallback) => {
    console.log(
      `${data.playerName} with socketId: ${socket.id} has created a room: ${data.roomId}`
    )

    const startTime = Date.now()
    const roomAds = ads[data.roomAds] ? ads[data.roomAds] : ads['default']
    const uniqueId = uuidv4()
    rooms[data.roomId] = {
      id: data.roomId,
      name: data.roomName,
      ads: roomAds,
      hostId: uniqueId,
      hostName: data.playerName,
      startTime: startTime,
      onExtendedTime: false,
      players: [
        {
          id: uniqueId,
          name: data.playerName,
          avatar: data.playerAvatar,
          status: 'not-ready',
          sessionPoints: 0,
          perGamePoints: 0,
        },
      ],
    }
    ackCallback({ id: uniqueId })

    console.log('Rooms the socket is in:', socket.rooms)
    persistRoomData(rooms[data.roomId])
  })

  //A player Enters, is added to Room Array
  socket.on('join_room', async (data, ackCallback) => {
    let roomToJoin = rooms[data.roomId]
    console.log(
      `${data.playerName} with socketId: ${socket.id} has created a room: ${data.roomId}`
    )
    const uniqueId = uuidv4()
    if (roomToJoin) {
      roomToJoin.players.push({
        id: uniqueId,
        name: data.playerName,
        avatar: data.playerAvatar,
        status: 'not-ready',
        sessionPoints: 0,
        perGamePoints: 0,
      })

      ackCallback({ id: uniqueId })
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
    io.in(data).emit('player_joined', {
      playersRoom: playersRoom,
      avatars: avatars,
      games: games,
    })
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
    //check the game exists
    if (games[data.game]) {
      triviaPlayerIdToQuestion = {}
      io.in(data.roomId).emit('game_to_players', games[data.game])
    }
  })

  socket.on('onTriviaGame', async (data, ackCallback) => {
    //Player Enters Game Page
    socket.join(data.gameId)
    let playersRoom = rooms[data.roomId]
    let playerToChange = playersRoom.players.find(
      (player) => player.id === data.playerId
    )
    playerToChange.perGamePoints = 0

    triviaPlayerIdToQuestion[data.playerId] = {
      id: data.playerId,
      questionNumber: 0,
    }

    console.log(triviaPlayerIdToQuestion)

    ackCallback({ room: playersRoom })
  })

  socket.on('trivia_next_question', (data, ackCallback) => {
    console.log(triviaPlayerIdToQuestion[data.playerId])
    if (triviaPlayerIdToQuestion[data.playerId]) {
      ackCallback({
        question:
          triviaGameQuestions[
            triviaPlayerIdToQuestion[data.playerId].questionNumber
          ].question,
        options:
          triviaGameQuestions[
            triviaPlayerIdToQuestion[data.playerId].questionNumber
          ].options,
        questionNumber: triviaPlayerIdToQuestion[data.playerId].questionNumber,
      })
    }
  })

  socket.on('trivia_check_question', (data, ackCallback) => {
    let roomTochange = rooms[data.roomId]
    console.log(
      triviaGameQuestions[
        triviaPlayerIdToQuestion[data.playerId].questionNumber
      ].answer,
      data.answer
    )
    let playerToChange = roomTochange.players.find(
      (player) => player.id === data.playerId
    )

    if (triviaPlayerIdToQuestion[data.playerId].questionNumber <= 19) {
      if (
        triviaGameQuestions[
          triviaPlayerIdToQuestion[data.playerId].questionNumber
        ].answer === data.answer
      ) {
        playerToChange.perGamePoints++
        ackCallback({ msg: 'correct' })
      } else {
        ackCallback({ msg: 'wrong' })
      }
    } else {
      ackCallback({ msg: 'trivia ended' })
    }
    triviaPlayerIdToQuestion[data.playerId].questionNumber++
  })

  socket.on('game_finished', (data, ackCallback) => {
    //Game has ended, Player's status and points updated
    console.log('game finished!')
    let roomTochange = rooms[data.roomId]

    let playerToChange = roomTochange.players.find(
      (player) => player.id === data.id
    )
    playerToChange.status = data.status
    playerToChange.sessionPoints += playerToChange.perGamePoints

    //Send Updated Room Game
    ackCallback({ room: roomTochange })

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
