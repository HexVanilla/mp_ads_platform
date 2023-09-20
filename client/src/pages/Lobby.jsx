import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

const Lobby = () => {
  const [roomInfo, setRoomInfo] = useState('')
  const [playersList, setPlayersList] = useState('')
  const socket = io.connect('http://localhost:3001/')
  const { roomId, businessId } = useParams()

  const [showPopup, setShowPopup] = useState(false)
  const [showByePopup, setShowByePopup] = useState(false)
  const [popupGracePeriod, setPopupGracePeriod] = useState(false)

  const navigate = useNavigate()

  const [selectedGame, setselectedGame] = useState('')
  const [playersReady, setPlayersReady] = useState(false)

  let localPlayerId = sessionStorage.getItem('playerId')

  localStorage.setItem('lastJoinedRoom', roomId)

  useEffect(() => {
    socket.emit('onLobby', roomId)
  }, [])

  useEffect(() => {
    socket.on('player_joined', (playersRoom) => {
      console.log('ACK_OnLobby', playersRoom)
      setRoomInfo(playersRoom)
      setPlayersList(playersRoom.players)
    })
  }, [])

  useEffect(() => {
    socket.on('player_update', (playersRoom) => {
      console.log('Update!', playersRoom)
      console.log('Update! Game', selectedGame)
      setRoomInfo(playersRoom)
      setPlayersList(playersRoom.players)

      if (playersRoom.players.every((player) => player.status === 'ready')) {
        setPlayersReady(true)
      }
    })
  }, [])

  useEffect(() => {
    if (playersReady && selectedGame === 'ClickO')
      navigate(`/game/${businessId}/${roomId}`)
  }, [playersReady, selectedGame])

  useEffect(() => {
    socket.on('room_expired', () => {
      setShowPopup(true)
      //socket.disconnect()
      setPopupGracePeriod(true)
    })

    socket.on('room_expired_hard', () => {
      setShowByePopup(true)
      //socket.disconnect()
      setTimeout(() => {
        endRoom()
      }, 2000)
    })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (showPopup && popupGracePeriod) endRoom()
    }, 5000)
  }, [popupGracePeriod])

  useEffect(() => {
    socket.on('game_to_players', (data) => {
      setselectedGame(data)
    })
  }, [])

  const markAsReady = () => {
    if (playersList !== '') {
      const player = playersList.find((player) => player.id === localPlayerId)
      const playerStatus = player.status
      socket.emit('player_status_change', {
        id: player.id,
        status: playerStatus == 'ready' ? 'not-ready' : 'ready',
        roomId: roomId,
      })
    }
  }

  const keepPlaying = () => {
    socket.emit('keep_playing', roomId)
    setShowPopup(false)
  }

  const endRoom = () => {
    socket.emit('end_room', roomId)
    setShowPopup(false)
    navigate(`/`)
  }

  const selectGame = () => {
    socket.emit('game_selected', { game: 'ClickO', roomId: roomId })
  }

  return (
    <div>
      {showPopup ? (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            backgroundColor: 'lightgray',
            padding: '1rem',
          }}
        >
          <p>Expiro la Sesion!</p>
          <button onClick={keepPlaying}>Seguir Jugando</button>
          <button onClick={endRoom}>Cerrar</button>
        </div>
      ) : (
        ''
      )}

      {showByePopup ? (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            backgroundColor: 'lightgray',
            padding: '1rem',
          }}
        >
          <p>Expiro la Sesion!</p>
        </div>
      ) : (
        ''
      )}
      <h3>Host</h3>
      {roomInfo !== '' ? (
        <>
          <p>{roomInfo.hostName}</p>
          <p>{roomInfo.ads.name}</p>
        </>
      ) : (
        'loading room info'
      )}
      {roomInfo !== '' ? (
        localPlayerId == roomInfo.hostId ? (
          <>
            <p>{selectedGame}</p>
            <button onClick={selectGame}>pick game</button>
          </>
        ) : (
          ''
        )
      ) : (
        'loading room info'
      )}
      <h1>Players</h1>
      {playersList !== ''
        ? playersList.map((player) =>
            player.id === localPlayerId ? (
              <div>
                <p>{player.avatar}</p>
                <p>{player.points}</p>
                <p>{player.name}</p>
                <p>{player.status}</p>
                <button onClick={markAsReady}>Set Ready!</button>
              </div>
            ) : (
              <div>
                <p>{player.avatar}</p>
                <p>{player.points}</p>
                <p>{player.name}</p>
                <p>{player.status}</p>
              </div>
            )
          )
        : 'loading players'}
    </div>
  )
}

export default Lobby
