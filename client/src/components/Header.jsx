import React from 'react'
import './Header.css'
const Header = ({ roomInfo }) => {
  console.log('onHeader', roomInfo)
  return (
    <div
      className="header"
      style={{
        backgroundColor: 'red',
        backgroundImage: `url(${roomInfo.header})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    ></div>
  )
}

export default Header
