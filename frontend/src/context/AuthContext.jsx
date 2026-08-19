import React, { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('admin_token') || null)

  useEffect(() => {
    if (token) {
      authApi
        .getProfile()
        .then((data) => {
          if (data.user) setAdmin(data.user)
          else logout()
        })
        .catch(() => logout())
    }
  }, [token])

  const login = (newToken, userData) => {
    localStorage.setItem('admin_token', newToken)
    setToken(newToken)
    setAdmin(userData)
  }

  const logout = () => {
    authApi.logout().catch(() => {})
    localStorage.removeItem('admin_token')
    setToken(null)
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
