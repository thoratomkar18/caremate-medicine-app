import { useState, useEffect, createContext, useContext } from 'react'
import { apiClient } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken')
      if (token) {
        try {
          const userData = await apiClient.getCurrentUser()
          setUser(userData)
        } catch (error) {
          console.error('Failed to get current user:', error)
          localStorage.removeItem('authToken')
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email, password) => {
    try {
      setError(null)
      const response = await apiClient.login(email, password)
      
      localStorage.setItem('authToken', response.token)
      setUser(response.user)
      
      return response
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const signup = async (userData) => {
    try {
      setError(null)
      const response = await apiClient.signup(userData)
      
      localStorage.setItem('authToken', response.token)
      setUser(response.user)
      
      return response
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
    setError(null)
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
  }

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
