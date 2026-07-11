import { useEffect, useState } from 'react'

function Activities() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiEndpoint = codespaceName && codespaceName !== 'undefined' && codespaceName !== 'null'
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          headers: { Accept: 'application/json' },
        })
        if (!response.ok) {
          throw new Error('Unable to load activities')
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
        <h2 className="h4 mb-3">Activities</h2>
        {loading && <div className="alert alert-info">Loading activities...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id || item._id || `${item.name || 'activity'}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{item.name || item.type || 'Activity'}</td>
                    <td>{Object.entries(item).map(([key, value]) => `${key}: ${value}`).join(' · ')}</td>
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

export default Activities
