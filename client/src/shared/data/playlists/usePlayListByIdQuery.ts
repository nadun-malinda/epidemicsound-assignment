import { useQuery } from "react-query";
import type { PlayList } from "./schema";
import { fetchHttp } from "@/shared/utils/http";
import { playListKeys } from "@/shared/utils/query";

/**
 * Custom hook to fetch a playlist by its ID.
 *
 * @param {string} id - The ID of the playlist to fetch.
 * @returns {object} - An object containing the playlist data, loading, and error states.
 */
export function usePlayListByIdQuery(id: string) {
  const {
    data: playList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: playListKeys.detail(id),
    queryFn: () => fetchHttp<PlayList>(`/playlists/${id}/`, { method: "GET" }),
    enabled: Boolean(id), // Ensures the query only runs if an id is provided
  });

  return { playList, isLoading, isError };
}
