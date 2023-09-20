import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HostLanding from './pages/HostLanding'
import PlayerLanding from './pages/PlayerLanding'
import Lobby from './pages/Lobby'
import Game from './pages/Game'
import Admin from './pages/Admin'

function App() {
  return (
    <div className="app-container">
      <div className="app">
        <Routes>
          <Route exact path="/:businessId" element={<HostLanding />} />
          <Route
            exact
            path="/join/:businessId/:roomId"
            element={<PlayerLanding />}
          />
          <Route path="/lobby/:businessId/:roomId" element={<Lobby />} />
          <Route path="/game/:businessId/:roomId" element={<Game />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
