import { type PlayList } from "../../shared/data/playlists/schema";

export const mockPlayList: PlayList = {
  id: 1,
  name: "My Playlist",
  description: "A playlist for testing",
  tracks: [
    {
      id: "track1",
      title: "Track 1",
      length: 180,
      bpm: 120,
      genres: ["Pop"],
      moods: ["Happy"],
      main_artists: ["Artist 1"],
      featured_artists: [],
      audio: "https://example.com/track1.mp3",
      cover_art: "https://example.com/track1.jpg",
      waveform: "https://example.com/track1.json",
      spotify: "https://example.com/track1/spotify",
    },
  ],
  created_at: new Date("2024-10-10T12:32:54.144478Z"),
  updated_at: new Date("2024-10-10T12:57:07.807611Z"),
};
