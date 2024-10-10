import { IconButton, Snackbar } from "../../shared/ui";
import { TrackList } from "../tracks/TrackList";
import { type Track } from "../../shared/data/tracks/schema";
import { useUpdatePlayListMutation } from "../../shared/data/playlists/useUpdatePlayListMutation";
import styles from "./PlayList.module.css";
import { type PlayList } from "../../shared/data/playlists/schema";
import { useTrackSuggestionsQuery } from "../../shared/data/tracks/useTrackSuggestionsQuery";

interface PlayListTrackSuggestionsProps {
  playList: PlayList;
}

export function PlayListTrackSuggestions({
  playList,
}: PlayListTrackSuggestionsProps) {
  const { suggestedTracks } = useTrackSuggestionsQuery(playList.id.toString());
  const { mutate: updatePlayList, isError } = useUpdatePlayListMutation();

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
