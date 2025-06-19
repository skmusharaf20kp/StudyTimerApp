import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    try {
      // Mock login - replace with actual API call
      const mockUser = {
        id: '1',
        name: 'Anna Smith',
        email,
        age: 21,
        year: '3rd Year',
        preparing_for: 'UI Designer'
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setLoading(true)
    try {
      // Mock Google login
      const mockUser = {
        id: '1',
        name: 'Anna Smith',
        email: 'anna@gmail.com',
        age: 21,
        year: '3rd Year',
        preparing_for: 'UI Designer'
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } catch (error) {
      console.error('Google login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const loginWithMobile = async (mobile) => {
    setLoading(true)
    try {
      // Mock mobile login
      const mockUser = {
        id: '1',
        name: 'Anna Smith',
        email: 'anna@example.com',
        mobile,
        age: 21,
        year: '3rd Year',
        preparing_for: 'UI Designer'
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } catch (error) {
      console.error('Mobile login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email, password, name) => {
    setLoading(true)
    try {
      // Mock signup
      const mockUser = {
        id: Date.now().toString(),
        name,
        email,
        age: 21,
        year: '1st Year',
        preparing_for: 'Student'
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } catch (error) {
      console.error('Signup failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    loginWithGoogle,
    loginWithMobile,
    logout,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}