import { PlayLists } from "../playlists/list/PlayLists";
import { IconButton, Dialog } from "../../shared/ui";
import { type Track } from "../../shared/data/tracks/schema";
import { type PlayList } from "../../shared/data/playlists/schema";
import { usePlayListsQuery } from "../../shared/data/playlists/usePlayListsQuery";
import { useUpdatePlayListMutation } from "../../shared/data/playlists/useUpdatePlayListMutation";
import { PlayListsContainer } from "../playlists/PlayListsContainer";

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
  const { playLists } = usePlayListsQuery();
  const { mutate: updatePlayList } = useUpdatePlayListMutation();

  const handleOnTrackAddToPlayList = (playList: PlayList) => {
    updatePlayList({
      id: playList.id,
      tracks: [trackId],
    });
    onClose();
  };

  return (
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
  );
}
