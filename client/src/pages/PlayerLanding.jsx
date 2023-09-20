import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { useParams, useNavigate } from 'react-router-dom'
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
  Container,
} from '@mui/material'

const PlayerLanding = () => {
  const [roomInfo, setroomInfo] = useState('')

  const [avatar, setAvatar] = useState('')
  const [nickname, setNickname] = useState('')
  const [roomName, setRoomName] = useState('')
  const socket = io.connect('http://localhost:3001/')

  const navigate = useNavigate()

  const { roomId, businessId } = useParams()

  useEffect(() => {
    setRoomName(roomId)
  }, [])

  useEffect(() => {
    const ackResp = async () => {
      const response = await socket.emitWithAck('onPlayerLanding', businessId)
      if (response.data !== '') setroomInfo(response.data)
    }
    ackResp()
  }, [])

  const joinRoom = () => {
    if (avatar !== '' && nickname !== '' && roomName !== '') {
      socket.emit('join_room', {
        playerAvatar: avatar,
        roomName: roomName,
        roomId: roomName,
        playerName: nickname,
        playerId: nickname,
      })
      sessionStorage.setItem('playerId', nickname)
      goToLobby()
    }
  }

  const goToLobby = () => {
    navigate(`/lobby/${businessId}/${roomName}`)
  }

  return (
    <div>
      <Container maxWidth="sm">
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

                  <Box sx={{ m: 1 }}></Box>
                  <Divider variant="middle" />
                  <Box sx={{ m: 1 }}></Box>
                  <Button variant="contained" onClick={joinRoom}>
                    Unirte!
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Container>
        </Card>
      </Container>
    </div>
  )
}

export default PlayerLanding
