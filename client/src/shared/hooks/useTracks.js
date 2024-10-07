import { useState, useEffect } from "react";
import { fetchHttp } from "../utils/http";

/**
 * Custom hook for fetching track-related data.
 *
 * @returns {Object} An object containing:
 * @returns {Array} tracks - The array of fetched track data.
 * @returns {boolean} loading - A boolean indicating if the data is currently being loaded.
 */
export function useTracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchHttp("/tracks/")
      .then((data) => setTracks(data))
      .finally(() => setLoading(false));
  }, []);

  return { tracks, loading };
}
