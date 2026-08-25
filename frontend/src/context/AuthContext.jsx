import { useEffect, useMemo, useState } from 'react'
import { getCurrentUser, loginUser, registerUser } from '../services/auth.js'
import { AuthContext } from './auth-context.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('eventhub_token')))

  useEffect(() => {
    const token = localStorage.getItem('eventhub_token')
    if (!token) return
    getCurrentUser()
      .then(({ user: currentUser }) => setUser(currentUser))
      .catch(() => localStorage.removeItem('eventhub_token'))
      .finally(() => setLoading(false))
  }, [])

  const login = async (credentials) => {
    const result = await loginUser(credentials)
    localStorage.setItem('eventhub_token', result.token)
    setUser(result.user)
    return result.user
  }

  const register = (data) => registerUser(data)
  const logout = () => {
    localStorage.removeItem('eventhub_token')
    setUser(null)
  }

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
