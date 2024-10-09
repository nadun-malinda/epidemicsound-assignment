import { Button, Grid } from "../../shared/ui";
import { useNavigate } from "react-router-dom";
import { PlayListTrackSuggestions } from "./PlayListTrackSuggestions";
import { PlayListTracks } from "./PlayListTracks";
import { PlayListInfo } from "./PlayListInfo";
import styles from "./PlayList.module.css";

export function PlayList() {
  const navigate = useNavigate();

  return (
    <div>
      <Button startIcon="back" onClick={() => navigate("/playlists")}>
        Back to playlists
      </Button>

      <div className={styles.playList}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 4 }}>
            <PlayListInfo />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <div className={styles.trackContainer}>
              <PlayListTracks />
              <PlayListTrackSuggestions />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
