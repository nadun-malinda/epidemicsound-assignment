import { useState } from "react";
import { Button } from "../../shared/ui";
import { PlayListDeleteDialog } from "./PlayListDeleteDialog";
import { type PlayList } from "../../shared/data/playlists/schema";
import { useNavigate } from "react-router-dom";
import styles from "./PlayListActions.module.css";

interface PlayListActionsProps {
  playList: PlayList; // The playlist object to perform actions on
}

/**
 * A component that handles actions for a playlist, such as deleting it.
 *
 * This component renders a button for deleting the playlist and
 * manages the dialog that confirms the deletion action. Upon
 * successful deletion, it navigates back to the playlists overview.
 *
 * @param {PlayListActionsProps} props - The properties for the component.
 * @returns {JSX.Element} The PlayListActions component.
 */
export function PlayListActions({ playList }: PlayListActionsProps) {
  const navigate = useNavigate();
  const [openPlayListDeleteDialog, setOpenPlayListDeleteDialog] =
    useState(false);

  /**
   * Handles the action to delete the playlist by opening the confirmation dialog.
   */
  const handleDelete = () => {
    setOpenPlayListDeleteDialog(true);
  };

  /**
   * Callback function that is executed upon successful deletion of the playlist.
   */
  const handleOnDeleteSuccess = () => {
    setOpenPlayListDeleteDialog(false);
    navigate("/playlists");
  };

  return (
    <>
      <div className={styles.action}>
        <Button
          size="small"
          variant="outlined"
          onClick={handleDelete}
          data-testid="delete-dialog-trigger"
        >
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
