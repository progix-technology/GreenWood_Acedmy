export const initialToppersData = []

const LOCAL_STORAGE_KEY = 'greenwood_board_toppers_v3'

export const getToppers = () => {
  try {
    // Clear old legacy caches
    localStorage.removeItem('greenwood_board_toppers')
    localStorage.removeItem('greenwood_board_toppers_v2')

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch (err) {
    console.error('Failed to load toppers from localStorage:', err)
  }
  return []
}

export const resetToppersData = () => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]))
    window.dispatchEvent(new Event('toppersUpdated'))
    saveToppers([])
  } catch (err) {
    console.error('Failed to reset toppers:', err)
  }
  return []
}

export const saveToppers = async (toppers) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toppers))
    window.dispatchEvent(new Event('toppersUpdated'))

    // Sync live to Render backend MongoDB server
    const apiUrl = import.meta.env.VITE_API_URL || 'https://greenwood-acedmy.onrender.com/api'
    const res = await fetch(`${apiUrl}/toppers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toppers),
    })
    if (res.ok) {
      const data = await res.json()
      console.log('✅ Toppers saved to MongoDB Atlas:', data)
      return data
    }
  } catch (err) {
    console.error('Failed to save toppers to database:', err)
  }
  return null
}

export const syncToppersFromApi = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://greenwood-acedmy.onrender.com/api'
    const res = await fetch(`${apiUrl}/toppers`)
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data)) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
        window.dispatchEvent(new Event('toppersUpdated'))
        return data
      }
    }
  } catch (err) {
    console.error('Failed to sync toppers from API:', err)
  }
  return null
}

if (typeof window !== 'undefined') {
  syncToppersFromApi()
}

export default getToppers()
