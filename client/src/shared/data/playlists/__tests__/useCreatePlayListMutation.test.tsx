import { act, renderHook, waitFor } from "@testing-library/react";
import { useCreatePlayListMutation } from "../useCreatePlayListMutation";
import { QueryClient, QueryClientProvider } from "react-query";
import { fetchHttp } from "@/shared/utils/http";
import { mockConsoleError } from "../../../../../tests/utils";

// Mock the fetchHttp function
jest.mock("@/shared/utils/http", () => ({
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

describe("useCreatePlayListMutation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  test("should create a new playlist and update the cache on success", async () => {
    const newPlayList = {
      id: 1,
      name: "My New Playlist",
      description: "A brand new playlist",
      tracks: [],
      created_at: "2024-10-10T12:32:54.144478Z",
      updated_at: "2024-10-10T12:57:07.807611Z",
    };

    (fetchHttp as jest.Mock).mockResolvedValueOnce(newPlayList);

    const { result } = renderHook(() => useCreatePlayListMutation(), {
      wrapper,
    });

    // Start the mutation
    result.current.mutate({
      name: "My New Playlist",
      description: "A brand new playlist",
    });

    // Wait for loading state to finish
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Assertion
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual(newPlayList);
  });

  test("should handle error during playlist creation", async () => {
    const consoleMock = mockConsoleError();

    (fetchHttp as jest.Mock).mockRejectedValueOnce(
      () => new Error("Expected mock error. All is well!")
    );

    const { result } = renderHook(() => useCreatePlayListMutation(), {
      wrapper,
    });

    // Start the mutation
    await act(async () => {
      await result.current.mutate({
        name: "My New Playlist",
        description: "A brand new playlist",
      });
    });

    // Wait for mutation to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assertion
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);

    consoleMock.mockRestore();
  });
});
