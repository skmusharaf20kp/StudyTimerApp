import { TIME_FORMATS, VALIDATION } from './constants'

// Time formatting utilities
export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
}

export const formatDate = (date, format = 'default') => {
  const d = new Date(date)
  
  switch (format) {
    case 'short':
      return d.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    case 'long':
      return d.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    case 'time':
      return d.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    default:
      return d.toLocaleDateString('en-US')
  }
}

export const getTimeAgo = (date) => {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now - past) / 1000)

  if (diffInSeconds < 60) {
    return 'Just now'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}h ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays}d ago`
  }

  return formatDate(date, 'short')
}

// Validation utilities
export const validateEmail = (email) => {
  return VALIDATION.EMAIL_REGEX.test(email)
}

export const validatePassword = (password) => {
  return password && password.length >= VALIDATION.PASSWORD_MIN_LENGTH
}

export const validateName = (name) => {
  return name && 
         name.length >= VALIDATION.NAME_MIN_LENGTH && 
         name.length <= VALIDATION.NAME_MAX_LENGTH
}

// Study utilities
export const calculateProgress = (current, target) => {
  if (!target || target === 0) return 0
  return Math.min(Math.round((current / target) * 100), 100)
}

export const calculateStreak = (studyDates) => {
  if (!studyDates || studyDates.length === 0) return 0

  const sortedDates = studyDates
    .map(date => new Date(date))
    .sort((a, b) => b - a)

  let streak = 0
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  for (const studyDate of sortedDates) {
    const studyDay = new Date(studyDate)
    studyDay.setHours(0, 0, 0, 0)

    const diffInDays = Math.floor((currentDate - studyDay) / (1000 * 60 * 60 * 24))

    if (diffInDays === streak) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else if (diffInDays > streak) {
      break
    }
  }

  return streak
}

export const getStudyLevel = (totalHours) => {
  if (totalHours < 10) return 'Beginner'
  if (totalHours < 50) return 'Intermediate'
  if (totalHours < 100) return 'Advanced'
  if (totalHours < 200) return 'Expert'
  return 'Master'
}

// Color utilities
export const getSubjectColor = (subject) => {
  const colors = {
    'Math': '#E3F2FD',
    'Physics': '#F3E5F5',
    'Chemistry': '#E8F5E8',
    'Biology': '#FFF3E0',
    'English': '#FCE4EC',
    'History': '#F1F8E9',
    'Geography': '#E0F2F1',
    'Computer Science': '#E8EAF6'
  }
  return colors[subject] || '#F5F5F5'
}

export const getPriorityColor = (priority) => {
  const colors = {
    'high': '#EF4444',
    'medium': '#F59E0B',
    'low': '#10B981'
  }
  return colors[priority] || '#6B7280'
}

export const getStatusColor = (status) => {
  const colors = {
    'online': '#10B981',
    'studying': '#3B82F6',
    'break': '#F59E0B',
    'offline': '#6B7280'
  }
  return colors[status] || '#6B7280'
}

// Local storage utilities
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return defaultValue
  }
}

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}

// Array utilities
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key]
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {})
}

export const sortBy = (array, key, direction = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (direction === 'desc') {
      return bVal > aVal ? 1 : -1
    }
    return aVal > bVal ? 1 : -1
  })
}

// Random utilities
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const getRandomColor = () => {
  const colors = [
    '#E3F2FD', '#F3E5F5', '#E8F5E8', '#FFF3E0',
    '#FCE4EC', '#F1F8E9', '#E0F2F1', '#E8EAF6'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Debounce utility
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle utility
export const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Device detection
export const isMobile = () => {
  return window.innerWidth <= 768
}

export const isTablet = () => {
  return window.innerWidth > 768 && window.innerWidth <= 1024
}

export const isDesktop = () => {
  return window.innerWidth > 1024
}

// Notification utilities
export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }
  return false
}

export const showNotification = (title, options = {}) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    return new Notification(title, {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      ...options
    })
  }
}

// PWA utilities
export const isStandalone = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true
}

export const canInstallPWA = () => {
  return 'serviceWorker' in navigator && 'PushManager' in window
}