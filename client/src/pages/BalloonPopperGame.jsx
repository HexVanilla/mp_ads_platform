import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { SocketContext } from '../components/SocketContext'
import ReactGA from 'react-ga4'

const BalloonPopperGame = () => {
  const [score, setScore] = useState('')
  const [roomInfo, setRoomInfo] = useState('')
  const [playersList, setPlayersList] = useState('')

  const { socket } = useContext(SocketContext)
  const { socketError } = useContext(SocketContext)

  const { roomId, businessId } = useParams()

  const navigate = useNavigate()

  let localPlayerId = sessionStorage.getItem('playerId')

  useEffect(() => {
    // Send pageview with a custom path
    ReactGA.send({
      hitType: 'pageview',
      page: `/balloonPopperGame/${businessId}/${roomId}`,
      title: 'balloonPopper',
    })
  }, [])

  useEffect(() => {
    const ackResp = async () => {
      const response = await socket.emitWithAck('onBalloonPopper', {
        roomId: roomId,
        gameId: `${roomId}_ballonPopper`,
        playerId: localPlayerId,
      })
      setRoomInfo(response.room)
      setPlayersList(Object.values(response.room.players))
    }
    ackResp()
  }, [])

  useEffect(() => {
    const handleMessage = (event) => {
      // Ensure the event is from our expected source
      if (event.data.eventType === 'gameOver') {
        setScore(event.data.score)
        console.log('Game Over with score:', event.data.score)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      // Cleanup listener on unmount
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  useEffect(() => {
    if (score !== '') finishGame()
  }, [score])

  const finishGame = async () => {
    const response = await socket.emitWithAck('balloonPopperGame_finished', {
      gameId: `${roomId}_ballonPopper`,
      roomId: roomId,
      status: 'not-ready',
      playerId: localPlayerId,
      score: score,
    })
    setRoomInfo(response.room)
    setPlayersList(Object.values(response.room.players))

    setTimeout(() => {
      navigate(`/ads/${businessId}/${roomId}`)
    }, 4000)
  }

  return (
    <>
      <iframe
        src="/balloonPopper/index.html"
        style={{
          border: 'none',
          width: '100vw', // 100% of viewport width
          height: '100vh', // 100% of viewport height
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
        title="GDevelop Game"
      ></iframe>
    </>
  )
}

export default BalloonPopperGame
