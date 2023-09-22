import React, { createContext } from 'react';
import io from 'socket.io-client';

// Create a context for the socket
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = io.connect('http://localhost:3001/');

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
