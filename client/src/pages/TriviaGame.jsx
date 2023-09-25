import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  LinearProgress,
  Radio,
} from '@mui/material'

import { SocketContext } from '../components/SocketContext'
import ReactGA from 'react-ga4'

const TriviaGame = () => {
  const [roomInfo, setRoomInfo] = useState('')
  const [playersList, setPlayersList] = useState('')
  const [avatar, setAvatar] = useState('')

  const { socket } = useContext(SocketContext)
  const { socketError } = useContext(SocketContext)

  const { roomId, businessId } = useParams()

  const navigate = useNavigate()

  let localPlayerId = sessionStorage.getItem('playerId')

  //Game
  const [selectedOption, setSelectedOption] = useState('a')
  const [question, setQuestion] = useState('')
  const [curQuestion, setCurQuestion] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [questionTimer, setQuestionTimer] = useState(0)

  const [startTimer, setStartTimer] = useState(false)

  const [showCorrectAlert, setShowCorrectAlert] = useState(false)
  const [showWrongAlert, setShowWrongAlert] = useState(false)

  const handleSelectOption = (event) => {
    setSelectedOption(event.target.value)
  }

  useEffect(() => {
    // Send pageview with a custom path
    ReactGA.send({
      hitType: 'pageview',
      page: `/triviaGame/${businessId}/${roomId}`,
      title: 'triviGame',
    })
  }, [])

  useEffect(() => {
    const ackResp = async () => {
      const response = await socket.emitWithAck('onTriviaGame', {
        roomId: roomId,
        gameId: `${roomId}_trivia`,
        playerId: localPlayerId,
      })
      setRoomInfo(response.room)
      setPlayersList(Object.values(response.room.players))
      setAvatar(Object.values(response.avatars))
      getNextQuestion()
      setStartTimer(true)
    }
    ackResp()
  }, [])

  const checkeAnswer = async () => {
    const response = await socket.emitWithAck('trivia_check_question', {
      answer: selectedOption,
      playerId: localPlayerId,
      roomId: roomId,
    })

    response.msg === 'correct'
      ? setShowCorrectAlert(true)
      : setShowWrongAlert(true)

    console.log('server', response.questionNumber)

    if (response.questionNumber < 19) {
      getNextQuestion()
      setStartTimer(true)
    } else {
      finishGame()
    }
  }

  useEffect(() => {
    setTimeout(() => {
      showWrongAlert === true ? setShowWrongAlert(false) : ''
    }, 2000)
  }, [showWrongAlert])

  useEffect(() => {
    setTimeout(() => {
      showCorrectAlert === true ? setShowCorrectAlert(false) : ''
    }, 2000)
  }, [showCorrectAlert])

  const getNextQuestion = async () => {
    const response = await socket.emitWithAck('trivia_next_question', {
      playerId: localPlayerId,
    })
    setQuestion(response)
    setQuestionTimer(-10)
    setCurQuestion(response.questionNumber)
  }

  useEffect(() => {
    if (startTimer) {
      const intervalId = setInterval(() => {
        setQuestionTimer((prevTime) => {
          let newTime = prevTime + 1
          if (newTime >= 100) {
            checkeAnswer()
            clearInterval(intervalId)
            setStartTimer(false) // stop the current timer
            return prevTime
          }
          return newTime
        })
      }, 100)
    }
  }, [startTimer])

  const finishGame = async () => {
    setStartTimer(false)
    const response = await socket.emitWithAck('triviaGame_finished', {
      gameId: `${roomId}_trivia`,
      roomId: roomId,
      status: 'not-ready',
      playerId: localPlayerId,
    })
    setRoomInfo(response.room)
    setPlayersList(Object.values(response.room.players))
    setShowResults(true)

    setTimeout(() => {
      navigate(`/ads/${businessId}/${roomId}`)
    }, 8000)
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showCorrectAlert}
      >
        <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
          Correcto! Siguiente Pregunta.
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showWrongAlert}
      >
        <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
          Equivocado! Siguiente pregunta.
        </Alert>
      </Snackbar>
      <Card sx={{ width: '100vw', m: 0, boxShadow: 'none' }}>
        <CardContent>
          {roomInfo && <Header roomInfo={roomInfo.ads} />}
          {showResults ? (
            ''
          ) : (
            <Card>
              <CardContent>
                <Typography variant="overline">{`Question ${
                  curQuestion + 1
                }/20`}</Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {question.question}
                </Typography>
                <Box sx={{ width: '100%' }}>
                  <LinearProgress variant="determinate" value={questionTimer} />
                </Box>
              </CardContent>
            </Card>
          )}

          {showResults ? (
            <>
              {playersList &&
                playersList.map((player) =>
                  player.id === localPlayerId ? (
                    <Card>
                      <CardContent>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="h5" gutterBottom>
                            Juego Terminado!
                          </Typography>
                          <img
                            src={avatar[player.avatar].url}
                            style={{
                              width: '100%',
                              maxWidth: '6rem',
                              borderRadius: '1rem',
                              margin: '1rem',
                            }}
                          />

                          <Typography variant="h3" gutterBottom>
                            Tu Puntaje
                          </Typography>
                          <Typography variant="h2" gutterBottom>
                            {player.perGamePoints}
                          </Typography>
                          <Typography variant="overline">
                            Pronto volveras al lobby...
                          </Typography>
                        </div>
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
