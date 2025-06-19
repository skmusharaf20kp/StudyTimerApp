import React, { useState, useEffect } from 'react'
import { Plus, Calendar, Clock, CheckCircle, Users, Award, BookOpen } from 'lucide-react'
import { 
  TIMETABLE_SCHEDULE, 
  READING_ROOM_USERS, 
  CHAT_MESSAGES, 
  BADGES, 
  MOCK_NOTES 
} from '../data/mockData'
import './TimeTableScreen.css'

const TimeTableScreen = () => {
  const [currentTab, setCurrentTab] = useState('continue')
  const [selectedDate, setSelectedDate] = useState('2024-01-20')
  const [completedReadings, setCompletedReadings] = useState([])
  const [notes, setNotes] = useState(MOCK_NOTES)
  const [chatMessages, setChatMessages] = useState(CHAT_MESSAGES)
  const [newMessage, setNewMessage] = useState('')
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', description: '' })

  const tabs = [
    { id: 'continue', label: 'Continue Reading', icon: BookOpen },
    { id: 'timetable', label: 'Time Table', icon: Calendar },
    { id: 'room', label: 'Reading Room', icon: Users },
    { id: 'completed', label: 'Completed', icon: CheckCircle },
    { id: 'notes', label: 'Notes', icon: BookOpen },
    { id: 'badges', label: 'Streaks', icon: Award }
  ]

  const getCurrentDateTime = () => {
    const now = new Date()
    const date = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const time = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
    return { date, time }
  }

  const markSubjectComplete = (item) => {
    const completed = {
      id: Date.now(),
      subject: item.subject,
      duration: item.duration,
      completedAt: new Date().toTimeString().slice(0, 5)
    }
    setCompletedReadings([completed, ...completedReadings])
    
    // Remove from schedule
    const updatedSchedule = { ...TIMETABLE_SCHEDULE }
    updatedSchedule[selectedDate] = updatedSchedule[selectedDate]?.filter(
      sub => sub.id !== item.id
    ) || []
  }

  const addNote = () => {
    if (newNote.title.trim() && newNote.description.trim()) {
      const note = {
        id: Date.now(),
        title: newNote.title,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        description: newNote.description,
        subject: 'General'
      }
      setNotes([note, ...notes])
      setNewNote({ title: '', description: '' })
      setShowNoteModal(false)
    }
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'You',
        message: newMessage,
        timestamp: new Date().toTimeString().slice(0, 5),
        isMe: true,
        avatar: 'https://i.pravatar.cc/100?img=5'
      }
      setChatMessages([...chatMessages, message])
      setNewMessage('')
    }
  }

  const renderContinueReading = () => {
    const schedule = TIMETABLE_SCHEDULE[selectedDate] || []
    const { date, time } = getCurrentDateTime()

    return (
      <div className="continue-reading">
        <div className="datetime-header">
          <p className="current-date">{date}</p>
          <p className="current-time">{time}</p>
        </div>
        
        <div className="divider"></div>
        
        <h3 className="section-title">Today's Focus</h3>
        
        {schedule.length > 0 ? (
          schedule.map((item) => (
            <button
              key={item.id}
              className="focus-item"
              style={{ backgroundColor: item.color }}
              onClick={() => markSubjectComplete(item)}
            >
              <div className="focus-time">
                <span className="time-text">{item.duration}min</span>
              </div>
              <div className="focus-details">
                <h4 className="focus-subject">{item.subject}</h4>
                <p className="focus-time-range">
                  {item.startTime} - {item.endTime}
                </p>
                <p className="focus-status">Tap to confirm completion</p>
              </div>
            </button>
          ))
        ) : (
          <div className="empty-focus">
            <BookOpen size={40} color="#ccc" />
            <p className="empty-text">No subjects scheduled for today</p>
          </div>
        )}
      </div>
    )
  }

  const renderTimetable = () => {
    const schedule = TIMETABLE_SCHEDULE[selectedDate] || []
    
    return (
      <div className="timetable-section">
        <div className="timetable-header">
          <h3 className="section-title">Timetable</h3>
          <button className="add-button">
            <Plus size={20} />
          </button>
        </div>
        
        <div className="date-selector">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-input"
          />
        </div>
        
        {schedule.length > 0 ? (
          <div className="schedule-list">
            {schedule.map((item) => (
              <div
                key={item.id}
                className="schedule-item"
                style={{ backgroundColor: item.color }}
              >
                <div className="schedule-time">
                  <span className="time-text">{item.duration}min</span>
                </div>
                <div className="schedule-details">
                  <h4 className="schedule-subject">{item.subject}</h4>
                  <p className="schedule-time-range">
                    {item.startTime} - {item.endTime}
                  </p>
                </div>
                <div className="schedule-status">
                  {item.completed ? (
                    <CheckCircle size={20} color="#10B981" />
                  ) : (
                    <Clock size={20} color="#6B7280" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-schedule">
            <Calendar size={40} color="#ccc" />
            <p className="empty-text">No classes scheduled</p>
          </div>
        )}
      </div>
    )
  }

  const renderReadingRoom = () => {
    return (
      <div className="reading-room">
        <div className="rankings-section">
          <h3 className="section-title">Study Rankings</h3>
          {READING_ROOM_USERS.map((user) => (
            <div key={user.id} className="user-rank-item">
              <div className="rank-badge">
                <span className="rank-number">{user.rank}</span>
              </div>
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <div className="user-info">
                <h4 className="user-name">{user.name}</h4>
                <p className="user-hours">{user.hours} hours</p>
              </div>
              <div className={`status-indicator ${user.status}`}></div>
            </div>
          ))}
        </div>
        
        <div className="chat-section">
          <h3 className="section-title">Study Chat</h3>
          <div className="chat-container">
            <div className="chat-messages">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-message ${msg.isMe ? 'my-message' : ''}`}
                >
                  {!msg.isMe && (
                    <img src={msg.avatar} alt={msg.sender} className="message-avatar" />
                  )}
                  <div className="message-content">
                    {!msg.isMe && <p className="message-sender">{msg.sender}</p>}
                    <p className="message-text">{msg.message}</p>
                    <p className="message-time">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage} className="send-button">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCompleted = () => {
    return (
      <div className="completed-section">
        <h3 className="section-title">Today's Completed Readings</h3>
        {completedReadings.length > 0 ? (
          completedReadings.map((reading) => (
            <div key={reading.id} className="completed-item">
              <CheckCircle size={24} color="#10B981" />
              <div className="completed-details">
                <h4 className="completed-subject">{reading.subject}</h4>
                <p className="completed-info">
                  Duration: {reading.duration}min • Completed: {reading.completedAt}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-completed">
            <CheckCircle size={40} color="#ccc" />
            <p className="empty-text">No completed readings today</p>
          </div>
        )}
      </div>
    )
  }

  const renderNotes = () => {
    return (
      <div className="notes-section">
        <div className="notes-header">
          <h3 className="section-title">My Notes</h3>
          <button 
            className="add-button"
            onClick={() => setShowNoteModal(true)}
          >
            <Plus size={20} />
          </button>
        </div>
        
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="note-header">
              <h4 className="note-title">{note.title}</h4>
              <p className="note-datetime">{note.date} • {note.time}</p>
            </div>
            <p className="note-description">{note.description}</p>
            <span className="note-subject">{note.subject}</span>
          </div>
        ))}
        
        {showNoteModal && (
          <div className="modal-overlay" onClick={() => setShowNoteModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">Add New Note</h3>
              <input
                type="text"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                placeholder="Note title"
                className="note-input"
              />
              <textarea
                value={newNote.description}
                onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
                placeholder="Note description"
                className="note-textarea"
                rows={4}
              />
              <div className="modal-buttons">
                <button 
                  className="cancel-button"
                  onClick={() => setShowNoteModal(false)}
                >
                  Cancel
                </button>
                <button className="save-button" onClick={addNote}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderBadges = () => {
    return (
      <div className="badges-section">
        <h3 className="section-title">Achievements & Streaks</h3>
        <div className="badges-grid">
          {BADGES.map((badge) => (
            <div key={badge.id} className="badge-item">
              <div 
                className="badge-icon"
                style={{ backgroundColor: badge.background }}
              >
                <span className="badge-emoji">{badge.icon}</span>
              </div>
              <div className="badge-progress">
                <div 
                  className="badge-progress-bar"
                  style={{ 
                    width: `${badge.progress}%`,
                    backgroundColor: badge.color 
                  }}
                />
              </div>
              <h4 className="badge-name">{badge.name}</h4>
              <p className="badge-description">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (currentTab) {
      case 'continue':
        return renderContinueReading()
      case 'timetable':
        return renderTimetable()
      case 'room':
        return renderReadingRoom()
      case 'completed':
        return renderCompleted()
      case 'notes':
        return renderNotes()
      case 'badges':
        return renderBadges()
      default:
        return renderContinueReading()
    }
  }

  return (
    <div className="timetable-screen">
      <div className="screen-header">
        <h1 className="screen-title">Reading Space</h1>
      </div>
      
      <div className="tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => setCurrentTab(tab.id)}
          >
            <tab.icon size={16} />
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
      
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  )
}

export default TimeTableScreen