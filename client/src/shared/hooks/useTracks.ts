import { useState, useEffect } from "react";
import type { Track, TracksResponse } from "./schema";
import { fetchHttp } from "../utils/http";

/**
 * Custom hook for fetching track-related data.
 *
 * @returns {Object} An object containing:
 * @returns {Array} tracks - The array of fetched track data.
 * @returns {boolean} loading - A boolean indicating if the data is currently being loaded.
 */
export function useTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchHttp<TracksResponse>("/tracks/")
      .then((data) => {
        if (data instanceof Error) {
          setTracks([]);
        } else {
          setTracks(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { tracks, loading };
}
