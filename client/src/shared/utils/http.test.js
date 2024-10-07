import { fetchHttp } from "./http";

describe("fetchHttp", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch data successfully", async () => {
    const mockData = { message: "success" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const result = await fetchHttp("/tracks/");
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith("http://0.0.0.0:8000/tracks/", {
      mode: "cors",
    });
  });

  test("Should return an error if the response status is 404", async () => {
    fetch.mockResolvedValueOnce({
      status: 404,
      ok: false,
    });

    const result = await fetchHttp("/tracks/");
    expect(result).toEqual(new Error("Not found!"));
  });

  test("Should return an error for other response errors", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const result = await fetchHttp("/tracks/");
    expect(result).toEqual(new Error("Error while fetching data"));
  });

  test("Should catch network errors and return a generic error", async () => {
    fetch.mockImplementationOnce(() => Promise.reject());

    const result = await fetchHttp("/tracks/");
    expect(result).toEqual(new Error("Error while fetching data"));
  });
});
