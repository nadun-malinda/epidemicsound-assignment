export interface Track {
  id: string;
  audio: string;
  bpm: number;
  cover_art: string;
  featured_artists: any[];
  genres: string[];
  length: number;
  main_artists: string[];
  moods: string[];
  spotify: string;
  title: string;
  waveform: string;
}

export type TracksResponse = Track[];
