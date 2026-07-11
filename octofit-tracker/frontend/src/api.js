export const getApiBaseUrl = () => {
  const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const codespaceName = rawCodespaceName && rawCodespaceName !== 'undefined' && rawCodespaceName !== 'null'
    ? rawCodespaceName
    : ''

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

export const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  if (Array.isArray(payload.data)) {
    return payload.data
  }

  if (Array.isArray(payload.results)) {
    return payload.results
  }

  if (Array.isArray(payload.items)) {
    return payload.items
  }

  return []
}

export const fetchCollection = async (component) => {
  const endpoint = component.startsWith('/api/') ? component : `/api/${component}/`
  const response = await fetch(`${getApiBaseUrl()}${endpoint}`, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Unable to load ${component}`)
  }

  const payload = await response.json()
  return normalizeCollection(payload)
}
