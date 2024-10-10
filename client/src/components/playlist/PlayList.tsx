import { Button, Grid } from "../../shared/ui";
import { useNavigate, useParams } from "react-router-dom";
import { PlayListTrackSuggestions } from "./PlayListTrackSuggestions";
import { PlayListTracks } from "./PlayListTracks";
import { PlayListInfo } from "./PlayListInfo";
import styles from "./PlayList.module.css";
import { usePlayListByIdQuery } from "../../shared/data/playlists/usePlayListByIdQuery";

export function PlayList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { playList } = usePlayListByIdQuery(id!);

  if (!playList) {
    return <>Playlist not found</>;
  }

  return (
    <div>
      <Button startIcon="back" onClick={() => navigate("/playlists")}>
        Back to playlists
      </Button>

      <div className={styles.playList}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 4 }}>
            <PlayListInfo playList={playList} />
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
