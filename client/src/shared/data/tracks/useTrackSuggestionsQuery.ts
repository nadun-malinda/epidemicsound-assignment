import { useQuery } from "react-query";
import { fetchHttp } from "../../utils/http";
import { type TracksResponse } from "./schema";
import { trackKeys } from "../../utils/query";

/**
 * Custom hook to fetch track suggestions excluding those from a specified playlist.
 *
 * This hook utilizes the `useQuery` from react-query to fetch suggested tracks.
 * It automatically manages loading and error states and caches the results.
 *
 * @param {string} id - The ID of the playlist to exclude tracks from.
 * @returns {object} - An object containing the following properties:
 * @returns {TracksResponse | undefined} suggestedTracks - The fetched suggested tracks data, or undefined if not yet loaded.
 * @returns {boolean} isLoading - A boolean indicating whether the data is currently being loaded.
 * @returns {boolean} isError - A boolean indicating whether there was an error during the fetch.
 */
export function useTrackSuggestionsQuery(id: string) {
  const {
    data: suggestedTracks,
    isLoading,
    isError,
  } = useQuery<TracksResponse>({
    queryKey: trackKeys.list(id),
    queryFn: () => fetchHttp<TracksResponse>(`/tracks/?exclude_playlist=${id}`),
    refetchOnMount: true, // Refetch when the component mounts
  });

  return { suggestedTracks, isLoading, isError };
}
