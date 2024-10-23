import { useState, useCallback } from "react";
import { IconButton } from "@/shared/ui";
import { type Track } from "@/shared/data/tracks/schema";
import { TrackListContainer } from "./TrackListContainer";
import { TrackAddToPlayListDialog } from "./TrackAddToPlayListDialog";

/**
 * TracksPage component displays a list of tracks with options to add tracks to playlists.
 *
 * The component manages the state of the selected track and the visibility of the add to playlist dialog.
 */
export function TracksPage() {
  const [selectedTrack, setSelectedTrack] = useState<Track | undefined>(
    undefined
  );
  const [isOpenAddToPlayListDialog, setIsOpenAddToPlayListDialog] =
    useState(false);

  /**
   * Handles adding a track to a playlist by updating the selectedTrack state
   * and opening the add to playlist dialog.
   *
   * @param {Track} track - The track to add to a playlist.
   */
  const handleAddToPlayList = useCallback((track: Track) => {
    setSelectedTrack(track);
    setIsOpenAddToPlayListDialog(true);
  }, []);

  return (
    <div data-testid="tracks-page">
      <TrackListContainer>
        {(track) => (
          <IconButton
            data-testid="add-to-playlist-trigger"
            size="large"
            icon="playListAdd"
            onClick={() => handleAddToPlayList(track)} // Open dialog for adding track to playlist
          />
        )}
      </TrackListContainer>

      {selectedTrack && (
        <TrackAddToPlayListDialog
          trackId={selectedTrack.id}
          open={isOpenAddToPlayListDialog}
          onClose={() => setIsOpenAddToPlayListDialog(false)} // Close dialog
        />
      )}
    </div>
  );
}
