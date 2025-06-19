import { useState, useEffect } from 'react'
import { NOTIFICATIONS } from '../utils/constants'
import { requestNotificationPermission, showNotification } from '../utils/helpers'

export const useNotifications = () => {
  const [permission, setPermission] = useState(
    'Notification' in window ? Notification.permission : NOTIFICATIONS.PERMISSIONS.DENIED
  )

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    const granted = await requestNotificationPermission()
    setPermission(granted ? NOTIFICATIONS.PERMISSIONS.GRANTED : NOTIFICATIONS.PERMISSIONS.DENIED)
    return granted
  }

  const notify = (title, options = {}) => {
    if (permission === NOTIFICATIONS.PERMISSIONS.GRANTED) {
      return showNotification(title, options)
    } else if (permission === NOTIFICATIONS.PERMISSIONS.DEFAULT) {
      requestPermission().then(granted => {
        if (granted) {
          showNotification(title, options)
        }
      })
    }
    return null
  }

  const notifyTimerComplete = () => {
    notify('Timer Complete!', {
      body: 'Your study session has ended. Time for a break!',
      icon: '/favicon.ico',
      tag: NOTIFICATIONS.TYPES.TIMER_COMPLETE
    })
  }

  const notifyBreakComplete = () => {
    notify('Break Complete!', {
      body: 'Break time is over. Ready to continue studying?',
      icon: '/favicon.ico',
      tag: NOTIFICATIONS.TYPES.BREAK_COMPLETE
    })
  }

  const notifyDailyGoal = (progress) => {
    notify('Daily Goal Achieved!', {
      body: `Congratulations! You've completed ${progress}% of your daily study goal.`,
      icon: '/favicon.ico',
      tag: NOTIFICATIONS.TYPES.DAILY_GOAL
    })
  }

  const notifyStreakMilestone = (streak) => {
    notify('Streak Milestone!', {
      body: `Amazing! You've maintained a ${streak}-day study streak!`,
      icon: '/favicon.ico',
      tag: NOTIFICATIONS.TYPES.STREAK_MILESTONE
    })
  }

  return {
    permission,
    requestPermission,
    notify,
    notifyTimerComplete,
    notifyBreakComplete,
    notifyDailyGoal,
    notifyStreakMilestone,
    isSupported: 'Notification' in window,
    isGranted: permission === NOTIFICATIONS.PERMISSIONS.GRANTED
  }
}

export default useNotifications