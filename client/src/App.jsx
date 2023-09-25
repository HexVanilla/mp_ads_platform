import './App.css'
import { Routes, Route } from 'react-router-dom'
import HostLanding from './pages/HostLanding'
import PlayerLanding from './pages/PlayerLanding'
import Lobby from './pages/Lobby'
import TriviaGame from './pages/TriviaGame'
import BalloonPopperGame from './pages/BalloonPopperGame'
import FullPageAd from './pages/FullPageAd'
import GoodBye from './pages/GoodBye'
import ServerDown from './pages/ServerDown'
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
            <Route
              path="/triviaGame/:businessId/:roomId"
              element={<TriviaGame />}
            />
            <Route
              path="/balloonPopperGame/:businessId/:roomId"
              element={<BalloonPopperGame />}
            />
            <Route path="/ads/:businessId/:roomId" element={<FullPageAd />} />
            <Route path="/goodbye/:businessId" element={<GoodBye />} />
            <Route path="/serverDown" element={<ServerDown />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </SocketProvider>
      </div>
    </div>
  )
}

export default App
