import { IconButton } from "../../shared/ui";
import { TrackList } from "../tracks/TrackList";
import { type Track } from "../../shared/data/tracks/schema";
import { useUpdatePlayListMutation } from "../../shared/data/playlists";
import styles from "./PlayList.module.css";
import { type PlayList } from "../../shared/data/playlists/schema";

interface PlayListTracksProps {
  playList: PlayList;
}

/**
 * A component that displays the tracks in a specific playlist.
 *
 * This component allows users to remove tracks from the playlist
 * and shows a message when there are no tracks available.
 *
 * @param {PlayListTracksProps} props - The properties for the component.
 * @returns {JSX.Element} The PlayListTracks component.
 */
export function PlayListTracks({ playList }: PlayListTracksProps) {
  const { mutate: updatePlayList } = useUpdatePlayListMutation();

  /**
   * Handles the removal of a track from the playlist.
   *
   * @param {Track} track - The track to be removed.
   */
  const handleRemoveFromPlayList = (track: Track) => {
    updatePlayList({ id: playList.id, remove_tracks: [track.id] });
  };

  return (
    <div>
      <p className={styles.title}>Your tracks</p>
      {playList.tracks.length === 0 ? (
        <p className={styles.playListMeta}>No tracks yet</p>
      ) : (
        <TrackList tracks={playList.tracks}>
          {(track) => (
            <IconButton
              size="large"
              icon="playListRemove"
              onClick={() => handleRemoveFromPlayList(track)}
            />
          )}
        </TrackList>
      )}
    </div>
  );
}
