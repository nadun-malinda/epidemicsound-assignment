import { useState } from "react";
import { Button } from "../../../shared/ui";
import { useCreatePlayListMutation } from "../../../shared/data/playlists/useCreatePlayListMutation";
import { PlayListCreateDialog } from "./PlayListCreateDialog";

export function PlayListCreate() {
  const [open, setOpen] = useState(false);
  const { mutate: createPlayList } = useCreatePlayListMutation();

  const handleCreatePlayList = () => {
    createPlayList({ name: "My second play" });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} startIcon="add">
        New playlist
      </Button>
      <PlayListCreateDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}