import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { SocketContext } from '../components/SocketContext'
import ReactGA from 'react-ga4'

const FullPageAd = () => {
  const [roomInfo, setRoomInfo] = useState('')
  const { socket } = useContext(SocketContext)
  const { socketError } = useContext(SocketContext)
  const navigate = useNavigate()
  const { roomId, businessId } = useParams()

  useEffect(() => {
    // Send pageview with a custom path
    ReactGA.send({
      hitType: 'pageview',
      page: `/ads/${businessId}/${roomId}`,
      title: `fullPageAd_${businessId}`,
    })
  }, [])

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
