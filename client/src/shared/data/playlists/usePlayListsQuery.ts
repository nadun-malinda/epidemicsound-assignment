import { useQuery } from "react-query";
import { fetchHttp } from "@/shared/utils/http";
import type { PlayListResponse } from "./schema";
import { playListKeys } from "@/shared/utils/query";

/**
 * Custom hook to fetch a list of playlists.
 *
 * @returns {object} - An object containing the list of playlists, loading, and error states.
 */
export function usePlayListsQuery() {
  const {
    data: playLists,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: playListKeys.list(),
    queryFn: () =>
      fetchHttp<PlayListResponse>("/playlists/", { method: "GET" }),
  });

  return { playLists, isLoading, isError, isSuccess };
}
