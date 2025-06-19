import React from 'react'
import './ProgressBar.css'

const ProgressBar = ({ 
  progress = 0, 
  height = 8, 
  color = '#3B82F6',
  backgroundColor = '#F3F4F6',
  showLabel = false,
  label = '',
  animated = false,
  striped = false,
  className = ''
}) => {
  const progressValue = Math.min(Math.max(progress, 0), 100)

  return (
    <div className={`progress-bar-container ${className}`}>
      {showLabel && (
        <div className="progress-label">
          <span>{label}</span>
          <span>{progressValue}%</span>
        </div>
      )}
      <div 
        className={`progress-bar-track ${animated ? 'animated' : ''} ${striped ? 'striped' : ''}`}
        style={{ 
          height: `${height}px`,
          backgroundColor 
        }}
      >
        <div 
          className="progress-bar-fill"
          style={{ 
            width: `${progressValue}%`,
            backgroundColor: color,
            height: '100%'
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar