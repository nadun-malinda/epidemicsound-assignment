import { Button, Grid } from "../../shared/ui";
import { useNavigate, useParams } from "react-router-dom";
import { PlayListTrackSuggestions } from "./PlayListTrackSuggestions";
import { PlayListTracks } from "./PlayListTracks";
import { PlayListInfo } from "./PlayListInfo";
import styles from "./PlayList.module.css";
import { usePlayListByIdQuery } from "../../shared/data/playlists";
import { PlayListActions } from "./PlayListActions";

/**
 * A component that represents a single playlist.
 *
 * This component retrieves the playlist details by its ID, displays
 * the playlist information, the tracks within it, and suggestions
 * for additional tracks. It also provides a button to navigate back
 * to the playlists overview.
 *
 * @returns {JSX.Element} The playlist component.
 */
export function PlayList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { playList } = usePlayListByIdQuery(id!);

  // Display a message if the playlist is not found
  if (!playList) {
    return <>Playlist not found</>;
  }

  return (
    <div>
      {/* Button to navigate back to the playlists overview */}
      <Button startIcon="back" onClick={() => navigate("/playlists")}>
        Back to playlists
      </Button>

      <div className={styles.playList}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 4 }}>
            <div className={styles.playListSticky}>
              <PlayListInfo playList={playList} />
              <PlayListActions playList={playList} />
            </div>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <div className={styles.trackContainer}>
              <PlayListTracks playList={playList} />
              <PlayListTrackSuggestions playList={playList} />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
