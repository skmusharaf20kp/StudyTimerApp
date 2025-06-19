import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { MOCK_USER, STUDY_STATS } from '../data/mockData'
import './DashboardScreen.css'

const DashboardScreen = () => {
  const navigate = useNavigate()

  const progressPercentage = (STUDY_STATS.todayHours / 8) * 100 // Assuming 8 hours daily goal

  return (
    <div className="dashboard-screen">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="header-title">Dashboard</h1>
        <div className="header-spacer"></div>
      </div>
      
      <div className="dashboard-content">
        <div className="welcome-section">
          <h2 className="welcome-text">Welcome back, {MOCK_USER.name}!</h2>
          <p className="welcome-subtitle">Ready to continue your learning journey?</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{STUDY_STATS.streak}</div>
            <div className="stat-label">Day Streak</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{STUDY_STATS.todayHours}h</div>
            <div className="stat-label">Today</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{STUDY_STATS.weeklyHours}h</div>
            <div className="stat-label">This Week</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{STUDY_STATS.achievements}</div>
            <div className="stat-label">Achievements</div>
          </div>
        </div>
        
        <div className="plan-section">
          <p className="section-title">Active Study Plan</p>
          <h3 className="plan-name">{MOCK_USER.level}</h3>
        </div>
        
        <div className="progress-section">
          <p className="section-subtitle">Hours Studied Today</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
          
          <div className="progress-text-container">
            <span className="progress-number">{Math.round(progressPercentage)}</span>
            <span className="progress-percent">%</span>
          </div>
          <p className="progress-label">Study Progress</p>
        </div>
        
        <button 
          className="primary-button"
          onClick={() => navigate('/reading-mode')}
        >
          Continue Studying
        </button>

        <div className="quick-actions">
          <button 
            className="action-button"
            onClick={() => navigate('/todo')}
          >
            📝 View Tasks
          </button>
          <button 
            className="action-button"
            onClick={() => navigate('/calendar')}
          >
            📅 Check Schedule
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardScreen