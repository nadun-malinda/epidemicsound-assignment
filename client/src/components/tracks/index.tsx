import { useState } from "react";
import { IconButton } from "../../shared/ui";
import { type Track } from "../../shared/data/tracks/schema";
import { TrackAddToPlayListDialog } from "./TrackAddToPlayListDialog";
import { TrackListContainer } from "./TrackListContainer";

export function TracksPage() {
  const [selectedTrack, setSelectedTrack] = useState<Track>();
  const [isOpenAddToPlayListDialog, setIsOpenAddToPlayListDialog] =
    useState(false);

  const handleAddToPlayList = (track: Track) => {
    setSelectedTrack(track);
    setIsOpenAddToPlayListDialog(true);
  };

  return (
    <>
      <TrackListContainer>
        {(track) => (
          <IconButton
            size="large"
            icon="playListAdd"
            onClick={() => handleAddToPlayList(track)}
          />
        )}
      </TrackListContainer>

      {selectedTrack && (
        <TrackAddToPlayListDialog
          trackId={selectedTrack.id}
          open={isOpenAddToPlayListDialog}
          onClose={() => setIsOpenAddToPlayListDialog(false)}
        />
      )}
    </>
  );
}
