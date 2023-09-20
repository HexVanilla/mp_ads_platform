import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

const Game = () => {
  const [roomInfo, setRoomInfo] = useState('')
  const [playersList, setPlayersList] = useState('')
  const [timerActive, setTimerActive] = useState(true)
  const [clicks, setClicks] = useState(0)
  const [timer, setTimer] = useState(30)
  const socket = io.connect('http://localhost:3001/')
  const { roomId, businessId } = useParams()

  const navigate = useNavigate()

  let localPlayerId = sessionStorage.getItem('playerId')

  useEffect(() => {
    socket.emit('onGame', { roomId: roomId, gameId: `${roomId}_game` })
  }, [])

  useEffect(() => {
    socket.on('game_start', (playersRoom) => {
      console.log('ACK_Game', playersRoom)
      setRoomInfo(playersRoom)
      setPlayersList(playersRoom.players)
    })
  }, [])

  useEffect(() => {
    if (timerActive) {
      setInterval(() => {
        setTimer((timer) => (timer > 0 ? timer - 1 : timer))
      }, 1000)
    }
  }, [])

  useEffect(() => {
    if (timer <= 0) {
      setTimerActive(false)
      const playerId = playersList.find((player) => player.id === localPlayerId)
      console.log('game finish')
      socket.emit('game_finished', {
        id: playerId.id,
        points: clicks,
        status: 'not-ready',
        roomId: roomId,
      })

      navigate(`/lobby/${businessId}/${roomId}`)
    }
  }, [timer])

  function addClick() {
    let curClicks = clicks
    curClicks++
    setClicks(curClicks)
  }
  return (
    <div>
      <p>{timer}</p>
      <h1>Click'O</h1>
      <p>{clicks}</p>
      <button onClick={addClick}>Click Me!</button>
    </div>
  )
}

export default Game
