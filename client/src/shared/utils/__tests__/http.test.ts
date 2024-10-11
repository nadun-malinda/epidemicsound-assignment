import { fetchHttp } from "../http";

// Mock the global fetch function
global.fetch = jest.fn() as jest.Mock;

describe("fetchHttp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch data successfully", async () => {
    const mockData = { message: "success" };

    // Mock a successful fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const result = await fetchHttp("/tracks/");
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      "http://0.0.0.0:8000/tracks/",
      undefined
    );
  });

  test("should throw an error if the response status is 404", async () => {
    const errorMessage = "Not Found";

    // Mock a failed 404 fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: jest.fn().mockResolvedValueOnce(errorMessage),
    });

    // Expect fetchHttp to throw the specific error message
    await expect(fetchHttp("/tracks/")).rejects.toThrow(errorMessage);
  });

  test("should throw an error for other response errors", async () => {
    // Mock a failed 500 fetch response with no error message
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: jest.fn().mockResolvedValueOnce(""),
    });

    // Expect fetchHttp to throw the generic error message
    await expect(fetchHttp("/tracks/")).rejects.toThrow(
      "Error while fetching data"
    );
  });

  test("should catch network errors and throw a generic error", async () => {
    // Mock a network error
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Network Error"))
    );

    // Expect fetchHttp to throw the network error
    await expect(fetchHttp("/tracks/")).rejects.toThrow("Network Error");
  });
});
