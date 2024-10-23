/**
 * Represents a music track with its associated metadata.
 */
export interface Track {
  /** Unique identifier for the track */
  id: string;

  /** URL or path to the audio file of the track */
  audio: string;

  /** Beats per minute (BPM) of the track */
  bpm: number;

  /** URL or path to the cover art image */
  cover_art: string;

  /** List of featured artists (Consider defining a specific type if possible) */
  featured_artists: string[];

  /** List of genre names associated with the track */
  genres: string[];

  /** Length of the track in seconds */
  length: number;

  /** List of main artist names */
  main_artists: string[];

  /** List of moods associated with the track */
  moods: string[];

  /** Spotify link for the track */
  spotify: string;

  /** Title of the track */
  title: string;

  /** URL or path to the waveform image representing the track's audio */
  waveform: string;
}

/**
 * Represents the response format for fetching multiple tracks.
 */
export type TracksResponse = Track[];
