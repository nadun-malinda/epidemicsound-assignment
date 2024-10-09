import { useParams } from "react-router-dom";
import { IconButton } from "../../shared/ui";
import { TrackList } from "../tracks/TrackList";
import { type Track } from "../../shared/data/tracks/schema";
import { useUpdatePlayListMutation } from "../../shared/data/playlists/useUpdatePlayListMutation";
import { usePlayListTrackSuggestionsQuery } from "../../shared/data/playlists/usePlayListTrackSuggestionsQuery";
import styles from "./PlayList.module.css";

export function PlayListTrackSuggestions() {
  const { id } = useParams();
  const { suggestedTracks } = usePlayListTrackSuggestionsQuery(id);
  const { mutate: updatePlayList } = useUpdatePlayListMutation();

  const handleAddToPlayList = (track: Track) => {
    if (id) {
      updatePlayList({ id: +id, tracks: [track.id] });
    }
  };

  return (
    <div>
      <p className={styles.title}>Suggestions</p>
      {suggestedTracks?.length === 0 ? (
        <p>No suggested tracks</p>
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
    </div>
  );
}
