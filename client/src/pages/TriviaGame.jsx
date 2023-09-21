import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import Header from '../components/Header'
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
  LinearProgress,
  Radio,
} from '@mui/material'

const TriviaGame = () => {
  const [roomInfo, setRoomInfo] = useState('')
  const [playersList, setPlayersList] = useState('')

  const socket = io.connect('http://localhost:3001/')
  const { roomId, businessId } = useParams()

  const navigate = useNavigate()

  let localPlayerId = sessionStorage.getItem('playerId')

  //Game
  const [selectedOption, setSelectedOption] = useState('a')
  const [question, setQuestion] = useState('')
  const [curQuestion, setCurQuestion] = useState(0)
  const [answerMsg, setAnswerMsg] = useState('')
  const [showReponseAlert, setShowReponseAlert] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleSelectOption = (event) => {
    setSelectedOption(event.target.value)
  }

  useEffect(() => {
    socket.emit('onTriviaGame', {
      roomId: roomId,
      gameId: `${roomId}_game`,
      playerId: localPlayerId,
    })
  }, [])

  useEffect(() => {
    socket.on('trivia_game_ready', (data) => {
      console.log('ACK_Game', data.playersRoom)
      console.log('ACK_Game', data.questions)
      setRoomInfo(data.playersRoom)
      setPlayersList(data.playersRoom.players)
      getNextQuestion(0)
    })
  }, [])

  useEffect(() => {
    socket.on('game_end_player_update', (data) => {
      setRoomInfo(data)
      setPlayersList(data.players)
      setShowResults(true)
      setTimeout(() => {
        navigate(`/lobby/${businessId}/${roomId}`)
      }, 8000)
    })

    // navigate(`/lobby/${businessId}/${roomId}`)
  }, [])

  const checkeAnswer = async () => {
    const response = await socket.emitWithAck('trivia_check_question', {
      number: curQuestion,
      answer: selectedOption,
      playerId: localPlayerId,
      roomId: roomId,
    })
    setAnswerMsg(response.msg)
    setShowReponseAlert(true)
    if (curQuestion < 19) {
      let questionNumer = curQuestion
      questionNumer++
      setCurQuestion(questionNumer)
      getNextQuestion(questionNumer)
    } else {
      finishGame()
    }
  }

  const getNextQuestion = async (number) => {
    const response = await socket.emitWithAck('trivia_next_question', {
      number: number,
    })
    setQuestion(response)
  }
  const finishGame = async () => {
    const response = await socket.emitWithAck('game_finished', {
      gameId: `${roomId}_game`,
      roomId: roomId,
      status: 'not-ready',
      id: localPlayerId,
    })
    setRoomInfo(response.room)
    setPlayersList(response.room.players)
    setShowResults(true)
    setTimeout(() => {
      navigate(`/lobby/${businessId}/${roomId}`)
    }, 8000)
  }

  return (
    <div>
      {showReponseAlert ? <h1>{answerMsg}</h1> : ''}
      <Card>
        <CardContent>
          <Header roomInfo={roomInfo} />
          <Card>
            <CardContent>
              <Typography variant="overline">{`Question ${
                curQuestion + 1
              }/20`}</Typography>
              <Typography variant="subtitle1" gutterBottom>
                {question.question}
              </Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={10} />
              </Box>
            </CardContent>
          </Card>
          {showResults ? (
            <>
              {playersList &&
                playersList.map((player) =>
                  player.id === localPlayerId ? (
                    <Card>
                      <CardContent>
                        <Typography>Tu Puntaje</Typography>
                        <Typography>{player.perGamePoints}</Typography>
                      </CardContent>
                    </Card>
                  ) : (
                    ''
                  )
                )}
            </>
          ) : (
            question &&
            question.options.map((option) => (
              <Card sx={{ marginTop: 1, marginBottom: 1 }}>
                <CardContent>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography>{option}</Typography>
                    <Radio
                      checked={selectedOption === option}
                      onChange={handleSelectOption}
                      value={option}
                      name="radio-buttons"
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
          {showResults ? (
            ''
          ) : (
            <Button variant="contained" onClick={checkeAnswer}>
              Enviar Respuesta
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TriviaGame
