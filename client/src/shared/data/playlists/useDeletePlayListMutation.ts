import { useMutation, useQueryClient } from "react-query";
import { type PlayList } from "./schema";
import { fetchHttp } from "../../../shared/utils/http";
import { playListKeys } from "../../../shared/utils/query";

/**
 * Custom hook to delete a playlist by its ID.
 * It handles the deletion of the playlist and updates the cache accordingly.
 *
 * @returns {object} - Contains mutate function to trigger the deletion, loading, error, and success states.
 */
export function useDeletePlayListMutation() {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: (id: PlayList["id"]) =>
      fetchHttp(`/playlists/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: (_, id) => {
      // Remove the deleted playlist from the cache.
      queryClient.setQueriesData<PlayList[]>(playListKeys.list(), (prev = []) =>
        prev.filter((playList) => playList.id !== id)
      );
    },
  });

  return {
    mutate,
    isLoading,
    isError,
    isSuccess,
  };
}
