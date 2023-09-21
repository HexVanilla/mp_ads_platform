import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Box,
  Dialog,
  DialogTitle,
} from '@mui/material'

import PlayerCard from '../components/PlayerCard'

const Lobby = () => {
  const [roomInfo, setRoomInfo] = useState('')
  const [playersList, setPlayersList] = useState('')
  const [avatarImages, setAvatarImages] = useState('')
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
    console.log(localPlayerId)
  }, [])

  useEffect(() => {
    socket.on('player_joined', (data) => {
      console.log('ACK_OnLobby', data.playersRoom)

      setRoomInfo(data.playersRoom)
      setPlayersList(data.playersRoom.players)
      setAvatarImages(Object.values(data.avatars))
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
    console.log(selectedGame)
    if (playersReady && selectedGame.name === 'Trivia')
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
    socket.emit('game_selected', { game: 'trivia', roomId: roomId })
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

      {roomInfo !== '' ? (
        localPlayerId === roomInfo.hostId ? (
          <Card sx={{ m: 1 }}>
            <CardContent>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="button">Host</Typography>
                <Typography variant="subtitle1">
                  {roomInfo.hostName.toUpperCase()}
                </Typography>
                <Button variant="contained" onClick={selectGame}>
                  pick game
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          ''
        )
      ) : (
        'loading room info'
      )}

      <Card sx={{ m: 1 }}>
        <CardContent style={{ flex: 1 }}>
          {roomInfo !== '' ? (
            <>
              <Typography variant="button">Game</Typography>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '12rem',
                    height: '12rem',
                    borderRadius: '1rem',
                    backgroundImage: `url(${selectedGame.img})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                ></div>
                <Typography variant="h5">
                  {selectedGame.name !== ''
                    ? selectedGame.name
                    : 'No Game selected!'}
                </Typography>
              </div>
            </>
          ) : (
            'loading room info'
          )}
        </CardContent>
      </Card>
      <Card sx={{ m: 1 }}>
        <Typography variant="h3" sx={{ m: 2 }}>
          Players
        </Typography>
        {playersList !== ''
          ? playersList.map((player) =>
              player.id === localPlayerId ? (
                <PlayerCard
                  player={player}
                  showButton={true}
                  avatarImages={avatarImages}
                  markAsReady={markAsReady}
                />
              ) : (
                <PlayerCard
                  player={player}
                  showButton={false}
                  avatarImages={avatarImages}
                />
              )
            )
          : 'loading players'}
      </Card>
    </div>
  )
}

export default Lobby
