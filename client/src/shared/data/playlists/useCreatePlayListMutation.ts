import { useMutation, useQueryClient } from "react-query";
import { fetchHttp } from "../../utils/http";
import type { PlayList } from "./schema";
import { playListKeys } from "../../../shared/utils/query";

type Mutate = Partial<PlayList> & { name: PlayList["name"] };

/**
 * Custom hook to create a new playlist.
 * It handles creating a playlist and updating the playlist list cache.
 *
 * @returns {object} - Contains mutate function to trigger the mutation, loading, error, and success states.
 */
export function useCreatePlayListMutation() {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: async ({ name, description, tracks = [] }: Mutate) =>
      await fetchHttp<PlayList>("/playlists/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          tracks,
        }),
      }),
    onSuccess: (newPlayList) => {
      queryClient.setQueriesData<PlayList[]>(playListKeys.list(), (prev = []) =>
        prev ? [newPlayList, ...prev] : [newPlayList]
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
