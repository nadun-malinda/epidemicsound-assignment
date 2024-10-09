import { useUpdatePlayListMutation } from "../../shared/data/playlists/useUpdatePlayListMutation";
import { type PlayList } from "../../shared/data/playlists/schema";
import { Track } from "../../shared/data/tracks/schema";
import { Dialog } from "../../shared/ui/dialog/Dialog";
import { PlayLists } from "../playlists/list/PlayLists";
import { IconButton } from "../../shared/ui/button/IconButton";

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
  const { mutate: updatePlayList } = useUpdatePlayListMutation();

  const handleOnTrackAddToPlayList = (playList: PlayList) => {
    console.log(">>> addedd: ", playList);
    updatePlayList({
      id: playList.id,
      tracks: [trackId],
    });
    onClose();
  };

  return (
    <Dialog
      title="Playlists"
      content={
        <PlayLists>
          {(playList) => (
            <IconButton
              icon={"playListAdd"}
              onClick={() => handleOnTrackAddToPlayList(playList)}
            />
          )}
        </PlayLists>
      }
      open={open}
      onClose={onClose}
    />
  );
}
