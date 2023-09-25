import React, { createContext, useState, useEffect } from 'react'
import io from 'socket.io-client'

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const [socketError, setSocketError] = useState(null)
  const socket = io.connect('http://localhost:3001/')

  useEffect(() => {
    socket.on('connect_error', (err) => {
      setSocketError(`Connection Error: ${err.message}`)
    })

    socket.on('error', (err) => {
      setSocketError(`Error: ${err.message}`)
    })

    return () => {
      socket.off('connect_error')
      socket.off('error')
    }
  }, [socket])

  return (
    <SocketContext.Provider value={{ socket, socketError }}>
      {children}
    </SocketContext.Provider>
  )
}
