import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HostLanding from './pages/HostLanding'
import PlayerLanding from './pages/PlayerLanding'
import Lobby from './pages/Lobby'
import TriviaGame from './pages/TriviaGame'
import Admin from './pages/Admin'
import { SocketProvider } from './components/SocketContext'

function App() {
  return (
    <div className="app-container">
      <div className="app">
        <SocketProvider>
          <Routes>
            <Route exact path="/:businessId" element={<HostLanding />} />
            <Route
              exact
              path="/join/:businessId/:roomId"
              element={<PlayerLanding />}
            />
            <Route path="/lobby/:businessId/:roomId" element={<Lobby />} />
            <Route path="/game/:businessId/:roomId" element={<TriviaGame />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </SocketProvider>
      </div>
    </div>
  )
}

export default App
