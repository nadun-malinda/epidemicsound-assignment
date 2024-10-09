import { useParams } from "react-router-dom";
import { IconButton } from "../../shared/ui";
import { TrackList } from "../tracks/TrackList";
import { type Track } from "../../shared/data/tracks/schema";
import { usePlayListByIdQuery } from "../../shared/data/playlists/usePlayListByIdQuery";
import { useUpdatePlayListMutation } from "../../shared/data/playlists/useUpdatePlayListMutation";
import styles from "./PlayList.module.css";

export function PlayListTracks() {
  const { id } = useParams();
  const { playList } = usePlayListByIdQuery(id);
  const { mutate: updatePlayList } = useUpdatePlayListMutation();

  const handleRemoveFromPlayList = (track: Track) => {
    if (id) {
      updatePlayList({ id: +id, remove_tracks: [track.id] });
    }
  };

  return (
    <div>
      <p className={styles.title}>Your tracks</p>
      {playList?.tracks.length === 0 ? (
        <p>No tracks yet</p>
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
