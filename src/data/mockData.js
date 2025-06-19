// Mock data for the application
export const MOCK_USER = {
  id: '1',
  name: 'Anna Smith',
  email: 'anna@example.com',
  age: 21,
  year: '3rd Year',
  preparing_for: 'UI Designer',
  avatar: 'https://i.pravatar.cc/100?img=5',
  studyStreak: 7,
  totalHours: 45.5,
  level: 'Intermediate'
}

export const STUDY_PLANS = [
  {
    id: 'basic',
    title: 'Basic',
    timeStart: '00:00',
    timeEnd: '10:00',
    duration: '10 hours',
    subjects: ['Math', 'Physics'],
    difficulty: 'Beginner'
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    timeStart: '10:00',
    timeEnd: '11:00',
    duration: '1 hour',
    subjects: ['Math', 'Physics', 'Chemistry'],
    difficulty: 'Intermediate'
  },
  {
    id: 'advanced',
    title: 'Advanced',
    timeStart: '11:00',
    timeEnd: '11:00',
    duration: '12 hours',
    subjects: ['Math', 'Physics', 'Chemistry', 'Biology'],
    difficulty: 'Advanced'
  }
]

export const TODO_ITEMS = [
  {
    id: '1',
    subject: 'Math',
    timeStart: '00:00',
    timeEnd: '10:00',
    today: 'Today, 20:00',
    completed: false,
    priority: 'high',
    description: 'Complete algebra exercises'
  },
  {
    id: '2',
    subject: 'Physics',
    timeStart: '10:00',
    timeEnd: '11:00',
    today: 'Today, 20:00',
    completed: false,
    priority: 'medium',
    description: 'Study thermodynamics'
  },
  {
    id: '3',
    subject: 'Chemistry',
    timeStart: '11:00',
    timeEnd: '10:00',
    today: 'Today, 19:00',
    completed: true,
    priority: 'low',
    description: 'Review organic chemistry'
  }
]

export const CALENDAR_EVENTS = [
  {
    id: '1',
    date: 'Apr 28',
    event: 'Event',
    group: 'Cyan',
    type: 'event'
  },
  {
    id: '2',
    date: 'Apr 28',
    event: 'Study Group Event',
    type: 'study'
  },
  {
    id: '3',
    date: 'Apr 20',
    timeStart: '10:00',
    timeEnd: '10:00',
    hours: '23 h',
    type: 'study'
  },
  {
    id: '4',
    date: 'Apr 18',
    timeStart: '10:00',
    timeEnd: '10:00',
    hours: '24 h',
    type: 'study'
  },
  {
    id: '5',
    date: 'Apr 26',
    event: 'Exam',
    details: 'Study Event',
    type: 'exam'
  },
  {
    id: '6',
    date: 'Apr 28',
    time: '30:00',
    event: 'Study Group',
    details: 'Hierarchy Event',
    type: 'group'
  }
]

export const READING_ROOM_USERS = [
  {
    id: 1,
    name: 'Alex Johnson',
    hours: 24.5,
    rank: 1,
    status: 'online',
    avatar: 'https://i.pravatar.cc/100?img=12'
  },
  {
    id: 2,
    name: 'Sarah Kim',
    hours: 18.2,
    rank: 2,
    status: 'studying',
    avatar: 'https://i.pravatar.cc/100?img=32'
  },
  {
    id: 3,
    name: 'Mike Chen',
    hours: 15.8,
    rank: 3,
    status: 'break',
    avatar: 'https://i.pravatar.cc/100?img=45'
  },
  {
    id: 4,
    name: 'Emma Davis',
    hours: 12.3,
    rank: 4,
    status: 'offline',
    avatar: 'https://i.pravatar.cc/100?img=67'
  }
]

export const CHAT_MESSAGES = [
  {
    id: '1',
    sender: 'Michaels',
    message: 'Starting my study session now! Good luck everyone!',
    avatar: 'https://i.pravatar.cc/100?img=12',
    isMe: false,
    timestamp: '10:30'
  },
  {
    id: '2',
    sender: 'Yoane',
    message: 'Anyone studying for the physics exam tomorrow?',
    avatar: 'https://i.pravatar.cc/100?img=32',
    isMe: false,
    timestamp: '10:32'
  },
  {
    id: '3',
    sender: 'Me',
    message: 'Yes! Let\'s form a study group.',
    avatar: 'https://i.pravatar.cc/100?img=5',
    isMe: true,
    timestamp: '10:35'
  }
]

export const BADGES = [
  {
    id: 'streak',
    name: '7 DAY STREAK',
    icon: '🔥',
    color: '#FFAC33',
    background: '#FEF5E7',
    progress: 100,
    description: 'Study for 7 consecutive days'
  },
  {
    id: 'early',
    name: 'EARLY BIRD',
    icon: '🐦',
    color: '#74B9FF',
    background: '#E6F3FF',
    progress: 80,
    description: 'Start studying before 8 AM'
  },
  {
    id: 'night',
    name: 'NIGHT OWL',
    icon: '🦉',
    color: '#7F8CF7',
    background: '#ECEEFF',
    progress: 65,
    description: 'Study after 10 PM'
  },
  {
    id: 'reader',
    name: 'CONSISTENT READER',
    icon: '📚',
    color: '#4ECDC4',
    background: '#E0F7F5',
    progress: 90,
    description: 'Read for 30 days straight'
  }
]

export const MOCK_NOTES = [
  {
    id: 1,
    title: 'Biology Chapter 5',
    date: '2024-01-20',
    time: '14:30',
    description: 'Key points about cellular respiration and photosynthesis processes. Important formulas and diagrams to remember.',
    subject: 'Biology'
  },
  {
    id: 2,
    title: 'Physics Formulas',
    date: '2024-01-19',
    time: '16:45',
    description: 'Important formulas for mechanics and thermodynamics. F=ma, PV=nRT, etc.',
    subject: 'Physics'
  },
  {
    id: 3,
    title: 'Math Integration',
    date: '2024-01-18',
    time: '09:15',
    description: 'Integration by parts, substitution method, and definite integrals.',
    subject: 'Mathematics'
  }
]

export const STUDY_STATS = {
  todayHours: 3.5,
  weeklyHours: 24.5,
  monthlyHours: 98.2,
  totalHours: 456.7,
  streak: 7,
  completedSessions: 45,
  averageSessionTime: 65, // minutes
  favoriteSubject: 'Mathematics',
  studyGoal: 120, // hours per month
  achievements: 12
}

export const TIMETABLE_SCHEDULE = {
  '2024-01-20': [
    {
      id: 1,
      subject: 'Mathematics',
      startTime: '09:00',
      endTime: '10:30',
      duration: 90,
      color: '#E3F2FD',
      completed: false
    },
    {
      id: 2,
      subject: 'Physics',
      startTime: '11:00',
      endTime: '12:00',
      duration: 60,
      color: '#F3E5F5',
      completed: true
    },
    {
      id: 3,
      subject: 'Chemistry',
      startTime: '14:00',
      endTime: '15:30',
      duration: 90,
      color: '#E8F5E8',
      completed: false
    }
  ],
  '2024-01-21': [
    {
      id: 4,
      subject: 'Biology',
      startTime: '10:00',
      endTime: '11:30',
      duration: 90,
      color: '#FFF3E0',
      completed: false
    },
    {
      id: 5,
      subject: 'English',
      startTime: '15:00',
      endTime: '16:00',
      duration: 60,
      color: '#FCE4EC',
      completed: false
    }
  ]
}