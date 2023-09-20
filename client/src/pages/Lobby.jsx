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
  Container,
} from '@mui/material'

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
      <Card sx={{ m: 2 }}>
        <CardContent>
          <Typography variant="h6">Host</Typography>
          {roomInfo !== '' ? (
            <>
              <Typography variant="subtitle2">{roomInfo.hostName}</Typography>
            </>
          ) : (
            'loading room info'
          )}
          {roomInfo !== '' ? (
            localPlayerId == roomInfo.hostId ? (
              <>
                <p>{selectedGame}</p>
                <Button variant="contained" onClick={selectGame}>
                  pick game
                </Button>
              </>
            ) : (
              ''
            )
          ) : (
            'loading room info'
          )}
        </CardContent>
      </Card>
      <Card sx={{ width: { xs: 320, sm: 600 } }}>
        <CardContent>
          <Typography variant="h2">Players</Typography>
          {playersList !== ''
            ? playersList.map((player) =>
                player.id === localPlayerId ? (
                  <Card sx={{ m: 2 }}>
                    <CardContent>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <img
                          src={avatarImages[player.avatar].url}
                          width={'60rem'}
                          alt=""
                          style={{ borderRadius: '1rem', marginBottom: '1rem' }}
                        />
                        <Typography variant="h4">{player.points}</Typography>
                        <Typography variant="subtitle1">
                          {player.name.toUpperCase()}
                        </Typography>
                        <Typography
                          variant="overline"
                          color={
                            player.status === 'ready' ? 'success' : 'error'
                          }
                        >
                          {player.status}
                        </Typography>
                      </div>{' '}
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={markAsReady}
                      >
                        Set Ready!
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card sx={{ m: 2 }}>
                    <CardContent>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <img
                          src={avatarImages[player.avatar].url}
                          width={'60rem'}
                          alt=""
                          style={{ borderRadius: '1rem', marginBottom: '1rem' }}
                        />
                        <Typography variant="h4">{player.points}</Typography>
                        <Typography variant="subtitle1">
                          {player.name.toUpperCase()}
                        </Typography>
                        <Typography
                          variant="overline"
                          color={
                            player.status === 'ready' ? 'success' : 'error'
                          }
                        >
                          {player.status}
                        </Typography>
                      </div>{' '}
                    </CardContent>
                  </Card>
                )
              )
            : 'loading players'}
        </CardContent>
      </Card>
    </div>
  )
}

export default Lobby
