import { PlayListsContainer } from "../playlists/PlayListsContainer";
import { IconButton, Dialog, Snackbar } from "../../shared/ui";
import { type Track } from "../../shared/data/tracks/schema";
import { type PlayList } from "../../shared/data/playlists/schema";
import { useUpdatePlayListMutation } from "../../shared/data/playlists/useUpdatePlayListMutation";

interface TrackAddToPlayListDialogProps {
  open: boolean;
  onClose: () => void;
  trackId: Track["id"];
}

export function TrackAddToPlayListDialog({
  open,
  onClose,
  trackId,
}: TrackAddToPlayListDialogProps) {
  const {
    mutate: updatePlayList,
    isSuccess,
    isError,
  } = useUpdatePlayListMutation();

  const handleOnTrackAddToPlayList = (playList: PlayList) => {
    updatePlayList({
      id: playList.id,
      tracks: [trackId],
    });
    onClose();
  };

  return (
    <>
      <Dialog
        title="Add to playlists"
        content={
          <PlayListsContainer>
            {(playList) => (
              <IconButton
                icon={"playListAdd"}
                onClick={() => handleOnTrackAddToPlayList(playList)}
              />
            )}
          </PlayListsContainer>
        }
        open={open}
        onClose={onClose}
      />
      <Snackbar open={isSuccess} message="Added to playlist successfully!" />
      <Snackbar open={isError} message="Failed to add to playlist!" />
    </>
  );
}
