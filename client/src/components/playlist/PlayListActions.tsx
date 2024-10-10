import { useState } from "react";
import { Button } from "../../shared/ui";
import { PlayListDeleteDialog } from "./PlayListDeleteDialog";
import { type PlayList } from "../../shared/data/playlists/schema";
import { useNavigate } from "react-router-dom";
import styles from "./PlayListActions.module.css";

interface PlayListActionsProps {
  playList: PlayList;
}

export function PlayListActions({ playList }: PlayListActionsProps) {
  const navigate = useNavigate();
  const [openPlayListDeleteDialog, setOpenPlayListDeleteDialog] =
    useState(false);

  const handleDelete = () => {
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
      <div className={styles.action}>
        <Button size="small" variant="outlined" onClick={handleDelete}>
          Delete
        </Button>
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
