type FetchOptions = {
  params?: Record<string, string | number>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
};

type FetchResponse<T> = {
  data: T;
  status: number;
  statusText: string;
};

/**
 * Fetches data from TMDB API
 * @param endpoint - API endpoint (e.g., "/movie/popular" or "movie/popular")
 * @param options - Optional fetch options (params, method, body)
 * @returns Promise with the response data
 * @throws Error if the request fails
 */
export async function fetchTMDB<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<FetchResponse<T>> {
  const { params = {}, method = "GET", body } = options;

  // Get configuration from environment variables
  const baseUrl =
    process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3";
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const apiToken = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

  if (!apiKey && !apiToken) {
    throw new Error("TMDB API key or token is required");
  }

  // Normalize endpoint (remove leading slash if present)
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint.slice(1)
    : endpoint;

  // Build URL with query parameters
  const url = new URL(`${baseUrl}/${normalizedEndpoint}`);

  // Add API key to query params if using API key (not token)
  if (apiKey && !apiToken) {
    url.searchParams.set("api_key", apiKey);
  }

  // Add additional query parameters
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  // Build headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add Authorization header if using token
  if (apiToken) {
    headers["Authorization"] = `Bearer ${apiToken}`;
  }

  // Build fetch options
  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  // Add body if provided
  if (body && method !== "GET") {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url.toString(), fetchOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `TMDB API Error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data = (await response.json()) as T;

    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to fetch from TMDB API: ${String(error)}`);
  }
}

/**
 * Convenience function to fetch TMDB data and return only the data
 * @param endpoint - API endpoint
 * @param options - Optional fetch options
 * @returns Promise with the response data directly
 */
export async function fetchTMDBData<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const response = await fetchTMDB<T>(endpoint, options);
  return response.data;
}