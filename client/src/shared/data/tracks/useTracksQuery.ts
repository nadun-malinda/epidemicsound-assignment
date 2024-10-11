import { useQuery } from "react-query";
import { fetchHttp } from "../../utils/http";
import { type TracksResponse } from "./schema";
import { trackKeys } from "../../../shared/utils/query";

/**
 * Custom hook to fetch all tracks.
 *
 * This hook uses the `useQuery` from react-query to manage the fetching state.
 * It automatically handles loading and error states and caches the results.
 *
 * @returns {object} - An object containing the following properties:
 * @returns {TracksResponse | undefined} tracks - The fetched tracks data, or undefined if not yet loaded.
 * @returns {boolean} isLoading - A boolean indicating whether the data is currently being loaded.
 * @returns {boolean} isError - A boolean indicating whether there was an error during the fetch.
 */
export function useTracksQuery() {
  const {
    data: tracks,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<TracksResponse>({
    queryKey: trackKeys.lists(),
    queryFn: () => fetchHttp<TracksResponse>("/tracks/"),
  });

  return { tracks, isLoading, isError, isSuccess };
}
