import { useEffect, useState } from 'react'

function Leaderboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiEndpoint = codespaceName && codespaceName !== 'undefined' && codespaceName !== 'null'
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          headers: { Accept: 'application/json' },
        })
        if (!response.ok) {
          throw new Error('Unable to load leaderboard')
        }

        const payload = await response.json()
        const data = Array.isArray(payload)
          ? payload
          : payload.data || payload.results || payload.items || []

        if (active) {
          setItems(data)
        }
      } catch (err) {
        if (active) {
          setError(err.message)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        {loading && <div className="alert alert-info">Loading leaderboard...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id || item._id || `${item.name || 'leader'}-${index}`}>
                    <td>{item.rank || index + 1}</td>
                    <td>{item.name || item.user || 'Unknown'}</td>
                    <td>{item.points || item.score || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
