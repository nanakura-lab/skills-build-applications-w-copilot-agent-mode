import { useEffect, useState } from 'react'

function Workouts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiEndpoint = codespaceName && codespaceName !== 'undefined' && codespaceName !== 'null'
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          headers: { Accept: 'application/json' },
        })
        if (!response.ok) {
          throw new Error('Unable to load workouts')
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
        <h2 className="h4 mb-3">Workouts</h2>
        {loading && <div className="alert alert-info">Loading workouts...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <div className="row g-3">
            {items.map((item, index) => (
              <div className="col-md-6" key={item.id || item._id || `${item.name || 'workout'}-${index}`}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 mb-2">{item.name || 'Workout'}</h3>
                  <p className="text-muted mb-2">{item.description || 'Workout details will appear here.'}</p>
                  <div>
                    <strong>Type:</strong> {item.type || item.category || 'General'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Workouts
