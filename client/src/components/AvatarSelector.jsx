import React, { useState } from 'react'
import avatar01 from '../imgs/avatar01.jpg'
import avatar02 from '../imgs/avatar02.jpg'
import avatar03 from '../imgs/avatar03.jpg'
import avatar04 from '../imgs/avatar04.jpg'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

const AvatarSelector = ({ setAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(0)
  const imgs = [avatar01, avatar02, avatar03, avatar04]

  const next = () => {
    let curAvatar = selectedAvatar
    curAvatar < imgs.length - 1 ? curAvatar++ : (curAvatar = 0)
    setSelectedAvatar(curAvatar)
    setAvatar(curAvatar)
  }
  const prev = () => {
    let curAvatar = selectedAvatar
    curAvatar > 0 ? curAvatar-- : (curAvatar = imgs.length - 1)
    setSelectedAvatar(curAvatar)
    setAvatar(curAvatar)
  }

  return (
    <div>
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
          src={imgs[selectedAvatar]}
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
    </div>
  )
}

export default AvatarSelector
