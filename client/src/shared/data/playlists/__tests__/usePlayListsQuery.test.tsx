import { renderHook, waitFor } from "@testing-library/react";
import { usePlayListsQuery } from "../usePlayListsQuery";
import { QueryClient, QueryClientProvider } from "react-query";
import { fetchHttp } from "../../../utils/http";
import { mockConsoleError } from "../../../../../tests/utils";

const playLists = [
  {
    id: 1,
    name: "Test PlayList",
    description: "",
    tracks: [
      {
        id: "mX542l3F2Q",
        title: "Peacoat",
        length: 139,
        bpm: 142,
        genres: ["Alternative Hip Hop"],
        moods: ["Funny", "Laid Back"],
        main_artists: ["Timothy Infinite"],
        featured_artists: [],
        audio:
          "https://storage.googleapis.com/tech-coding-interview-assets/mX542l3F2Q.mp3",
        cover_art:
          "https://storage.googleapis.com/tech-coding-interview-assets/mX542l3F2Q.jpg",
        waveform:
          "https://storage.googleapis.com/tech-coding-interview-assets/mX542l3F2Q.json",
        spotify: "http://link.epidemicsound.com/mX542l3F2Q/spotify",
      },
    ],
    created_at: "2024-10-10T12:32:54.144478Z",
    updated_at: "2024-10-10T12:57:07.807611Z",
  },
];

jest.mock("../../../utils/http", () => ({
  fetchHttp: jest.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("usePlayListsQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  test("Should return playLists data when fetch is successful", async () => {
    const mockData = { playLists };
    (fetchHttp as jest.Mock).mockResolvedValueOnce(mockData);

    // Render the hook
    const { result } = renderHook(() => usePlayListsQuery(), { wrapper });

    // Wait for loading state to finish
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assertions
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.playLists).toEqual(mockData);
  });

  test("Should return isError to true when fetch fails", async () => {
    const consoleMock = mockConsoleError();

    (fetchHttp as jest.Mock).mockRejectedValueOnce(
      () => new Error("Expected mock error. All is well!")
    );

    // Render the hook within act
    const { result } = renderHook(() => usePlayListsQuery(), { wrapper });

    // Wait for loading state to finish
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assertions
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.playLists).toBeUndefined();

    consoleMock.mockRestore();
  });
});
