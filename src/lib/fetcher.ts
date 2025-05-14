// Simple in-memory cache
const cache: Record<string, { data: unknown; timestamp: number }> = {};
const CACHE_TTL = 300000; // 5 minutes in milliseconds

export async function fetcher<T = unknown>(input: RequestInfo, init?: RequestInit): Promise<T> {
  try {
    const url = typeof input === 'string' ? input : input.url;
    
    // Check cache first
    const now = Date.now();
    if (cache[url] && now - cache[url].timestamp < CACHE_TTL) {
      return cache[url].data as T;
    }
    
    const res = await fetch(input, {
      ...init,
      // Include credentials to ensure cookies are sent with the request
      credentials: 'same-origin',
      headers: {
        ...init?.headers,
        'Cache-Control': 'max-age=3600', // Tell the browser to cache for an hour
      }
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${res.status}`);
    }
    
    const data = await res.json();
    
    // Update cache
    cache[url] = { data, timestamp: now };
    
    return data;
  } catch (error) {
    console.error(`Fetch error for ${input}:`, error);
    throw error;
  }
}
