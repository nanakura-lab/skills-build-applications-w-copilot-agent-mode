import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Teams() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        const data = await fetchCollection('/api/teams/')
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
        <h2 className="h4 mb-3">Teams</h2>
        {loading && <div className="alert alert-info">Loading teams...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <div className="row g-3">
            {items.map((item, index) => (
              <div className="col-md-6" key={item.id || item._id || `${item.name || 'team'}-${index}`}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 mb-2">{item.name || 'Team'}</h3>
                  <p className="text-muted mb-2">{item.description || 'Team details will appear here.'}</p>
                  <div>
                    <strong>Members:</strong> {Array.isArray(item.members) ? item.members.join(', ') : item.members || '—'}
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

export default Teams
