import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { SocketContext } from '../components/SocketContext'

const FullPageAd = () => {
  const [roomInfo, setRoomInfo] = useState('')
  const socket = useContext(SocketContext)
  const navigate = useNavigate()
  const { roomId, businessId } = useParams()

  useEffect(() => {
    const ackResp = async () => {
      const response = await socket.emitWithAck('onAds', {
        roomId: roomId,
        adsRoomId: `${roomId}_game`,
      })
      console.log(response.room.ads.fullPage)
      setRoomInfo(response.room)
    }
    ackResp()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      navigate(`/lobby/${businessId}/${roomId}`)
    }, 5000)
  }, [roomInfo])

  return (
    <>
      {roomInfo && (
        <div
          style={{
            backgroundColor: 'red',
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${roomInfo.ads.fullPage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
      )}
    </>
  )
}

export default FullPageAd
