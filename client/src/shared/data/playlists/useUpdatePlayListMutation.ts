import { useMutation, useQueryClient } from "react-query";
import { fetchHttp } from "../../utils/http";
import type { PlayList } from "./schema";
import { playListKeys } from "../../../shared/utils/query";

type Mutate = Partial<Omit<PlayList, "tracks">> & {
  id: PlayList["id"];
  tracks?: string[];
  remove_tracks?: string[];
};

/**
 * Custom hook to update a playlist.
 * It handles adding/removing tracks as well as updating the playlist's name or description.
 * Automatically updates the playlist cache upon success.
 *
 * @returns {object} - Contains mutate function to trigger the mutation, loading, error, and success states.
 */
export function useUpdatePlayListMutation() {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: async ({
      id,
      name,
      description,
      tracks,
      remove_tracks,
    }: Mutate) =>
      await fetchHttp<PlayList>(`/playlists/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(name && { name }),
          ...(description && { description }),
          ...(tracks && { tracks }),
          ...(remove_tracks && { remove_tracks }),
        }),
      }),
    onSuccess: (updatedPlayList) => {
      // Update the cache with the updated playlist
      queryClient.setQueryData(
        playListKeys.detail(updatedPlayList.id.toString()),
        updatedPlayList
      );

      // Update the playlist in the list cache
      queryClient.setQueriesData<PlayList[]>(playListKeys.list(), (prev = []) =>
        prev.map((playList) =>
          playList.id === updatedPlayList.id ? updatedPlayList : playList
        )
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
