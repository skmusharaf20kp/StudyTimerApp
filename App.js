import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  FlatList
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  Home,
  Calendar,
  Clock,
  CheckCircle,
  User,
  ArrowLeft,
  Book,
  MessageCircle
} from 'react-native-feather';
import ReadingModeScreen from './screens/ReadingScreen';
import TimeTable from './screens/TimeTable';

// Colors
const colors = {
  primary: '#3B82F6',
  background: '#FFFFFF',
  text: '#111827',
  lightText: '#6B7280',
  border: '#E5E7EB',
  lightBg: '#F3F4F6',
};

// Login Screen
const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.loginContainer}>
        <Text style={styles.logo}>Study App</Text>
        
        <TouchableOpacity 
          style={[styles.socialButton, { marginTop: 80 }]}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }} 
            style={styles.socialIcon} 
          />
          <Text style={styles.socialButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1782/1782765.png' }} 
            style={styles.socialIcon} 
          />
          <Text style={styles.socialButtonText}>Sign in with Email</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/0/191.png' }} 
            style={styles.socialIcon} 
          />
          <Text style={styles.socialButtonText}>Sign in with Mobile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Dashboard Screen
const DashboardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft stroke={colors.text} width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.dashboardContent}>
        <Text style={styles.sectionTitle}>Active Study Plan</Text>
        <Text style={styles.planName}>Intermediate</Text>
        
        <Text style={styles.sectionSubtitle}>Hours Studied</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '45%' }]} />
        </View>
        
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressNumber}>45</Text>
          <Text style={styles.progressPercent}>%</Text>
        </View>
        <Text style={styles.progressLabel}>Study Progress</Text>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('StudyRoom')}
        >
          <Text style={styles.primaryButtonText}>Continue Studying</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Study Plans Screen
const StudyPlansScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState('intermediate');
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.screenTitle}>Study Plans</Text>
      
      <View style={styles.plansList}>
        <TouchableOpacity 
          style={[
            styles.planItem, 
            selectedPlan === 'basic' && styles.selectedPlanItem
          ]}
          onPress={() => setSelectedPlan('basic')}
        >
          <View style={styles.planRadio}>
            {selectedPlan === 'basic' && <View style={styles.planRadioSelected} />}
          </View>
          <View style={styles.planDetails}>
            <Text style={styles.planTitle}>Basic</Text>
            <Text style={styles.planTime}>00:00 - 10:00</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.planItem, 
            selectedPlan === 'intermediate' && styles.selectedPlanItem
          ]}
          onPress={() => setSelectedPlan('intermediate')}
        >
          <View style={[styles.planRadio, selectedPlan === 'intermediate' && styles.planRadioActive]}>
            {selectedPlan === 'intermediate' && (
              <CheckCircle stroke={colors.primary} fill={colors.primary} width={20} height={20} />
            )}
          </View>
          <View style={styles.planDetails}>
            <Text style={styles.planTitle}>Intermediate</Text>
            <Text style={styles.planTime}>10:00 - 11:00</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.planItem, 
            selectedPlan === 'advanced' && styles.selectedPlanItem
          ]}
          onPress={() => setSelectedPlan('advanced')}
        >
          <View style={styles.planRadio}>
            {selectedPlan === 'advanced' && <View style={styles.planRadioSelected} />}
          </View>
          <View style={styles.planDetails}>
            <Text style={styles.planTitle}>Advanced</Text>
            <Text style={styles.planTime}>11:00 - 11:00</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Todo List Screen
const TodoListScreen = () => {
  const todos = [
    { id: '1', subject: 'Math', timeStart: '00:00', timeEnd: '10:00', today: 'Today, 20:00' },
    { id: '2', subject: 'Physics', timeStart: '10:00', timeEnd: '11:00', today: 'Today, 20:00' },
    { id: '3', subject: 'Chemistry', timeStart: '11:00', timeEnd: '10:00', today: 'Today, 19:00' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.screenTitle}>Todo List</Text>
      
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <View style={styles.todoSubjectContainer}>
              <Text style={styles.todoSubjectLetter}>M</Text>
            </View>
            <View style={styles.todoDetails}>
              <Text style={styles.todoSubject}>{item.subject}</Text>
              <Text style={styles.todoTime}>{item.timeStart} - {item.timeEnd}</Text>
            </View>
            <View style={styles.todoTimeContainer}>
              <Text style={styles.todoToday}>{item.today}</Text>
            </View>
          </View>
        )}
        style={styles.todoList}
      />
    </SafeAreaView>
  );
};

// Calendar Screen
const CalendarScreen = ({ navigation }) => {
  const [selectedMonth, setSelectedMonth] = useState('Apr');
  
  const events = [
    { id: '1', date: 'Apr 28', event: 'Event', group: 'Cyan' },
    { id: '2', date: 'Apr 28', event: 'Strey Group Event' },
    { id: '3', date: 'Apr 20', timeStart: '10:00', timeEnd: '10:00', hours: '23 h' },
    { id: '4', date: 'Apr 18', timeStart: '10:00', timeEnd: '10:00', hours: '24 h' },
    { id: '5', date: 'Apr 26', event: 'Exam', details: 'Study Event' },
    { id: '6', date: 'Apr 28', time: '30:00', event: 'Study Group', details: 'Hierchy Event' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.screenTitle}>Calendar</Text>
      
      <Text style={styles.calendarHeading}>Upcoming events</Text>
      
      <ScrollView style={styles.eventsList}>
        {events.map((event) => (
          <View key={event.id} style={styles.eventItem}>
            <View style={styles.eventDateContainer}>
              <Text style={styles.eventDate}>{event.date}</Text>
              {event.timeStart && (
                <Text style={styles.eventTime}>{event.timeStart} - {event.timeEnd}</Text>
              )}
              {event.time && (
                <Text style={styles.eventTime}>{event.time}</Text>
              )}
            </View>
            <View style={styles.eventDetailsContainer}>
              <Text style={styles.eventName}>{event.event}</Text>
              {event.group && <Text style={styles.eventGroup}>{event.group}</Text>}
              {event.details && <Text style={styles.eventDetails}>{event.details}</Text>}
              {event.hours && <Text style={styles.eventHours}>{event.hours}</Text>}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Study Room Screen
const StudyRoomScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { 
      id: '1',
      sender: 'Michaels',
      message: 'iOji: i cry on a log pain propfied!',
      avatar: 'https://i.pravatar.cc/100?img=12',
      isMe: false 
    },
    {
      id: '2',
      sender: 'Yoane',
      message: 'Awaifthe) have are skronge plare heur?',
      avatar: 'https://i.pravatar.cc/100?img=32',
      isMe: false
    },
    {
      id: '3',
      sender: 'Me',
      message: 'What you need is not mean.',
      avatar: 'https://i.pravatar.cc/100?img=5',
      isMe: true
    }
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.roomHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft stroke={colors.text} width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.roomTitle}>Study Room</Text>
        <TouchableOpacity>
          <Text style={styles.leaveButton}>Leave</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.roomInfo}>
        <Text style={styles.roomId}>01S1sa2</Text>
        <Text style={styles.roomTime}>01:26</Text>
      </View>
      
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            style={[
              styles.messageContainer,
              msg.isMe ? styles.myMessageContainer : styles.otherMessageContainer
            ]}
          >
            {!msg.isMe && (
              <Text style={styles.messageSender}>{msg.sender}</Text>
            )}
            <View 
              style={[
                styles.messageBubble,
                msg.isMe ? styles.myMessageBubble : styles.otherMessageBubble
              ]}
            >
              <Text 
                style={[
                  styles.messageText,
                  msg.isMe ? styles.myMessageText : styles.otherMessageText
                ]}
              >
                {msg.message}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Message/roposage"
          placeholderTextColor={colors.lightText}
        />
        <TouchableOpacity style={styles.sendButton}>
          <MessageCircle stroke={colors.primary} width={24} height={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Profile Screen
const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.profileHeader}>
        <TouchableOpacity>
          <ArrowLeft stroke={colors.text} width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.profileContent}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>
        
        <Text style={styles.profileName}>Anna Smith</Text>
        <Text style={styles.profileAge}>21</Text>
        
        <View style={styles.profileInfoContainer}>
          <Text style={styles.profileInfoLabel}>Age</Text>
          <Text style={styles.profileInfoValue}>3rd Year</Text>
        </View>
        
        <View style={styles.profileCareerContainer}>
          <Text style={styles.profileCareerLabel}>Preparing for</Text>
          <Text style={styles.profileCareerValue}>UI Designer</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Tab Navigator Setup
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Main Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.lightText,
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color }) => <Home stroke={color} width={24} height={24} />
        }}
      />
      <Tab.Screen 
        name="Plans" 
        component={StudyPlansScreen}
        options={{
          tabBarIcon: ({ color }) => <Book stroke={color} width={24} height={24} />
        }}
      />
      <Tab.Screen 
        name="Todo" 
        component={TodoListScreen}
        options={{
          tabBarIcon: ({ color }) => <CheckCircle stroke={color} width={24} height={24} />
        }}
      />
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color }) => <Calendar stroke={color} width={24} height={24} />
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={TimeTable}
        options={{
          tabBarIcon: ({ color }) => <User stroke={color} width={24} height={24} />
        }}
      />
    </Tab.Navigator>
  );
};

// Main Navigation Container
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        {/* <Stack.Screen name="StudyRoom" component={StudyRoomScreen} /> */}
        <Stack.Screen name="StudyRoom" component={ReadingModeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Login Screen Styles
  loginContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 40,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  socialButtonText: {
    color: colors.text,
    fontSize: 16,
  },
  signUpButton: {
    marginTop: 20,
  },
  signUpButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    padding: 20,
  },
  
  // Dashboard Styles
  dashboardContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.lightText,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: colors.lightText,
    marginTop: 24,
    marginBottom: 8,
  },
  planName: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.lightBg,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  progressNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
  },
  progressPercent: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 6,
    marginLeft: 2,
  },
  progressLabel: {
    fontSize: 16,
    color: colors.lightText,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Study Plans Styles
  plansList: {
    padding: 20,
  },
  planItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 16,
  },
  selectedPlanItem: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
  },
  planRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lightText,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  planRadioActive: {
    borderColor: colors.primary,
  },
  planRadioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  planDetails: {
    flex: 1,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  planTime: {
    fontSize: 14,
    color: colors.lightText,
  },
  
  // Todo List Styles
  todoList: {
    padding: 20,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 16,
  },
  todoSubjectContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  todoSubjectLetter: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  todoDetails: {
    flex: 1,
  },
  todoSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  todoTime: {
    fontSize: 14,
    color: colors.lightText,
  },
  todoTimeContainer: {
    alignItems: 'flex-end',
  },
  todoToday: {
    fontSize: 12,
    color: colors.lightText,
  },
  
  // Calendar Styles
  calendarHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  eventsList: {
    paddingHorizontal: 20,
  },
  eventItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 16,
  },
  eventDateContainer: {
    width: 100,
  },
  eventDate: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: colors.lightText,
  },
  eventDetailsContainer: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  eventGroup: {
    fontSize: 14,
    color: colors.lightText,
  },
  eventDetails: {
    fontSize: 14,
    color: colors.lightText,
  },
  eventHours: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
  },
  
  // Study Room Styles
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  leaveButton: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },
  roomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  roomId: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  roomTime: {
    fontSize: 16,
    color: colors.text,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageSender: {
    fontSize: 12,
    color: colors.lightText,
    marginBottom: 4,
    marginLeft: 8,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
  },
  myMessageBubble: {
    backgroundColor: colors.primary,
    borderTopRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: colors.lightBg,
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
  },
  myMessageText: {
    color: 'white',
  },
  otherMessageText: {
    color: colors.text,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  messageInput: {
    flex: 1,
    height: 40,
    backgroundColor: colors.lightBg,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 12,
    color: colors.text,
  },
  sendButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Profile Styles
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  profileContent: {
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.lightBg,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  profileAge: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  profileInfoLabel: {
    fontSize: 16,
    color: colors.text,
  },
  profileInfoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  profileCareerContainer: {
    width: '100%',
    marginTop: 20,
  },
  profileCareerLabel: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  profileCareerValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  
  // Tab Bar Styles
  tabBar: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: 60,
  },
});

export default App;