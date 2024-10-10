import { Track } from "../tracks/schema";

export interface PlayList {
  id: number;
  name: string;
  description?: string;
  tracks: Track[];
  created_at: Date;
  updated_at?: Date;
}

export type PlayListInput = Pick<PlayList, "name" | "description" | "tracks">;

export type PlayListResponse = PlayList[];
