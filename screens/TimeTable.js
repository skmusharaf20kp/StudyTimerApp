
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// Days of the week
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Mock class schedules
const CLASS_SCHEDULES = {
  Mon: [
    { id: 1, time: '9:00', subject: 'Biology', color: '#E9F7EF' },
    { id: 2, time: '11:00', subject: 'Chemistry', color: '#EBF5FB' },
    { id: 3, time: '13:00', subject: 'Physics', color: '#FEF9E7' },
    { id: 4, time: '15:00', subject: 'Computer Science', color: '#F4ECF7' },
  ],
  Tue: [
    { id: 1, time: '10:00', subject: 'Literature', color: '#F4ECF7' },
    { id: 2, time: '12:00', subject: 'Art', color: '#FADBD8' },
    { id: 3, time: '14:00', subject: 'Music', color: '#D6EAF8' },
  ],
  Wed: [
    { id: 1, time: '9:00', subject: 'Algebra', color: '#EBF5FB' },
    { id: 2, time: '11:00', subject: 'Geometry', color: '#EBF5FB' },
    { id: 3, time: '14:00', subject: 'Statistics', color: '#EBF5FB' },
  ],
  Thu: [
    { id: 1, time: '9:00', subject: 'World History', color: '#E9F7EF' },
    { id: 2, time: '12:00', subject: 'Geography', color: '#D1F2EB' },
    { id: 3, time: '15:00', subject: 'Civics', color: '#FADBD8' },
  ],
  Fri: [
    { id: 1, time: '9:00', subject: 'History', color: '#E8F8F5' },
    { id: 2, time: '11:00', subject: 'Math', color: '#F0E7F5' },
    { id: 3, time: '13:00', subject: 'Economics', color: '#FEF9E7' },
    { id: 4, time: '15:00', subject: 'English', color: '#F0E7F5' },
    { id: 5, time: '17:00', subject: 'Geography', color: '#D1F2EB' },
  ],
  Sat: [
    { id: 1, time: '10:00', subject: 'Study Group', color: '#FADBD8' },
    { id: 2, time: '13:00', subject: 'Lab Work', color: '#D6EAF8' },
  ],
  Sun: [],
};

// Streak badges data
const BADGES = [
  {
    id: 'streak',
    name: '7 DAY STREAK',
    icon: 'fire',
    color: '#FFAC33',
    background: '#FEF5E7',
    progress: 100,
    iconFamily: 'FontAwesome5',
  },
  {
    id: 'early',
    name: 'EARLY BIRD',
    icon: 'twitter',
    color: '#74B9FF',
    background: '#E6F3FF',
    progress: 80,
    iconFamily: 'FontAwesome5',
  },
  {
    id: 'night',
    name: 'NIGHT OWL',
    icon: 'moon',
    color: '#7F8CF7',
    background: '#ECEEFF',
    progress: 65,
    iconFamily: 'FontAwesome5',
  },
  {
    id: 'reader',
    name: 'CONSISTENT READER',
    icon: 'book-open',
    color: '#4ECDC4',
    background: '#E0F7F5',
    progress: 90,
    iconFamily: 'FontAwesome5',
  },
];

const TimeTable = () => {
  const [selectedDay, setSelectedDay] = useState('Fri');
  const [animatedValue] = useState(new Animated.Value(0));
  const [currentTab, setCurrentTab] = useState('timetable');
  const [headerHeight, setHeaderHeight] = useState(0);

  // Animation for tab switching
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: currentTab === 'timetable' ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentTab]);

  // Function to toggle between tabs
  const toggleTab = (tab) => {
    if (tab !== currentTab) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCurrentTab(tab);
    }
  };

  // Render day selector for the timetable
  const renderDaySelector = () => {
    return (
      <View style={styles.daySelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayScrollContent}>
          {DAYS.map((day) => {
            const isSelected = day === selectedDay;
            return (
              <TouchableOpacity
                key={day}
                style={[styles.dayItem, isSelected && styles.selectedDayItem]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setSelectedDay(day);
                }}
              >
                <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{day}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  // Render class schedule for the selected day
  const renderSchedule = () => {
    const classes = CLASS_SCHEDULES[selectedDay] || [];

    if (classes.length === 0) {
      return (
        <View style={styles.emptySchedule}>
          <MaterialCommunityIcons name="calendar-blank-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No classes scheduled</Text>
          <Text style={styles.emptySubText}>Enjoy your free day!</Text>
        </View>
      );
    }

    return (
      <View style={styles.scheduleContainer}>
        {classes.map((classItem) => (
          <TouchableOpacity
            key={classItem.id}
            style={[styles.classItem, { backgroundColor: classItem.color }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
          >
            <View style={styles.classTimeContainer}>
              <Text style={styles.classTime}>{classItem.time}</Text>
            </View>
            <View style={styles.classDetails}>
              <Text style={styles.classSubject}>{classItem.subject}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Render streak badges section
  const renderBadges = () => {
    return (
      <View style={styles.badgesContainer}>
        <View style={styles.badgeRow}>
          {BADGES.map((badge, index) => (
            <View key={badge.id} style={styles.badgeItem}>
              <View style={[styles.badgeIconContainer, { backgroundColor: badge.background }]}>
                {badge.iconFamily === 'FontAwesome5' ? (
                  <FontAwesome5 name={badge.icon} size={30} color={badge.color} />
                ) : (
                  <Ionicons name={badge.icon} size={30} color={badge.color} />
                )}
              </View>
              <View style={styles.badgeProgressContainer}>
                <View style={[styles.badgeProgress, { width: `${badge.progress}%`, backgroundColor: badge.color }]} />
              </View>
              <Text style={styles.badgeName}>{badge.name}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Render tab content based on current tab
  const renderTabContent = () => {
    if (currentTab === 'timetable') {
      return (
        <>
          {renderDaySelector()}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {renderSchedule()}
          </ScrollView>
        </>
      );
    } else {
      return (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderBadges()}
        </ScrollView>
      );
    }
  };

  // Animation values for tab indicator
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Dimensions.get('window').width / 2],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* App Header */}
      <View style={styles.header} onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}>
        <View style={styles.tabContainer}>
          <Animated.View style={[styles.tabIndicator, { transform: [{ translateX }] }]} />
          <TouchableOpacity 
            style={styles.tab} 
            onPress={() => toggleTab('timetable')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, currentTab === 'timetable' && styles.activeTabText]}>Timetable</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.tab} 
            onPress={() => toggleTab('streaks')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, currentTab === 'streaks' && styles.activeTabText]}>Streak Badges</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      {renderTabContent()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#2D3748" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="document" size={24} color="#7F8FA6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar" size={24} color="#7F8FA6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#7F8FA6" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabContainer: {
    flexDirection: 'row',
    position: 'relative',
    height: 44,
    marginHorizontal: 20,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#A0AEC0',
  },
  activeTabText: {
    color: '#2D3748',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -10,
    width: Dimensions.get('window').width / 2 - 40,
    height: 3,
    backgroundColor: '#6366F1',
    borderRadius: 3,
    marginHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  daySelector: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dayScrollContent: {
    paddingHorizontal: 15,
  },
  dayItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#F1F1F1',
  },
  selectedDayItem: {
    backgroundColor: '#6366F1',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3748',
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  scheduleContainer: {
    padding: 15,
  },
  classItem: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  classTimeContainer: {
    width: 80,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  classTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  classDetails: {
    flex: 1,
    padding: 20,
  },
  classSubject: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  emptySchedule: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginTop: 20,
  },
  emptySubText: {
    fontSize: 14,
    color: '#A0AEC0',
    marginTop: 10,
  },
  badgesContainer: {
    padding: 15,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  badgeIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeProgressContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#F1F1F1',
    borderRadius: 3,
    marginVertical: 10,
  },
  badgeProgress: {
    height: '100%',
    borderRadius: 3,
  },
  badgeName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D3748',
    textAlign: 'center',
    marginTop: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TimeTable;