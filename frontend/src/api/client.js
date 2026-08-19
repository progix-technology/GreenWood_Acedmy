const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

/**
 * Custom Fetch Wrapper with automatic Credentials (HttpOnly Cookie support) & Bearer Headers
 */
export async function apiClient(endpoint, { body, customHeaders, ...customConfig } = {}) {
  const token = localStorage.getItem('admin_token')

  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const config = {
    method: body ? 'POST' : 'GET',
    credentials: 'include', // Includes HttpOnly session cookies for cross-origin security
    ...customConfig,
    headers,
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config)
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      if (response.status === 401 && token) {
        localStorage.removeItem('admin_token')
      }
      const errorMsg = data.error || data.message || `Request failed with status ${response.status}`
      throw new Error(errorMsg)
    }

    return data
  } catch (error) {
    throw error
  }
}
