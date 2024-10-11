import { PlayList } from "../../shared/data/playlists/schema";
import { Button, Dialog, Snackbar } from "../../shared/ui";
import { useDeletePlayListMutation } from "../../shared/data/playlists";
import styles from "./PlayListDeleteDialog.module.css";
import { useEffect, useState } from "react";

/**
 * Props for PlayListDeleteDialog component.
 * @property {boolean} open - Controls the visibility of the dialog.
 * @property {Function} [onClose] - Callback to handle closing the dialog.
 * @property {Function} onSuccess - Callback triggered after successful deletion.
 * @property {PlayList} playList - The playlist object to be deleted.
 */
interface PlayListDeleteDialogProps {
  open: boolean;
  onClose?: () => void;
  onSuccess: () => void;
  playList: PlayList;
}

/**
 * Dialog component to confirm the deletion of a playlist.
 * It displays a confirmation message and handles the delete operation.
 *
 * @param {PlayListDeleteDialogProps} props - The props for the component.
 * @returns {JSX.Element} The PlayListDeleteDialog component.
 */
export function PlayListDeleteDialog({
  open,
  onClose,
  onSuccess,
  playList,
}: PlayListDeleteDialogProps) {
  const [isError, setIsError] = useState(false);

  /**
   * Handles error state on playlist deletion failure.
   *
   * @param {boolean} error - Indicates if there was an error during deletion.
   */
  const handleOnError = (error: boolean) => {
    setIsError(error);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        title="Delete playlist"
        content={
          <DialogContent
            playList={playList}
            onClose={onClose}
            onSuccess={onSuccess}
            onError={handleOnError}
          />
        }
      />
      <Snackbar open={isError} message="Failed to delete playlist!" />
    </>
  );
}

/**
 * Props for DialogContent component.
 * @property {PlayList} playList - The playlist object to be deleted.
 * @property {Function} [onClose] - Callback to handle closing the dialog.
 * @property {Function} onSuccess - Callback triggered after successful deletion.
 * @property {Function} onError - Callback triggered on delete error.
 */
interface DialogContentProps {
  playList: PlayList;
  onClose?: () => void;
  onSuccess: () => void;
  onError: (isError: boolean) => void;
}

/**
 * Content component for the delete playlist dialog.
 * Handles the deletion logic, confirmation message, and user interaction.
 *
 * @param {DialogContentProps} props - The props for the component.
 * @returns {JSX.Element} The DialogContent component.
 */
function DialogContent({
  playList,
  onClose,
  onSuccess,
  onError,
}: DialogContentProps) {
  const {
    mutate: deletePlayList,
    isLoading,
    isSuccess,
    isError,
  } = useDeletePlayListMutation();

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  useEffect(() => {
    if (isError) {
      onError(true);
    }
  }, [isError, onError]);

  /**
   * Triggers the deletion of the playlist and closes the dialog.
   */
  const handleDeletePlayList = () => {
    deletePlayList(playList.id);
    onClose && onClose();
  };

  return (
    <div>
      <p>{`Are you sure you want to delete the playlist "${
        playList.name
      }" with ${playList.tracks?.length || 0} Tracks?`}</p>
      <div className={styles.buttonGroup}>
        <Button variant="text" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="text"
          onClick={handleDeletePlayList}
          loading={isLoading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
