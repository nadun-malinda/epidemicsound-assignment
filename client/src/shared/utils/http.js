/**
 * A function to make HTTP requests and handle responses.
 *
 * @param {RequestInfo | URL} input - The resource to fetch (URL or Request object).
 * @param {RequestInit} [init] - Optional init object containing custom settings for the request.
 * @returns {Promise<Object | Error>} A promise that resolves to the parsed JSON response or an error.
 */
export async function fetchHttp(input, init) {
  try {
    const baseUrl = "http://0.0.0.0:8000";
    const url = `${baseUrl}${input}`;
    const response = await fetch(url, { mode: "cors", ...init });

    if (response.status === 404) {
      return new Error("Not found!");
    }

    if (!response.ok) {
      return new Error("Error while fetching data");
    }

    // If successful, parse and return the JSON
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }

    return new Error("Error while fetching data");
  }
}
