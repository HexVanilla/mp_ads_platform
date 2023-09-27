//Express
const express = require('express')
const socket = require('socket.io')
const appExpress = express()
//Ports
const { PORT, ORIGIN } = require('./config/portConfig')
//Firebase
const {
  database,
  persistRoomData,
  checkForExpiredRooms,
  removeRoom,
} = require('./database')
//UID
const { v4: uuidv4 } = require('uuid')
//Load From DB
const {
  initializeRoomsFromDatabase,
  initializeClientsFromDatabase,
  initializeAvatarsFromDatabase,
  initializeTriviaQuestionsFromDb,
} = require('./Loaders')

const server = appExpress.listen(PORT, function () {
  console.log('server running on port 3001')
})

const io = socket(server, {
  cors: { credentials: true, origin: ORIGIN },
})

//Local Rooms
let rooms = {}
//Local ads
let ads = {}
//Local avatars
let avatars = []
//Local Games
let games = {
  trivia: {
    id: 'trivia',
    name: 'Trivia',
    img: 'https://firebasestorage.googleapis.com/v0/b/multiplayerplatform-71d9a.appspot.com/o/Games%2Ftrivia.jpg?alt=media&token=13adcab0-2030-4aec-ac76-88ed904924dd',
  },
  balloonPopper: {
    id: 'balloonPopper',
    name: 'Balloon Popper',
    img: 'https://firebasestorage.googleapis.com/v0/b/multiplayerplatform-71d9a.appspot.com/o/Games%2Fpopper.png?alt=media&token=2a1ceec9-df43-44d7-b102-61ebf8893dec',
  },
}
//Trivia Game
let triviaGameQuestions
let triviaPlayerIdToQuestion = {}

//DB
startLoaders()
async function startLoaders() {
  let roomsResponse = await initializeRoomsFromDatabase()
  if (roomsResponse === undefined) {
    rooms = {}
  } else {
    rooms = roomsResponse
  }
  avatars = await initializeAvatarsFromDatabase()
  ads = await initializeClientsFromDatabase()
  triviaGameQuestions = await initializeTriviaQuestionsFromDb()
  startPeriodicRoomCheck()
}
// Periodic Check
function startPeriodicRoomCheck() {
  setInterval(() => {
    console.log('#### Checking Rooms Expiring Date ####')
    const currentTime = Date.now()
    checkForExpiredRooms(rooms, currentTime, io)
  }, 60 * 1000) // Run every minute
}

//####################### SOCKETS ###########################
io.on('connection', async (socket) => {
  const sockets = await io.fetchSockets()

  console.log(`A user connected. Total connections: ${sockets.length}`)

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected due to:', reason)
    if (reason === 'io server disconnect') {
      socket.connect() // Try to reconnect if server caused the disconnect
    }
  })
  //####################### ON LANDING ###########################
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

  //####################### CREATE ROOM ###########################
  socket.on('create_room', async (data, ackCallback) => {
    const startTime = Date.now()
    const roomAds = ads[data.roomAds] ? ads[data.roomAds] : ads['default']
    const uniqueId = uuidv4()
    const roomUid = uuidv4()
    rooms[roomUid] = {
      id: roomUid,
      name: data.roomName,
      ads: roomAds,
      hostId: uniqueId,
      hostName: data.playerName,
      startTime: startTime,
      onExtendedTime: false,
      players: {},
    }

    rooms[roomUid].players[uniqueId] = {
      id: uniqueId,
      name: data.playerName,
      avatar: data.playerAvatar,
      status: 'not-ready',
      sessionPoints: 0,
      perGamePoints: 0,
    }
    ackCallback({ playerId: uniqueId, roomId: roomUid })
    console.log(
      `${data.playerName} with socketId: ${socket.id} has created a room: ${roomUid}`
    )
    persistRoomData(rooms[roomUid])
  })

  //####################### JOIN ROOM ###########################
  socket.on('join_room', async (data, ackCallback) => {
    let roomToJoin = rooms[data.roomId]
    console.log(
      `${data.playerName} with socketId: ${socket.id} has entered room: ${data.roomId}`
    )
    const uniqueId = uuidv4()
    if (roomToJoin) {
      roomToJoin.players[uniqueId] = {
        id: uniqueId,
        name: data.playerName,
        avatar: data.playerAvatar,
        status: 'not-ready',
        sessionPoints: 0,
        perGamePoints: 0,
      }

      ackCallback({ id: uniqueId })
      persistRoomData(rooms[data.roomId])
    } else {
      console.log('No such Room!')
    }
  })

  //####################### ON LOBBY ###########################
  socket.on('onLobby', (data) => {
    console.log('a player just enter lobby')
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
    let playerToChange = roomTochange.players[data.playerId]

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

  //####################### TRIVIA GAME ###########################
  socket.on('onTriviaGame', async (data, ackCallback) => {
    //Player Enters Game Page
    socket.join(data.gameId)
    let playersRoom = rooms[data.roomId]
    let playerToChange = playersRoom.players[data.playerId]
    playerToChange.perGamePoints = 0

    triviaPlayerIdToQuestion[data.playerId] = {
      id: data.playerId,
      questionNumber: 0,
    }

    console.log(triviaPlayerIdToQuestion)
    ackCallback({ room: playersRoom, avatars: avatars, games: games })
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
    let playerToChange = roomTochange.players[data.playerId]

    if (triviaPlayerIdToQuestion[data.playerId].questionNumber <= 19) {
      if (
        triviaGameQuestions[
          triviaPlayerIdToQuestion[data.playerId].questionNumber
        ].answer === data.answer
      ) {
        playerToChange.perGamePoints++
        ackCallback({
          msg: 'correct',
          questionNumber:
            triviaPlayerIdToQuestion[data.playerId].questionNumber,
        })
      } else {
        ackCallback({
          msg: 'wrong',
          questionNumber:
            triviaPlayerIdToQuestion[data.playerId].questionNumber,
        })
      }
    } else {
      ackCallback({
        msg: 'trivia ended',
        questionNumber: triviaPlayerIdToQuestion[data.playerId].questionNumber,
      })
    }
    triviaPlayerIdToQuestion[data.playerId].questionNumber++
  })

  socket.on('triviaGame_finished', (data, ackCallback) => {
    //Game has ended, Player's status and points updated
    console.log('Trivia Game finished!')
    let roomTochange = rooms[data.roomId]

    let playerToChange = roomTochange.players[data.playerId]

    playerToChange.status = data.status
    playerToChange.sessionPoints += playerToChange.perGamePoints

    //Send Updated Room Game
    ackCallback({ room: roomTochange })
    persistRoomData(rooms[data.roomId])
  })

  //####################### ROOM EXPIRE ###########################
  socket.on('end_room', (data) => {
    console.log(`${rooms[data].name} is going to end!`)
    // Remove this room from Firebase
    removeRoom(data)
    // Remove room from the local rooms object
    delete rooms[data]
  })

  socket.on('keep_playing', (data) => {
    const newStartTime = Date.now()
    rooms[data].startTime = newStartTime
    rooms[data].onExtendedTime = true
    console.log(`${rooms[data].id} is going to keep playing, timer reset!`)
    persistRoomData(rooms[data])
  })

  //####################### ADS ###########################
  socket.on('onAds', async (data, ackCallback) => {
    //Player Enters Ads Page
    socket.join(data.adsRoomId)
    let playersRoom = rooms[data.roomId]
    ackCallback({ room: playersRoom })
  })

  //####################### BALLOON GAME ###########################
  socket.on('onBalloonPopper', async (data, ackCallback) => {
    //Player Enters Game Page
    socket.join(data.gameId)
    let playersRoom = rooms[data.roomId]
    let playerToChange = playersRoom.players[data.playerId]
    playerToChange.perGamePoints = 0
    ackCallback({ room: playersRoom })
  })

  socket.on('balloonPopperGame_finished', (data, ackCallback) => {
    //Game has ended, Player's status and points updated
    console.log('BallonPopper game finished!')
    let roomTochange = rooms[data.roomId]
    let playerToChange = roomTochange.players[data.playerId]

    playerToChange.status = data.status
    playerToChange.perGamePoints = data.score
    playerToChange.sessionPoints += playerToChange.perGamePoints

    //Send Updated Room Game
    ackCallback({ room: roomTochange })
    persistRoomData(rooms[data.roomId])
  })
})
