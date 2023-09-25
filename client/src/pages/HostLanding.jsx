import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import AvatarSelector from '../components/AvatarSelector'
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

import { SocketContext } from '../components/SocketContext'
import ReactGA from 'react-ga4'

const HostLanding = () => {
  const [roomInfo, setroomInfo] = useState('')
  const [showPage, setShowPage] = useState(false)
  const [avatar, setAvatar] = useState(0)
  const [nickname, setNickname] = useState('')
  const [roomName, setRoomName] = useState('')
  const [roomUid, setRoomUid] = useState('')
  const [showHostWarning, setShowHostWarning] = useState(false)

  const { socket } = useContext(SocketContext)
  const { socketError } = useContext(SocketContext)

  const navigate = useNavigate()
  const { businessId } = useParams()

  useEffect(() => {
    // Send pageview with a custom path
    ReactGA.send({
      hitType: 'pageview',
      page: `/${businessId}`,
      title: `${businessId}_join`,
    })
  }, [])

  useEffect(() => {
    if (socketError !== null) navigate(`/serverDown`)
  }, [socketError])

  useEffect(() => {
    const ackResp = async () => {
      const response = await socket.emitWithAck('onLanding', businessId)
      setShowPage(response.res)
      if (response.data !== '') setroomInfo(response.data)
    }
    ackResp()
  }, [])

  const createRoom = async () => {
    if (
      avatar !== '' &&
      nickname !== '' &&
      roomName !== '' &&
      businessId !== null
    ) {
      const response = await socket.emitWithAck('create_room', {
        playerAvatar: avatar,
        roomName: roomName,
        roomAds: businessId,
        playerName: nickname,
        playerId: nickname,
      })
      sessionStorage.setItem('playerId', response.playerId)
      sessionStorage.setItem('roomId', response.roomId)
      setRoomUid(response.roomId)
    }
    setShowHostWarning(true)
  }

  const goToLobby = () => {
    if (roomUid !== '') navigate(`/lobby/${businessId}/${roomUid}`)
  }

  return (
    <>
      <Dialog open={showHostWarning}>
        <DialogTitle>
          Muestra este Codigo a tus acompanantes para que se unan a tu sesion!
        </DialogTitle>
        <Box sx={{ m: 2 }}>
          {' '}
          <a
            href={`http://localhost:5173/join/${businessId}/${roomUid}`}
          >{`http://localhost:5173/join/${businessId}/${roomUid}`}</a>
        </Box>

        <Divider variant="middle" />

        <Box sx={{ m: 2 }}>
          {' '}
          <Typography variant="overline" sx={{ marginRight: 1 }}>
            Recuerda Compartir el codigo antes de entrar al lobby
          </Typography>
          <Button variant="contained" onClick={goToLobby}>
            Ir al Lobby
          </Button>
        </Box>
      </Dialog>
      <Container maxWidth="sm">
        {showPage ? (
          <Card>
            <Header roomInfo={roomInfo} />
            <Container maxWidth="sm">
              <Card sx={{ m: 2 }}>
                <CardContent>
                  <AvatarSelector setAvatar={setAvatar} />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      paddingTop: '1rem',
                    }}
                  >
                    <Typography variant="overline" gutterBottom>
                      Tu Nombre
                    </Typography>
                    <TextField
                      type="text"
                      placeholder="nombre"
                      onChange={(e) => setNickname(e.target.value)}
                    />
                    <Typography variant="overline" gutterBottom>
                      Nombre de Sesion
                    </Typography>
                    <TextField
                      type="text"
                      placeholder="sesion"
                      onChange={(e) => setRoomName(e.target.value)}
                    />
                    <Box sx={{ m: 1 }}></Box>
                    <Divider variant="middle" />
                    <Box sx={{ m: 1 }}></Box>
                    <Button variant="contained" onClick={createRoom}>
                      Crear Sesion
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Container>
          </Card>
        ) : (
          'No such business!'
        )}
      </Container>
    </>
  )
}

export default HostLanding
