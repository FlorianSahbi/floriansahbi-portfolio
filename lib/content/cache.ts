/**
 * Simple in-memory cache for storing arrays of every type.
 *
 * Keyed by a string (e.g., "en:projects"), values are stored as unknown[].
 */
const cache = new Map<string, unknown[]>()

/**
 * Retrieves cached data for the given key.
 *
 * @param key - The cache key.
 * @typeParam T - The expected element type of the returned array.
 * @returns The cached array cast to T[], or undefined if not found.
 */
export function getFromCache<T>(key: string): T[] | undefined {
  return cache.get(key) as T[] | undefined
}

/**
 * Stores data in the cache under the given key.
 *
 * @param key - The cache key.
 * @param data - The array of data to cache.
 * @typeParam T - The element type of the data array.
 */
export function setToCache<T>(key: string, data: T[]): void {
  cache.set(key, data)
}
