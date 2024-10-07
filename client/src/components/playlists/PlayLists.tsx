import { usePlayListsQuery } from "../../shared/data/playlists/usePlayListsQuery";
import { useCreatePlayListMutation } from "../../shared/data/playlists/useCreatePlayListMutation";
import { Button } from "../../shared/ui/button/Button";
import { useEffect } from "react";

export function PlayLists() {
  const { playLists } = usePlayListsQuery();
  const { mutate: createPlayList } = useCreatePlayListMutation();

  useEffect(() => {
    console.log("playlists: ", playLists);
  }, [playLists]);

  const handleCreatePlayList = () => {
    createPlayList({ name: "My second play" });
  };

  return (
    <>
      <Button onClick={handleCreatePlayList}>Create</Button>
      <ul>
        {playLists?.map((playList) => (
          <li key={playList.id}>{playList.name}</li>
        ))}
      </ul>
    </>
  );
}
