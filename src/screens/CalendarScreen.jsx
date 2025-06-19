import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { CALENDAR_EVENTS } from '../data/mockData'
import './CalendarScreen.css'

const CalendarScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState('Apr')
  const [selectedDate, setSelectedDate] = useState(null)

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'exam': return '📝'
      case 'study': return '📚'
      case 'group': return '👥'
      case 'event': return '🎯'
      default: return '📅'
    }
  }

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'exam': return '#EF4444'
      case 'study': return '#3B82F6'
      case 'group': return '#10B981'
      case 'event': return '#F59E0B'
      default: return '#6B7280'
    }
  }

  return (
    <div className="calendar-screen">
      <div className="screen-header">
        <h1 className="screen-title">Calendar</h1>
        <button className="add-event-button">
          <Plus size={24} />
        </button>
      </div>

      <div className="month-selector">
        <button className="month-nav-button">
          <ChevronLeft size={20} />
        </button>
        <div className="month-display">
          <h2 className="current-month">{selectedMonth} 2024</h2>
        </div>
        <button className="month-nav-button">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="calendar-grid">
        <div className="weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="dates-grid">
          {Array.from({ length: 30 }, (_, i) => i + 1).map(date => (
            <button
              key={date}
              className={`date-cell ${selectedDate === date ? 'selected' : ''}`}
              onClick={() => setSelectedDate(date)}
            >
              <span className="date-number">{date}</span>
              {CALENDAR_EVENTS.some(event => event.date.includes(date.toString())) && (
                <div className="event-indicator"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="events-section">
        <h3 className="events-heading">Upcoming events</h3>
        
        <div className="events-list">
          {CALENDAR_EVENTS.map((event) => (
            <div key={event.id} className="event-item">
              <div className="event-date-container">
                <div className="event-icon">
                  {getEventTypeIcon(event.type)}
                </div>
                <div className="event-date-info">
                  <p className="event-date">{event.date}</p>
                  {event.timeStart && (
                    <p className="event-time">{event.timeStart} - {event.timeEnd}</p>
                  )}
                  {event.time && (
                    <p className="event-time">{event.time}</p>
                  )}
                </div>
              </div>
              
              <div className="event-details-container">
                <h4 className="event-name">{event.event}</h4>
                {event.group && (
                  <p className="event-group" style={{ color: getEventTypeColor(event.type) }}>
                    {event.group}
                  </p>
                )}
                {event.details && (
                  <p className="event-details">{event.details}</p>
                )}
                {event.hours && (
                  <p className="event-hours">{event.hours}</p>
                )}
              </div>

              <div className="event-actions">
                <button className="event-action-button">
                  ⋯
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CalendarScreen