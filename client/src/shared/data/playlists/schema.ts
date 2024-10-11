import { Track } from "../tracks/schema";

/**
 * Represents a playlist entity with its associated properties.
 */
export interface PlayList {
  /** Unique identifier for the playlist */
  id: number;

  /** Name of the playlist */
  name: string;

  /** Optional description of the playlist */
  description?: string;

  /** List of tracks in the playlist */
  tracks: Track[];

  /** The date when the playlist was created */
  created_at: Date;

  /** The date when the playlist was last updated (optional) */
  updated_at?: Date;
}

/**
 * Input type for creating or updating a playlist.
 */
export type PlayListInput = Pick<PlayList, "name" | "description" | "tracks">;

/**
 * Represents the response format for fetching multiple playlists.
 */
export type PlayListResponse = PlayList[];
