import { useState } from "react";
import { Button } from "../../../shared/ui/button/Button";
import { useCreatePlayListMutation } from "../../../shared/data/playlists/useCreatePlayListMutation";
import { PlayListCreateDialog } from "./PlayListCreateDialog";
import addImage from "../../../assets/add.svg";

export function PlayListCreate() {
  const [open, setOpen] = useState(false);
  const { mutate: createPlayList } = useCreatePlayListMutation();

  const handleCreatePlayList = () => {
    createPlayList({ name: "My second play" });
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        startIcon={
          <img src={addImage} alt="Add to playlist" width={18} height={18} />
        }
      >
        New playlist
      </Button>
      <PlayListCreateDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
