import { PlayListsContainer } from "../playlists/PlayListsContainer";
import { IconButton, Dialog, Snackbar } from "@/shared/ui";
import { type Track } from "@/shared/data/tracks/schema";
import { type PlayList } from "@/shared/data/playlists/schema";
import { useUpdatePlayListMutation } from "@/shared/data/playlists";

interface TrackAddToPlayListDialogProps {
  /**
   * Indicates if the dialog is open
   */
  open: boolean;

  /**
   * Function to close the dialog
   */
  onClose: () => void;

  /**
   * ID of the track to be added
   */
  trackId: Track["id"];
}

/**
 * A dialog component for adding a track to a selected playlist.
 *
 * This component allows users to select a playlist and add a specified track to it.
 *
 * @param {TrackAddToPlayListDialogProps} props - The properties for the component.
 * @returns {JSX.Element} The TrackAddToPlayListDialog component.
 */
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

  /**
   * Handles the addition of a track to a specified playlist.
   *
   * @param {PlayList} playList - The playlist to which the track will be added.
   */
  const handleOnTrackAddToPlayList = (playList: PlayList) => {
    updatePlayList({
      id: playList.id,
      tracks: [trackId],
    });
    onClose();
  };

  return (
    <div data-testid="add-to-playlist-dialog">
      <Dialog
        title="Add to playlists"
        content={
          <PlayListsContainer>
            {(playList) => (
              <IconButton
                data-testid="add-to-playlist-button"
                icon="playListAdd"
                onClick={() => handleOnTrackAddToPlayList(playList)}
              />
            )}
          </PlayListsContainer>
        }
        open={open}
        onClose={onClose}
      />
      <Snackbar
        data-tetid="snackbar-playlist-added-success"
        open={isSuccess}
        message="Added to playlist successfully!"
      />
      <Snackbar
        data-tetid="snackbar-playlist-addess-failed"
        open={isError}
        message="Failed to add to playlist!"
      />
    </div>
  );
}
