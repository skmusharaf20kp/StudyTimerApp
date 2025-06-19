import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'
import LoginScreen from './screens/LoginScreen'
import DashboardScreen from './screens/DashboardScreen'
import StudyPlansScreen from './screens/StudyPlansScreen'
import TodoListScreen from './screens/TodoListScreen'
import CalendarScreen from './screens/CalendarScreen'
import StudyRoomScreen from './screens/StudyRoomScreen'
import ReadingModeScreen from './screens/ReadingModeScreen'
import TimeTableScreen from './screens/TimeTableScreen'
import ProfileScreen from './screens/ProfileScreen'
import Layout from './components/Layout'
import './App.css'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route index element={<DashboardScreen />} />
                  <Route path="plans" element={<StudyPlansScreen />} />
                  <Route path="todo" element={<TodoListScreen />} />
                  <Route path="calendar" element={<CalendarScreen />} />
                  <Route path="profile" element={<ProfileScreen />} />
                  <Route path="timetable" element={<TimeTableScreen />} />
                  <Route path="study-room" element={<StudyRoomScreen />} />
                  <Route path="reading-mode" element={<ReadingModeScreen />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App