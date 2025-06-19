import { useState, useEffect, useRef, useCallback } from 'react'
import { TIMER_SETTINGS } from '../utils/constants'
import { showNotification } from '../utils/helpers'

export const useTimer = (initialTime = TIMER_SETTINGS.DEFAULT_POMODORO) => {
  const [time, setTime] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  const start = useCallback(() => {
    setIsActive(true)
    setIsPaused(false)
  }, [])

  const pause = useCallback(() => {
    setIsPaused(true)
  }, [])

  const resume = useCallback(() => {
    setIsPaused(false)
  }, [])

  const stop = useCallback(() => {
    setIsActive(false)
    setIsPaused(false)
    setTime(initialTime)
  }, [initialTime])

  const reset = useCallback(() => {
    setTime(initialTime)
    setIsActive(false)
    setIsPaused(false)
  }, [initialTime])

  const addTime = useCallback((seconds) => {
    setTime(prevTime => Math.max(0, prevTime + seconds))
  }, [])

  useEffect(() => {
    if (isActive && !isPaused && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            setIsActive(false)
            setIsPaused(false)
            
            // Show notification when timer completes
            showNotification('Timer Complete!', {
              body: 'Your study session has ended.',
              icon: '/favicon.ico'
            })
            
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, isPaused, time])

  const formatTime = useCallback((seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  const getProgress = useCallback(() => {
    return ((initialTime - time) / initialTime) * 100
  }, [time, initialTime])

  return {
    time,
    isActive,
    isPaused,
    start,
    pause,
    resume,
    stop,
    reset,
    addTime,
    formatTime: () => formatTime(time),
    progress: getProgress(),
    isCompleted: time === 0 && !isActive
  }
}

export default useTimer