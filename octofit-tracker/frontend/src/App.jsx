import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const codespaceName = rawCodespaceName && rawCodespaceName !== 'undefined' && rawCodespaceName !== 'null'
    ? rawCodespaceName
    : ''
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">Octofit Tracker</span>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="card shadow-sm">
                <div className="card-body">
                  <h1 className="h3 mb-3">Welcome to Octofit Tracker</h1>
                  <p className="text-muted mb-0">
                    Explore community activity, teams, leaderboard rankings, users, and training programs.
                  </p>
                  <p className="mt-3 mb-0 text-muted">API base URL: {apiBaseUrl}</p>
                </div>
              </div>
            }
          />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
