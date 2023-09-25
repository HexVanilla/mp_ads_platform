import React, { useState, useEffect, useContext } from 'react'

import { ChevronLeft, ChevronRight } from '@mui/icons-material'

import { SocketContext } from './SocketContext'

const AvatarSelector = ({ setAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(0)
  const [images, setImages] = useState('')

  const { socket } = useContext(SocketContext)

  useEffect(() => {
    const ackResp = async () => {
      const response = await socket.emitWithAck('avatarSelector')
      setImages(Object.values(response))
    }
    ackResp()
  }, [])
  const next = () => {
    let curAvatar = selectedAvatar
    curAvatar < images.length - 1 ? curAvatar++ : (curAvatar = 0)
    setSelectedAvatar(curAvatar)
    setAvatar(curAvatar)
  }
  const prev = () => {
    let curAvatar = selectedAvatar
    curAvatar > 0 ? curAvatar-- : (curAvatar = images.length - 1)
    setSelectedAvatar(curAvatar)
    setAvatar(curAvatar)
  }

  return (
    <div>
      {images !== '' ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div onClick={prev}>
            <ChevronLeft />
          </div>

          <img
            src={images[selectedAvatar].url}
            alt=""
            style={{
              borderRadius: '1rem',
              height: '70%',
              width: '70%',
              maxHeight: '20rem',
              maxWidth: '20rem',
            }}
          />
          <div onClick={next}>
            <ChevronRight />
          </div>
        </div>
      ) : (
        'Loading Avatars'
      )}
    </div>
  )
}

export default AvatarSelector
