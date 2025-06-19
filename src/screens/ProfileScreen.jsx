import React from 'react'
import { ArrowLeft, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { MOCK_USER } from '../data/mockData'
import './ProfileScreen.css'

const ProfileScreen = () => {
  const navigate = useNavigate()

  return (
    <div className="profile-screen">
      <div className="profile-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="profile-title">Profile</h1>
        <div className="header-spacer"></div>
      </div>
      
      <div className="profile-content">
        <div className="avatar-container">
          <div className="avatar">
            {MOCK_USER.avatar ? (
              <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="avatar-image" />
            ) : (
              <User size={40} color="#6B7280" />
            )}
          </div>
        </div>
        
        <h2 className="profile-name">{MOCK_USER.name}</h2>
        <p className="profile-age">{MOCK_USER.age}</p>
        
        <div className="profile-info-container">
          <span className="profile-info-label">Year</span>
          <span className="profile-info-value">{MOCK_USER.year}</span>
        </div>
        
        <div className="profile-career-container">
          <p className="profile-career-label">Preparing for</p>
          <p className="profile-career-value">{MOCK_USER.preparing_for}</p>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">{MOCK_USER.studyStreak}</span>
            <span className="stat-label">Day Streak</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{MOCK_USER.totalHours}h</span>
            <span className="stat-label">Total Hours</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{MOCK_USER.level}</span>
            <span className="stat-label">Level</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="edit-profile-button">
            Edit Profile
          </button>
          <button className="settings-button">
            Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen