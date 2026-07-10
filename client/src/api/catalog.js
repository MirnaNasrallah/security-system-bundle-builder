import fallbackCatalog from '../data/catalog.json'

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function getCatalog() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/catalog`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(2500),
    })
    if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`)
    return await response.json()
  } catch {
    return fallbackCatalog
  }
}
