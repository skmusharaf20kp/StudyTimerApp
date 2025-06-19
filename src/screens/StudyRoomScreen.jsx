import React, { useState } from 'react'
import { ArrowLeft, MessageCircle, Send, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { CHAT_MESSAGES, READING_ROOM_USERS } from '../data/mockData'
import './StudyRoomScreen.css'

const StudyRoomScreen = () => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState(CHAT_MESSAGES)
  const [newMessage, setNewMessage] = useState('')
  const [studyTime, setStudyTime] = useState('01:26')

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        sender: 'Me',
        message: newMessage,
        avatar: 'https://i.pravatar.cc/100?img=5',
        isMe: true,
        timestamp: new Date().toTimeString().slice(0, 5)
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className="study-room-screen">
      <div className="room-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="room-title">Study Room</h1>
        <button className="leave-button">
          Leave
        </button>
      </div>
      
      <div className="room-info">
        <div className="room-id-container">
          <span className="room-id">01S1sa2</span>
          <Users size={16} color="#6B7280" />
          <span className="user-count">{READING_ROOM_USERS.length}</span>
        </div>
        <div className="room-time-container">
          <span className="room-time">{studyTime}</span>
        </div>
      </div>

      <div className="participants-section">
        <h3 className="section-title">Participants</h3>
        <div className="participants-list">
          {READING_ROOM_USERS.slice(0, 4).map((user) => (
            <div key={user.id} className="participant-item">
              <img src={user.avatar} alt={user.name} className="participant-avatar" />
              <div className="participant-info">
                <span className="participant-name">{user.name}</span>
                <span className={`participant-status ${user.status}`}>
                  {user.status}
                </span>
              </div>
              <span className="participant-hours">{user.hours}h</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`message-container ${msg.isMe ? 'my-message' : 'other-message'}`}
            >
              {!msg.isMe && (
                <img src={msg.avatar} alt={msg.sender} className="message-avatar" />
              )}
              <div className="message-content">
                {!msg.isMe && (
                  <span className="message-sender">{msg.sender}</span>
                )}
                <div className={`message-bubble ${msg.isMe ? 'my-bubble' : 'other-bubble'}`}>
                  <span className={`message-text ${msg.isMe ? 'my-text' : 'other-text'}`}>
                    {msg.message}
                  </span>
                </div>
                <span className="message-time">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="message-input-container">
          <input
            type="text"
            className="message-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />
          <button className="send-button" onClick={sendMessage}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudyRoomScreen