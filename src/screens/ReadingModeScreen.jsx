import React, { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './ReadingModeScreen.css'

const ReadingModeScreen = () => {
  const navigate = useNavigate()
  
  // Timer state
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(25)
  const [hours, setHours] = useState(0)
  const [isActive, setIsActive] = useState(false)
  
  // Subject information
  const [currentSubject, setCurrentSubject] = useState('Biology')
  const [nextSubject, setNextSubject] = useState('Math')
  
  // Progress data
  const [targetTime] = useState('2h 0m')
  const [todayTime] = useState('1h 30m')
  const [progressPercentage] = useState(75) // 1h30m out of 2h = 75%

  useEffect(() => {
    let interval = null
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1)
            setSeconds(59)
          } else {
            if (hours > 0) {
              setHours(hours - 1)
              setMinutes(59)
              setSeconds(59)
            } else {
              // Timer finished
              setIsActive(false)
              // You could add notification here
            }
          }
        }
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    
    return () => clearInterval(interval)
  }, [isActive, seconds, minutes, hours])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setHours(0)
    setMinutes(25)
    setSeconds(0)
  }

  const formatNumber = (number) => {
    return number.toString().padStart(2, '0')
  }

  const handleSubjectChange = () => {
    // In a real app, you might want to save the current session data
    // before changing subjects
    setCurrentSubject(nextSubject)
    setNextSubject('Chemistry') // This would come from your subjects list
    resetTimer()
  }

  const totalSeconds = hours * 3600 + minutes * 60 + seconds
  const initialSeconds = 25 * 60 // 25 minutes
  const progress = ((initialSeconds - totalSeconds) / initialSeconds) * 100

  return (
    <div className="reading-mode-screen">
      <div className="reading-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="reading-title">Reading</h1>
        <div className="header-spacer"></div>
      </div>
      
      {/* Current Subject Card */}
      <div className="subject-card">
        <p className="subject-label">Current Subject</p>
        <h2 className="subject-name">{currentSubject}</h2>
      </div>
      
      {/* Timer Circle */}
      <div className="timer-container">
        <div className="timer-circle">
          <svg className="timer-progress" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
              transform="rotate(-90 100 100)"
              className="progress-circle"
            />
          </svg>
          <div className="timer-content">
            <div className="timer-text">
              {`${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`}
            </div>
            <button 
              className={`timer-button ${isActive ? 'pause' : 'play'}`}
              onClick={toggleTimer}
            >
              {isActive ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className="timer-controls">
        <button className="control-button" onClick={resetTimer}>
          <RotateCcw size={20} />
          <span>Reset</span>
        </button>
      </div>
      
      {/* Next Subject Card */}
      <button 
        className="subject-card next-subject"
        onClick={handleSubjectChange}
      >
        <p className="subject-label">Next Subject</p>
        <h2 className="subject-name">{nextSubject}</h2>
      </button>
      
      {/* Today's Progress */}
      <div className="progress-container">
        <div className="progress-header">
          <h3 className="progress-title">Today</h3>
          <p className="progress-target">Target {targetTime}</p>
        </div>
        
        <div className="progress-card">
          <div className="progress-labels">
            <span className="progress-day">Today</span>
            <span className="progress-time">{todayTime}</span>
          </div>
          
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReadingModeScreen