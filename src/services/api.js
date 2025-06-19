import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants'
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/helpers'

// Base API configuration
const API_BASE_URL = API_ENDPOINTS.BASE_URL

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
    this.token = getStorageItem(STORAGE_KEYS.AUTH_TOKEN)
  }

  // Set authentication token
  setToken(token) {
    this.token = token
    setStorageItem(STORAGE_KEYS.AUTH_TOKEN, token)
  }

  // Remove authentication token
  removeToken() {
    this.token = null
    removeStorageItem(STORAGE_KEYS.AUTH_TOKEN)
  }

  // Get default headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    return headers
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.getHeaders(),
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' })
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }

  // Authentication methods
  async login(email, password) {
    const response = await this.post(API_ENDPOINTS.AUTH.LOGIN, { email, password })
    if (response.token) {
      this.setToken(response.token)
    }
    return response
  }

  async register(email, password, name) {
    const response = await this.post(API_ENDPOINTS.AUTH.REGISTER, { email, password, name })
    if (response.token) {
      this.setToken(response.token)
    }
    return response
  }

  async logout() {
    try {
      await this.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      this.removeToken()
    }
  }

  async refreshToken() {
    const refreshToken = getStorageItem(STORAGE_KEYS.REFRESH_TOKEN)
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await this.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken })
    if (response.token) {
      this.setToken(response.token)
    }
    return response
  }

  // User methods
  async getUserProfile() {
    return this.get(API_ENDPOINTS.USER.PROFILE)
  }

  async updateUserProfile(data) {
    return this.put(API_ENDPOINTS.USER.UPDATE, data)
  }

  async getUserStats() {
    return this.get(API_ENDPOINTS.USER.STATS)
  }

  // Study methods
  async getStudyPlans() {
    return this.get(API_ENDPOINTS.STUDY.PLANS)
  }

  async createStudySession(data) {
    return this.post(API_ENDPOINTS.STUDY.SESSIONS, data)
  }

  async getStudyProgress() {
    return this.get(API_ENDPOINTS.STUDY.PROGRESS)
  }

  // Todo methods
  async getTodos() {
    return this.get(API_ENDPOINTS.TODOS.LIST)
  }

  async createTodo(data) {
    return this.post(API_ENDPOINTS.TODOS.CREATE, data)
  }

  async updateTodo(id, data) {
    return this.put(API_ENDPOINTS.TODOS.UPDATE.replace(':id', id), data)
  }

  async deleteTodo(id) {
    return this.delete(API_ENDPOINTS.TODOS.DELETE.replace(':id', id))
  }

  // Calendar methods
  async getCalendarEvents() {
    return this.get(API_ENDPOINTS.CALENDAR.EVENTS)
  }

  async createCalendarEvent(data) {
    return this.post(API_ENDPOINTS.CALENDAR.CREATE, data)
  }

  async updateCalendarEvent(id, data) {
    return this.put(API_ENDPOINTS.CALENDAR.UPDATE.replace(':id', id), data)
  }

  async deleteCalendarEvent(id) {
    return this.delete(API_ENDPOINTS.CALENDAR.DELETE.replace(':id', id))
  }

  // Notes methods
  async getNotes() {
    return this.get(API_ENDPOINTS.NOTES.LIST)
  }

  async createNote(data) {
    return this.post(API_ENDPOINTS.NOTES.CREATE, data)
  }

  async updateNote(id, data) {
    return this.put(API_ENDPOINTS.NOTES.UPDATE.replace(':id', id), data)
  }

  async deleteNote(id) {
    return this.delete(API_ENDPOINTS.NOTES.DELETE.replace(':id', id))
  }

  // Chat methods
  async getChatMessages(roomId) {
    return this.get(`${API_ENDPOINTS.CHAT.MESSAGES}?roomId=${roomId}`)
  }

  async sendChatMessage(data) {
    return this.post(API_ENDPOINTS.CHAT.SEND, data)
  }

  async getChatRooms() {
    return this.get(API_ENDPOINTS.CHAT.ROOMS)
  }
}

// Create and export a singleton instance
const apiService = new ApiService()
export default apiService

// Export individual methods for convenience
export const {
  login,
  register,
  logout,
  refreshToken,
  getUserProfile,
  updateUserProfile,
  getUserStats,
  getStudyPlans,
  createStudySession,
  getStudyProgress,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getChatMessages,
  sendChatMessage,
  getChatRooms
} = apiService