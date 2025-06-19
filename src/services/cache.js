// Cache service for Redis integration and local caching
import { CACHE_SETTINGS } from '../utils/constants'

class CacheService {
  constructor() {
    this.localCache = new Map()
    this.isRedisAvailable = false
    this.redisClient = null
  }

  // Initialize Redis connection (for future backend integration)
  async initializeRedis(redisConfig) {
    try {
      // This would be implemented when backend is ready
      // const redis = require('redis')
      // this.redisClient = redis.createClient(redisConfig)
      // await this.redisClient.connect()
      // this.isRedisAvailable = true
      console.log('Redis initialization placeholder - implement when backend is ready')
    } catch (error) {
      console.error('Redis connection failed:', error)
      this.isRedisAvailable = false
    }
  }

  // Generate cache key
  generateKey(prefix, identifier) {
    return `${prefix}${identifier}`
  }

  // Set cache item
  async set(key, value, ttl = 3600) {
    try {
      const cacheItem = {
        value,
        timestamp: Date.now(),
        ttl: ttl * 1000 // Convert to milliseconds
      }

      if (this.isRedisAvailable && this.redisClient) {
        // Redis implementation
        await this.redisClient.setEx(key, ttl, JSON.stringify(value))
      } else {
        // Local cache fallback
        this.localCache.set(key, cacheItem)
      }
    } catch (error) {
      console.error('Cache set error:', error)
    }
  }

  // Get cache item
  async get(key) {
    try {
      if (this.isRedisAvailable && this.redisClient) {
        // Redis implementation
        const value = await this.redisClient.get(key)
        return value ? JSON.parse(value) : null
      } else {
        // Local cache fallback
        const cacheItem = this.localCache.get(key)
        
        if (!cacheItem) {
          return null
        }

        // Check if item has expired
        const now = Date.now()
        if (now - cacheItem.timestamp > cacheItem.ttl) {
          this.localCache.delete(key)
          return null
        }

        return cacheItem.value
      }
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  // Delete cache item
  async delete(key) {
    try {
      if (this.isRedisAvailable && this.redisClient) {
        await this.redisClient.del(key)
      } else {
        this.localCache.delete(key)
      }
    } catch (error) {
      console.error('Cache delete error:', error)
    }
  }

  // Clear all cache
  async clear() {
    try {
      if (this.isRedisAvailable && this.redisClient) {
        await this.redisClient.flushAll()
      } else {
        this.localCache.clear()
      }
    } catch (error) {
      console.error('Cache clear error:', error)
    }
  }

  // Check if key exists
  async exists(key) {
    try {
      if (this.isRedisAvailable && this.redisClient) {
        return await this.redisClient.exists(key)
      } else {
        const cacheItem = this.localCache.get(key)
        if (!cacheItem) return false

        // Check if expired
        const now = Date.now()
        if (now - cacheItem.timestamp > cacheItem.ttl) {
          this.localCache.delete(key)
          return false
        }
        return true
      }
    } catch (error) {
      console.error('Cache exists error:', error)
      return false
    }
  }

  // Get multiple keys
  async getMultiple(keys) {
    const results = {}
    for (const key of keys) {
      results[key] = await this.get(key)
    }
    return results
  }

  // Set multiple keys
  async setMultiple(items, ttl = 3600) {
    for (const [key, value] of Object.entries(items)) {
      await this.set(key, value, ttl)
    }
  }

  // User-specific cache methods
  async setUserProfile(userId, profile) {
    const key = this.generateKey(CACHE_SETTINGS.KEYS.USER_PROFILE, userId)
    await this.set(key, profile, CACHE_SETTINGS.TTL.USER_PROFILE)
  }

  async getUserProfile(userId) {
    const key = this.generateKey(CACHE_SETTINGS.KEYS.USER_PROFILE, userId)
    return await this.get(key)
  }

  async setUserStats(userId, stats) {
    const key = this.generateKey(CACHE_SETTINGS.KEYS.STUDY_STATS, userId)
    await this.set(key, stats, CACHE_SETTINGS.TTL.STUDY_STATS)
  }

  async getUserStats(userId) {
    const key = this.generateKey(CACHE_SETTINGS.KEYS.STUDY_STATS, userId)
    return await this.get(key)
  }

  // Leaderboard cache methods
  async setLeaderboard(data) {
    const key = CACHE_SETTINGS.KEYS.LEADERBOARD
    await this.set(key, data, CACHE_SETTINGS.TTL.LEADERBOARD)
  }

  async getLeaderboard() {
    const key = CACHE_SETTINGS.KEYS.LEADERBOARD
    return await this.get(key)
  }

  // Chat cache methods
  async setChatMessages(roomId, messages) {
    const key = this.generateKey(CACHE_SETTINGS.KEYS.CHAT_ROOM, roomId)
    await this.set(key, messages, CACHE_SETTINGS.TTL.CHAT_MESSAGES)
  }

  async getChatMessages(roomId) {
    const key = this.generateKey(CACHE_SETTINGS.KEYS.CHAT_ROOM, roomId)
    return await this.get(key)
  }

  // Active users cache
  async setActiveUsers(users) {
    const key = CACHE_SETTINGS.KEYS.ACTIVE_USERS
    await this.set(key, users, 300) // 5 minutes
  }

  async getActiveUsers() {
    const key = CACHE_SETTINGS.KEYS.ACTIVE_USERS
    return await this.get(key)
  }

  // Cache warming methods
  async warmUserCache(userId) {
    try {
      // Pre-load frequently accessed user data
      const userProfile = await this.getUserProfile(userId)
      const userStats = await this.getUserStats(userId)
      
      if (!userProfile || !userStats) {
        // Fetch from API if not in cache
        console.log('Cache miss - would fetch from API')
      }
    } catch (error) {
      console.error('Cache warming error:', error)
    }
  }

  // Cache invalidation methods
  async invalidateUserCache(userId) {
    const profileKey = this.generateKey(CACHE_SETTINGS.KEYS.USER_PROFILE, userId)
    const statsKey = this.generateKey(CACHE_SETTINGS.KEYS.STUDY_STATS, userId)
    
    await this.delete(profileKey)
    await this.delete(statsKey)
  }

  async invalidateLeaderboard() {
    await this.delete(CACHE_SETTINGS.KEYS.LEADERBOARD)
  }

  // Cleanup expired items (for local cache)
  cleanupExpired() {
    if (this.isRedisAvailable) return // Redis handles expiration automatically

    const now = Date.now()
    for (const [key, item] of this.localCache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.localCache.delete(key)
      }
    }
  }

  // Get cache statistics
  getStats() {
    if (this.isRedisAvailable) {
      return { type: 'redis', connected: true }
    }
    
    return {
      type: 'local',
      size: this.localCache.size,
      keys: Array.from(this.localCache.keys())
    }
  }
}

// Create and export singleton instance
const cacheService = new CacheService()

// Start cleanup interval for local cache
setInterval(() => {
  cacheService.cleanupExpired()
}, 60000) // Clean up every minute

export default cacheService