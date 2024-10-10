import { useState } from "react";
import { IconButton } from "../../shared/ui";
import { PlayListDeleteDialog } from "./PlayListDeleteDialog";
import { type PlayList } from "../../shared/data/playlists/schema";
import { useNavigate } from "react-router-dom";

interface PlayListActionsProps {
  playList: PlayList;
}

export function PlayListActions({ playList }: PlayListActionsProps) {
  const navigate = useNavigate();
  const [openPlayListDeleteDialog, setOpenPlayListDeleteDialog] =
    useState(false);

  const handleDelete = () => {
    console.log(">> dleete");
    setOpenPlayListDeleteDialog(true);
  };

  const handleOnDeleteSuccess = () => {
    setOpenPlayListDeleteDialog(false);
    setTimeout(() => {
      navigate("/playlists");
    }, 1000);
  };

  return (
    <>
      <div>
        <IconButton icon="delete" onClick={handleDelete} />
      </div>
      <PlayListDeleteDialog
        open={openPlayListDeleteDialog}
        onClose={() => setOpenPlayListDeleteDialog(false)}
        onSuccess={handleOnDeleteSuccess}
        playList={playList}
      />
    </>
  );
}
