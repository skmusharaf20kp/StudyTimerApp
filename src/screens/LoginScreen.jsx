import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './LoginScreen.css'

const LoginScreen = () => {
  const navigate = useNavigate()
  const { loginWithGoogle, loginWithMobile, signup } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await loginWithGoogle()
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEmailLogin = async () => {
    setLoading(true)
    try {
      await signup('user@example.com', 'password', 'User')
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMobileLogin = async () => {
    setLoading(true)
    try {
      await loginWithMobile('+1234567890')
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async () => {
    setLoading(true)
    try {
      await signup('newuser@example.com', 'password', 'New User')
      navigate('/')
    } catch (error) {
      console.error('Signup failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-screen">
      <div className="desktop-container">
        <div className="login-container">
          <h1 className="logo">Study App</h1>
          
          <button 
            className="social-button google-button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
              alt="Google"
              className="social-icon" 
            />
            <span>Sign in with Google</span>
          </button>
          
          <button 
            className="social-button email-button"
            onClick={handleEmailLogin}
            disabled={loading}
          >
            <img 
              src="https://cdn-icons-png.flaticon.com/512/1782/1782765.png" 
              alt="Email"
              className="social-icon" 
            />
            <span>Sign in with Email</span>
          </button>
          
          <button 
            className="social-button mobile-button"
            onClick={handleMobileLogin}
            disabled={loading}
          >
            <img 
              src="https://cdn-icons-png.flaticon.com/512/0/191.png" 
              alt="Mobile"
              className="social-icon" 
            />
            <span>Sign in with Mobile</span>
          </button>
          
          <button 
            className="signup-button"
            onClick={handleSignUp}
            disabled={loading}
          >
            Sign up
          </button>

          {loading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginScreen