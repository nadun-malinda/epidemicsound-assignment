/**
 * A generic type representing a successful HTTP fetch response.
 *
 * @template T
 */
type FetchHttpSuccess<T = unknown> = T;

/**
 * A generic function to make HTTP requests and handle responses.
 *
 * @template T - The expected type of the response data.
 * @param {RequestInfo | URL} input - The resource to fetch (URL or Request object).
 * @param {RequestInit} [init] - Optional init object containing custom settings for the request.
 * @returns {Promise<FetchHttpSuccess<T>>} A promise that resolves to the parsed JSON response or throws an error.
 */
export async function fetchHttp<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<FetchHttpSuccess<T>> {
  const baseUrl = "http://0.0.0.0:8000";
  const url = `${baseUrl}${input}`;

  try {
    const response = await fetch(url, init);

    if (!response.ok) {
      // Throwing an error for non-2xx responses will help React Query handle it
      const errorMessage = await response.text(); // Get error message from response if needed
      throw new Error(errorMessage || "Error while fetching data");
    }

    if (response.status === 204) {
      return null as FetchHttpSuccess<T>; // Return null or an empty object for 204
    }

    // If successful, parse and return the JSON
    return (await response.json()) as FetchHttpSuccess<T>;
  } catch (error) {
    // Handling different error types and re-throwing for better error handling
    if (error instanceof Error) {
      throw error; // Rethrow the error for React Query to catch
    }
    throw new Error("Unknown error occurred during fetch");
  }
}
