import { TrackList } from "../tracks/TrackList";
import { IconButton, Snackbar } from "@/shared/ui";
import { type Track } from "@/shared/data/tracks/schema";
import { type PlayList } from "@/shared/data/playlists/schema";
import { useTrackSuggestionsQuery } from "@/shared/data/tracks";
import { useUpdatePlayListMutation } from "@/shared/data/playlists";
import styles from "./PlayList.module.css";

interface PlayListTrackSuggestionsProps {
  playList: PlayList;
}

/**
 * A component that displays suggested tracks for a specific playlist.
 *
 * This component allows users to add suggested tracks to the playlist
 * and notifies them if an error occurs during the addition process.
 *
 * @param {PlayListTrackSuggestionsProps} props - The properties for the component.
 * @returns {JSX.Element} The PlayListTrackSuggestions component.
 */
export function PlayListTrackSuggestions({
  playList,
}: PlayListTrackSuggestionsProps) {
  const { suggestedTracks } = useTrackSuggestionsQuery(playList.id.toString());
  const { mutate: updatePlayList, isError } = useUpdatePlayListMutation();

  /**
   * Handles the addition of a suggested track to the playlist.
   *
   * @param {Track} track - The track to be added.
   */
  const handleAddToPlayList = (track: Track) => {
    updatePlayList({ id: playList.id, tracks: [track.id] });
  };

  return (
    <div>
      <p className={styles.title}>Suggestions</p>
      {suggestedTracks?.length === 0 ? (
        <p className={styles.playListMeta}>No suggested tracks</p>
      ) : (
        <TrackList tracks={suggestedTracks}>
          {(track) => (
            <IconButton
              size="large"
              icon="playListAdd"
              onClick={() => handleAddToPlayList(track)}
            />
          )}
        </TrackList>
      )}

      <Snackbar open={isError} message="Failed to add the track!" />
    </div>
  );
}
