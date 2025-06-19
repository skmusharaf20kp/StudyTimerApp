// App constants
export const APP_NAME = 'FocusVault'
export const APP_DESCRIPTION = 'Unlock Your Study Power'

// Colors
export const COLORS = {
  primary: '#3B82F6',
  primaryDark: '#1D4ED8',
  secondary: '#10B981',
  background: '#FFFFFF',
  text: '#111827',
  lightText: '#6B7280',
  border: '#E5E7EB',
  lightBg: '#F3F4F6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6'
}

// API endpoints (for future backend integration)
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
    STATS: '/user/stats'
  },
  STUDY: {
    PLANS: '/study/plans',
    SESSIONS: '/study/sessions',
    PROGRESS: '/study/progress'
  },
  TODOS: {
    LIST: '/todos',
    CREATE: '/todos',
    UPDATE: '/todos/:id',
    DELETE: '/todos/:id'
  },
  CALENDAR: {
    EVENTS: '/calendar/events',
    CREATE: '/calendar/events',
    UPDATE: '/calendar/events/:id',
    DELETE: '/calendar/events/:id'
  },
  NOTES: {
    LIST: '/notes',
    CREATE: '/notes',
    UPDATE: '/notes/:id',
    DELETE: '/notes/:id'
  },
  CHAT: {
    MESSAGES: '/chat/messages',
    SEND: '/chat/send',
    ROOMS: '/chat/rooms'
  }
}

// Local storage keys
export const STORAGE_KEYS = {
  USER: 'user',
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  STUDY_PROGRESS: 'studyProgress',
  SETTINGS: 'settings'
}

// Study plan types
export const STUDY_PLAN_TYPES = {
  BASIC: 'basic',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
}

// Priority levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
}

// Status types
export const STATUS_TYPES = {
  ONLINE: 'online',
  STUDYING: 'studying',
  BREAK: 'break',
  OFFLINE: 'offline'
}

// Event types
export const EVENT_TYPES = {
  STUDY: 'study',
  EXAM: 'exam',
  GROUP: 'group',
  EVENT: 'event'
}

// Badge types
export const BADGE_TYPES = {
  STREAK: 'streak',
  EARLY_BIRD: 'early',
  NIGHT_OWL: 'night',
  CONSISTENT_READER: 'reader'
}

// Time formats
export const TIME_FORMATS = {
  TIMER: 'HH:mm:ss',
  CLOCK: 'HH:mm',
  DATE: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss'
}

// Validation rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50
}

// Cache settings (for Redis integration)
export const CACHE_SETTINGS = {
  TTL: {
    USER_PROFILE: 3600, // 1 hour
    STUDY_STATS: 1800, // 30 minutes
    LEADERBOARD: 300, // 5 minutes
    CHAT_MESSAGES: 86400 // 24 hours
  },
  KEYS: {
    USER_PROFILE: 'user:profile:',
    STUDY_STATS: 'study:stats:',
    LEADERBOARD: 'leaderboard:',
    CHAT_ROOM: 'chat:room:',
    ACTIVE_USERS: 'users:active'
  }
}

// Pagination settings
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  CHAT_MESSAGE_LIMIT: 50,
  NOTES_PAGE_SIZE: 10
}

// Timer settings
export const TIMER_SETTINGS = {
  DEFAULT_POMODORO: 25 * 60, // 25 minutes in seconds
  SHORT_BREAK: 5 * 60, // 5 minutes
  LONG_BREAK: 15 * 60, // 15 minutes
  AUTO_START_BREAK: false
}

// Notification settings
export const NOTIFICATIONS = {
  TYPES: {
    TIMER_COMPLETE: 'timer_complete',
    BREAK_COMPLETE: 'break_complete',
    DAILY_GOAL: 'daily_goal',
    STREAK_MILESTONE: 'streak_milestone'
  },
  PERMISSIONS: {
    GRANTED: 'granted',
    DENIED: 'denied',
    DEFAULT: 'default'
  }
}

// PWA settings
export const PWA_SETTINGS = {
  THEME_COLOR: '#3B82F6',
  BACKGROUND_COLOR: '#FFFFFF',
  DISPLAY: 'standalone',
  ORIENTATION: 'portrait'
}