import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
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

const HostLanding = () => {
  const [roomInfo, setroomInfo] = useState('')
  const [showPage, setShowPage] = useState(false)
  const [avatar, setAvatar] = useState(0)
  const [nickname, setNickname] = useState('')
  const [roomName, setRoomName] = useState('')
  const [showHostWarning, setShowHostWarning] = useState(false)

  const socket = io.connect('http://localhost:3001/')

  const navigate = useNavigate()
  const { businessId } = useParams()

  useEffect(() => {
    const ackResp = async () => {
      const response = await socket.emitWithAck('onLanding', businessId)
      console.log('Business Exists?', response)
      setShowPage(response.res)
      if (response.data !== '') setroomInfo(response.data)
    }
    ackResp()
  }, [])

  const createRoom = async () => {
    console.log(avatar, nickname, roomName, businessId)

    if (
      avatar !== '' &&
      nickname !== '' &&
      roomName !== '' &&
      businessId !== null
    ) {
      const response = await socket.emitWithAck('create_room', {
        playerAvatar: avatar,
        roomName: roomName,
        roomId: roomName,
        roomAds: businessId,
        playerName: nickname,
        playerId: nickname,
      })
      sessionStorage.setItem('playerId', response.id)
    }
    setShowHostWarning(true)
  }

  const goToLobby = () => {
    navigate(`/lobby/${businessId}/${roomName}`)
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
            href={`http://localhost:5173/join/${businessId}/${roomName}`}
          >{`http://localhost:5173/join/${businessId}/${roomName}`}</a>
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
