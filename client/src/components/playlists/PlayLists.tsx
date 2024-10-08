import { usePlayListsQuery } from "../../shared/data/playlists/usePlayListsQuery";
import { useEffect } from "react";
import { PlayListCreate } from "./PlayListCreate";
import { PlayList } from "@/shared/data/playlists/schema";
import { useDeletePlayListMutation } from "../../shared/data/playlists/useDeletePlayListMutation";

export function PlayLists() {
  const { playLists } = usePlayListsQuery();
  const { mutate: deletePlayList } = useDeletePlayListMutation();

  useEffect(() => {
    console.log("playlists: ", playLists);
  }, [playLists]);

  const handleDelete = (id: PlayList["id"]) => {
    deletePlayList({ id });
  };

  return (
    <>
      <PlayListCreate />
      <ul>
        {playLists?.map((playList) => (
          <li key={playList.id}>
            {playList.name}{" "}
            <span onClick={() => handleDelete(playList.id)}> Delete</span>
          </li>
        ))}
      </ul>
    </>
  );
}
