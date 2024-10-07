/**
 * Generic type representing a successful HTTP fetch response.
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
 * @returns {Promise<FetchHttpSuccess<T> | Error>} A promise that resolves to the parsed JSON response or an error.
 */
export async function fetchHttp<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<FetchHttpSuccess<T> | Error> {
  try {
    const baseUrl = "http://0.0.0.0:8000";
    const url = `${baseUrl}/${input}`;
    const response = await fetch(url, init);

    if (response.status === 404) {
      return new Error("Not found!");
    }

    if (!response.ok) {
      return new Error("Error while fetching data");
    }

    // If successful, parse and return the JSON
    return (await response.json()) as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error;
    }

    return new Error("Error while fetching data");
  }
}
