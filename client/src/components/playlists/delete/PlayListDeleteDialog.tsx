import { PlayList } from "../../../shared/data/playlists/schema";
import { Dialog } from "../../../shared/ui/dialog/Dialog";
import { Button } from "../../../shared/ui/button/Button";
import { useDeletePlayListMutation } from "../../../shared/data/playlists/useDeletePlayListMutation";
import styles from "./PlayListDeleteDialog.module.css";

interface PlayListDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  playList: PlayList;
}

export function PlayListDeleteDialog({
  open,
  onClose,
  playList,
}: PlayListDeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Delete playlist"
      content={<DialogContent playList={playList} onClose={onClose} />}
    />
  );
}

interface DialogContentProps {
  playList: PlayList;
  onClose: () => void;
}
function DialogContent({ playList, onClose }: DialogContentProps) {
  const {
    mutate: deletePlayList,
    isLoading,
    isSuccess,
  } = useDeletePlayListMutation();

  const handleDeletePlayList = () => {
    deletePlayList(playList.id);
    // onClose();
  };

  return (
    <div>
      <p>{`${
        isSuccess
          ? "Playlist successfully deleted!"
          : `Are you sure, you want to delete the playlist "${playList.name}"`
      }`}</p>
      <div className={styles.buttonGroup}>
        <Button variant="outlined" onClick={onClose} disabled={isLoading}>
          {isSuccess ? "Close" : "Cancel"}
        </Button>
        {!isSuccess && (
          <Button onClick={handleDeletePlayList} loading={isLoading}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
