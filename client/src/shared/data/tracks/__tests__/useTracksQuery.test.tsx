import { renderHook, waitFor } from "@testing-library/react";
import { useTracksQuery } from "../useTracksQuery";
import { QueryClient, QueryClientProvider } from "react-query";
import { fetchHttp } from "@/shared/utils/http";

const tracks = [
  {
    id: "FKYVlOXV8Q",
    title: "Slum Village",
    length: 166,
    bpm: 148,
    genres: ["Mainstream Hip Hop"],
    moods: ["Dark", "Restless"],
    main_artists: ["Tilden Parc"],
    featured_artists: [],
    audio:
      "https://storage.googleapis.com/tech-coding-interview-assets/FKYVlOXV8Q.mp3",
    cover_art:
      "https://storage.googleapis.com/tech-coding-interview-assets/FKYVlOXV8Q.jpg",
    waveform:
      "https://storage.googleapis.com/tech-coding-interview-assets/FKYVlOXV8Q.json",
    spotify: "http://link.epidemicsound.com/FKYVlOXV8Q/spotify",
  },
  {
    id: "ZkuGOyOiiE",
    title: "Se Acabó",
    length: 168,
    bpm: 98,
    genres: ["Modern Latin"],
    moods: ["Happy", "Restless"],
    main_artists: ["Lawd Ito"],
    featured_artists: [],
    audio:
      "https://storage.googleapis.com/tech-coding-interview-assets/ZkuGOyOiiE.mp3",
    cover_art:
      "https://storage.googleapis.com/tech-coding-interview-assets/ZkuGOyOiiE.jpg",
    waveform:
      "https://storage.googleapis.com/tech-coding-interview-assets/ZkuGOyOiiE.json",
    spotify: "http://link.epidemicsound.com/ZkuGOyOiiE/spotify",
  },
];

jest.mock("@/shared/utils/http", () => ({
  fetchHttp: jest.fn(),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useTracksQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  test("Should return tracks data when fetch is successful", async () => {
    const mockData = { tracks };
    (fetchHttp as jest.Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useTracksQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.isError).toBe(false);
    expect(result.current.tracks).toEqual(mockData);
  });
});
