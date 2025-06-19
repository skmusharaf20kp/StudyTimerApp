import React from 'react'
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react'
import { useTimer } from '../hooks/useTimer'
import { useNotifications } from '../hooks/useNotifications'
import './Timer.css'

const Timer = ({ 
  initialTime = 1500, // 25 minutes default
  onComplete,
  showControls = true,
  size = 'large'
}) => {
  const {
    time,
    isActive,
    isPaused,
    start,
    pause,
    resume,
    stop,
    reset,
    addTime,
    formatTime,
    progress,
    isCompleted
  } = useTimer(initialTime)

  const { notifyTimerComplete } = useNotifications()

  React.useEffect(() => {
    if (isCompleted) {
      notifyTimerComplete()
      onComplete?.()
    }
  }, [isCompleted, onComplete, notifyTimerComplete])

  const toggleTimer = () => {
    if (isActive && !isPaused) {
      pause()
    } else if (isPaused) {
      resume()
    } else {
      start()
    }
  }

  const handleReset = () => {
    reset()
  }

  const addMinutes = (minutes) => {
    addTime(minutes * 60)
  }

  const circleSize = size === 'large' ? 280 : size === 'medium' ? 200 : 150
  const strokeWidth = size === 'large' ? 8 : 6
  const radius = (circleSize - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={`timer-component ${size}`}>
      <div className="timer-circle-container">
        <svg 
          className="timer-svg" 
          width={circleSize} 
          height={circleSize}
        >
          {/* Background circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke="#3B82F6"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
            className="progress-circle"
          />
        </svg>
        
        <div className="timer-content">
          <div className="timer-display">
            {formatTime()}
          </div>
          
          <button 
            className={`timer-play-button ${isActive && !isPaused ? 'pause' : 'play'}`}
            onClick={toggleTimer}
          >
            {isActive && !isPaused ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>
      </div>

      {showControls && (
        <div className="timer-controls">
          <button 
            className="timer-control-button"
            onClick={() => addMinutes(-5)}
            disabled={time <= 300}
          >
            <Minus size={16} />
            <span>5m</span>
          </button>
          
          <button 
            className="timer-control-button reset"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
          
          <button 
            className="timer-control-button"
            onClick={() => addMinutes(5)}
          >
            <Plus size={16} />
            <span>5m</span>
          </button>
        </div>
      )}

      {isCompleted && (
        <div className="timer-completion">
          <div className="completion-message">
            🎉 Timer Complete!
          </div>
        </div>
      )}
    </div>
  )
}

export default Timer