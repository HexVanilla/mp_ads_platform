import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Drawer,
  Dialog,
  DialogTitle,
} from '@mui/material'
import Header from '../components/Header'
import PlayerCard from '../components/PlayerCard'
import { SocketContext } from '../components/SocketContext'
import ReactGA from 'react-ga4'

const Lobby = () => {
  const [roomInfo, setRoomInfo] = useState('')
  const [playersList, setPlayersList] = useState('')
  const [avatarImages, setAvatarImages] = useState('')
  const [availableGames, setAvailableGames] = useState('')
  const [showGames, setShowGames] = useState(false)
  const { roomId, businessId } = useParams()

  const { socket } = useContext(SocketContext)
  const { socketError } = useContext(SocketContext)

  const [showPopup, setShowPopup] = useState(false)
  const [showByePopup, setShowByePopup] = useState(false)
  const [popupGracePeriod, setPopupGracePeriod] = useState(false)

  const navigate = useNavigate()

  const [selectedGame, setselectedGame] = useState('')
  const [playersReady, setPlayersReady] = useState(false)

  let localPlayerId = sessionStorage.getItem('playerId')

  localStorage.setItem('lastJoinedRoom', roomId)

  useEffect(() => {
    // Send pageview with a custom path
    ReactGA.send({
      hitType: 'pageview',
      page: `/lobby/${businessId}/${roomId}`,
      title: 'lobby',
    })
  }, [])

  useEffect(() => {
    if (socketError !== null) navigate(`/serverDown`)
  }, [socketError])

  useEffect(() => {
    socket.emit('onLobby', roomId)
  }, [])

  useEffect(() => {
    socket.on('player_joined', (data) => {
      console.log('ACK_OnLobby', data.playersRoom)

      setRoomInfo(data.playersRoom)
      setPlayersList(Object.values(data.playersRoom.players))
      setAvatarImages(Object.values(data.avatars))
      setAvailableGames(Object.values(data.games))
    })
    // Cleanup
    return () => {
      socket.off('player_joined')
    }
  }, [])

  useEffect(() => {
    socket.on('player_update', (playersRoom) => {
      console.log('Update!', playersRoom)
      console.log('Update! Game', selectedGame)

      setRoomInfo(playersRoom)
      setPlayersList(Object.values(playersRoom.players))

      if (
        Object.values(playersRoom.players).every(
          (player) => player.status === 'ready'
        )
      ) {
        setPlayersReady(true)
      }
    })
    // Cleanup
    return () => {
      socket.off('player_update')
    }
  }, [])

  useEffect(() => {
    console.log(selectedGame)
    if (playersReady && selectedGame.name === 'Trivia') {
      navigate(`/triviaGame/${businessId}/${roomId}`)
    } else if (playersReady && selectedGame.name === 'Balloon Popper') {
      navigate(`/balloonPopperGame/${businessId}/${roomId}`)
    }
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
    // Cleanup
    return () => {
      socket.off('room_expired')
      socket.off('room_expired_hard')
    }
  }, [])

  useEffect(() => {
    const gracePeridoTimer = setTimeout(() => {
      if (showPopup && popupGracePeriod) endRoom()
    }, 5000)
    return () => {
      clearTimeout(gracePeridoTimer)
    }
  }, [popupGracePeriod])

  useEffect(() => {
    socket.on('game_to_players', (data) => {
      setselectedGame(data)
    })
    // Cleanup
    return () => {
      socket.off('game_to_players')
    }
  }, [])

  const markAsReady = () => {
    if (playersList !== '') {
      const player = playersList.find((player) => player.id === localPlayerId)
      const playerStatus = player.status
      socket.emit('player_status_change', {
        playerId: player.id,
        status: playerStatus == 'ready' ? 'not-ready' : 'ready',
        roomId: roomId,
      })
    }
  }

  const keepPlaying = () => {
    socket.emit('keep_playing', roomId)
    setPopupGracePeriod(false)
    setShowPopup(false)
  }

  const endRoom = () => {
    socket.emit('end_room', roomId)
    setShowPopup(false)
    socket.disconnect()
    navigate(`/goodbye/${businessId}`)
  }

  const selectGame = (e, selectedGame) => {
    e.preventDefault()
    socket.emit('game_selected', { game: selectedGame, roomId: roomId })
    setShowGames(false)
  }

  return (
    <>
      <Dialog open={showPopup}>
        <DialogTitle>Expiro la Sesion!</DialogTitle>{' '}
        <Button onClick={keepPlaying} variant="contained" sx={{ m: 1 }}>
          Seguir Jugando
        </Button>
        <Button onClick={endRoom} variant="outlined" sx={{ m: 1 }}>
          Cerrar
        </Button>
      </Dialog>
      <Dialog open={showByePopup}>
        <DialogTitle>Expiro la Sesion!</DialogTitle>{' '}
      </Dialog>
      <Drawer anchor={'top'} open={showGames}>
        {availableGames &&
          availableGames.map((game) => (
            <Card sx={{ m: 2 }}>
              <CardContent>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '8rem',
                      height: '8rem',
                      borderRadius: '1rem',
                      backgroundImage: `url(${game.img})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }}
                  ></div>
                  <Typography variant="overline">{game.name}</Typography>
                  <Button
                    variant="contained"
                    onClick={(e) => selectGame(e, game.id)}
                  >
                    Elegir!
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </Drawer>
      <Card sx={{ width: '100%', m: 0, boxShadow: 'none' }}>
        <Header roomInfo={roomInfo.ads} />
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
                  <Typography variant="button">Anfitrion</Typography>
                  <Typography variant="subtitle1">
                    {roomInfo.hostName.toUpperCase()}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setShowGames(true)}
                  >
                    Elige un juego
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

        <CardContent style={{ flex: 1 }}>
          {roomInfo !== '' ? (
            <>
              <Typography variant="button">Juego</Typography>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '8rem',
                    height: '8rem',
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
        <Typography variant="h3" sx={{ m: 2 }}>
          Jugadores
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
    </>
  )
}

export default Lobby
