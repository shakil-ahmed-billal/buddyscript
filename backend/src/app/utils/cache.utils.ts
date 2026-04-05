import { redis } from "../config/redis.config.js";

/**
 * Get data from cache. Returns parsed JSON or null.
 */
export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redis.get(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch (err) {
    console.error(`❌ Redis Get Error [${key}]:`, err);
    return null;
  }
};

/**
 * Set data to cache with an optional TTL (seconds).
 */
export const setCache = async (
  key: string,
  data: any,
  ttlSeconds: number = 600 // Default 10 minutes
): Promise<void> => {
  try {
    const serialized = JSON.stringify(data);
    await redis.set(key, serialized, "EX", ttlSeconds);
  } catch (err) {
    console.error(`❌ Redis Set Error [${key}]:`, err);
  }
};

/**
 * Delete a specific key from cache.
 */
export const delCache = async (key: string): Promise<void> => {
  try {
    await redis.del(key);
  } catch (err) {
    console.error(`❌ Redis Delete Error [${key}]:`, err);
  }
};

/**
 * Delete all keys starting with a specific prefix.
 * e.g., delCacheByPrefix("posts")
 */
export const delCacheByPrefix = async (prefix: string): Promise<void> => {
  try {
    const keys = await redis.keys(`${prefix}*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (err) {
    console.error(`❌ Redis Prefix Delete Error [${prefix}]:`, err);
  }
};
