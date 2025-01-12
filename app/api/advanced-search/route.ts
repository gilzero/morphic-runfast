import { NextResponse } from 'next/server'
import http from 'http'
import https from 'https'
import { JSDOM, VirtualConsole } from 'jsdom'
import { Agent } from 'http'
import { Redis } from '@upstash/redis'
import { createClient } from 'redis'

const CACHE_TTL = 3600 // Cache time-to-live in seconds (1 hour)
const CACHE_EXPIRATION_CHECK_INTERVAL = 3600000 // 1 hour in milliseconds

let redisClient: Redis | ReturnType<typeof createClient> | null = null

// Initialize Redis client based on environment variables
async function initializeRedisClient() {
  if (redisClient) return redisClient

  const useLocalRedis = process.env.USE_LOCAL_REDIS === 'true'

  if (useLocalRedis) {
    const localRedisUrl =
      process.env.LOCAL_REDIS_URL || 'redis://localhost:6379'
    redisClient = createClient({ url: localRedisUrl })
    await redisClient.connect()
  } else {
    const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL
    const upstashRedisRestToken = process.env.UPSTASH_REDIS_REST_TOKEN

    if (upstashRedisRestUrl && upstashRedisRestToken) {
      redisClient = new Redis({
        url: upstashRedisRestUrl,
        token: upstashRedisRestToken
      })
    }
  }

  return redisClient
}

// Function to get cached results
async function getCachedResults(
  cacheKey: string
): Promise<any | null> {
  try {
    const client = await initializeRedisClient()
    if (!client) return null

    let cachedData: string | null
    if (client instanceof Redis) {
      cachedData = await client.get(cacheKey)
    } else {
      cachedData = await client.get(cacheKey)
    }

    if (cachedData) {
      console.log(`Cache hit for key: ${cacheKey}`)
      return JSON.parse(cachedData)
    } else {
      console.log(`Cache miss for key: ${cacheKey}`)
      return null
    }
  } catch (error) {
    console.error('Redis cache error:', error)
    return null
  }
}

// Function to set cached results with error handling and logging
async function setCachedResults(
  cacheKey: string,
  results: any
): Promise<void> {
  try {
    const client = await initializeRedisClient()
    if (!client) return

    const serializedResults = JSON.stringify(results)
    if (client instanceof Redis) {
      await client.set(cacheKey, serializedResults, { ex: CACHE_TTL })
    } else {
      await client.set(cacheKey, serializedResults, { EX: CACHE_TTL })
    }
    console.log(`Cached results for key: ${cacheKey}`)
  } catch (error) {
    console.error('Redis cache error:', error)
  }
}

// Function to periodically clean up expired cache entries
async function cleanupExpiredCache() {
  try {
    const client = await initializeRedisClient()
    if (!client) return

    const keys = await client.keys('search:*')
    for (const key of keys) {
      const ttl = await client.ttl(key)
      if (ttl <= 0) {
        await client.del(key)
        console.log(`Removed expired cache entry: ${key}`)
      }
    }
  } catch (error) {
    console.error('Cache cleanup error:', error)
  }
}

// Set up periodic cache cleanup
setInterval(cleanupExpiredCache, CACHE_EXPIRATION_CHECK_INTERVAL)

// Define a type for search results
interface SearchResult {
  url: string;
  content: string;
  title: string;
  score?: number;
  publishedDate?: string;
}

export async function POST(request: Request) {
  const { query, maxResults, searchDepth, includeDomains, excludeDomains } =
    await request.json()

  try {
    const cacheKey = `search:${query}:${maxResults}:${searchDepth}:${
      Array.isArray(includeDomains) ? includeDomains.join(',') : ''
    }:${Array.isArray(excludeDomains) ? excludeDomains.join(',') : ''}`

    // Try to get cached results
    const cachedResults = await getCachedResults(cacheKey)
    if (cachedResults) {
      return NextResponse.json(cachedResults)
    }

    // Cache the results
    await setCachedResults(cacheKey, [])

    return NextResponse.json([])
  } catch (error) {
    console.error('Advanced search error:', error)
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : String(error),
        query: query,
        results: [],
        images: [],
        number_of_results: 0
      },
      { status: 500 }
    )
  }
}
