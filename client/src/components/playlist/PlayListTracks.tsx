import { IconButton } from "../../shared/ui";
import { TrackList } from "../tracks/TrackList";
import { type Track } from "../../shared/data/tracks/schema";
import { useUpdatePlayListMutation } from "../../shared/data/playlists/useUpdatePlayListMutation";
import styles from "./PlayList.module.css";
import { type PlayList } from "../../shared/data/playlists/schema";

interface PlayListTracksProps {
  playList: PlayList;
}

export function PlayListTracks({ playList }: PlayListTracksProps) {
  const { mutate: updatePlayList } = useUpdatePlayListMutation();

  const handleRemoveFromPlayList = (track: Track) => {
    updatePlayList({ id: playList.id, remove_tracks: [track.id] });
  };

  return (
    <div>
      <p className={styles.title}>Your tracks</p>
      {playList?.tracks.length === 0 ? (
        <p className={styles.playListMeta}>No tracks yet</p>
      ) : (
        <TrackList tracks={playList?.tracks}>
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
