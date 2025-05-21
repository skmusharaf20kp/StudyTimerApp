import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const ReadingModeScreen = ({ navigation }) => {
  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [hours, setHours] = useState(0);
  const [isActive, setIsActive] = useState(true);
  
  // Subject information
  const [currentSubject, setCurrentSubject] = useState('Biology');
  const [nextSubject, setNextSubject] = useState('Math');
  
  // Progress data
  const [targetTime, setTargetTime] = useState('2h 0m');
  const [todayTime, setTodayTime] = useState('1h 30m');
  const [progressPercentage, setProgressPercentage] = useState(75); // 1h30m out of 2h = 75%

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            if (hours > 0) {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            } else {
              // Timer finished
              setIsActive(false);
            }
          }
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, hours]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(25);
    setSeconds(0);
  };

  const formatNumber = (number) => {
    return number.toString().padStart(2, '0');
  };

  const handleSubjectChange = () => {
    // In a real app, you might want to save the current session data
    // before changing subjects
    setCurrentSubject(nextSubject);
    setNextSubject('Chemistry'); // This would come from your subjects list
    resetTimer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <Text style={styles.headerTitle}>Reading</Text>
      
      {/* Current Subject Card */}
      <View style={styles.subjectCard}>
        <Text style={styles.subjectLabel}>Current Subject</Text>
        <Text style={styles.subjectName}>{currentSubject}</Text>
      </View>
      
      {/* Timer Circle */}
      <View style={styles.timerContainer}>
        <View style={styles.timerCircle}>
          <Text style={styles.timerText}>
            {`${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`}
          </Text>
          <TouchableOpacity 
            style={styles.stopButton}
            onPress={toggleTimer}
          >
            <Text style={styles.stopButtonText}>
              {isActive ? 'Stop' : 'Start'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Next Subject Card */}
      <TouchableOpacity 
        style={styles.subjectCard}
        onPress={handleSubjectChange}
      >
        <Text style={styles.subjectLabel}>Next Subject</Text>
        <Text style={styles.subjectName}>{nextSubject}</Text>
      </TouchableOpacity>
      
      {/* Today's Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Today</Text>
          <Text style={styles.progressTarget}>Target {targetTime}</Text>
        </View>
        
        <View style={styles.progressCard}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressDay}>Today</Text>
            <Text style={styles.progressTime}>{todayTime}</Text>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${progressPercentage}%` }
              ]} 
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  subjectCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  subjectLabel: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 5,
  },
  subjectName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  timerCircle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 15,
    borderColor: 'rgba(124, 124, 255, 0.3)',
    borderTopColor: '#7C7CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  stopButton: {
    backgroundColor: '#7C7CFF',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  stopButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  progressTarget: {
    fontSize: 18,
    color: '#6B7280',
  },
  progressCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    padding: 20,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  progressDay: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  progressTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#7C7CFF',
    borderRadius: 6,
  },
});

export default ReadingModeScreen;