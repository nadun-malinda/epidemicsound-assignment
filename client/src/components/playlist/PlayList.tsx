import { Button, Grid, IconButton } from "../../shared/ui";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PlayList.module.css";
import emptyPlayList from "../../assets/playlist-empty.png";
import { usePlayListByIdQuery } from "../../shared/data/playlists/usePlayListByIdQuery";
import { TrackListContainer } from "../tracks/TrackListContainer";
import { type Track } from "../../shared/data/tracks/schema";

export function PlayList() {
  const { id } = useParams();
  const { playList } = usePlayListByIdQuery(id);
  const navigate = useNavigate();

  const handleAddToPlayList = (track: Track) => {
    console.log(">>> track: ", track);
  };

  return (
    <div>
      <Button startIcon="back" onClick={() => navigate("/playlists")}>
        Back to playlists
      </Button>

      <div className={styles.playList}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 4 }}>
            <div className={styles.playListInfoBox}>
              <div className={styles.playListCover}>
                <img src={emptyPlayList} alt="Empty playlist" />
              </div>
              <p className={styles.title}>{playList?.name}</p>
              <div className={styles.playListMeta}>
                <p>{playList?.tracks.length} tracks</p>
                <p>
                  {playList?.created_at &&
                    new Date(playList?.created_at).getDate()}
                </p>
              </div>
            </div>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <div>
              <p className={styles.title}>Your tracks</p>
              <p>No tracks yet</p>
            </div>
            <div>
              <p className={styles.title}>Suggestions</p>
              <TrackListContainer>
                {(track) => (
                  <IconButton
                    size="large"
                    icon="playListAdd"
                    onClick={() => handleAddToPlayList(track)}
                  />
                )}
              </TrackListContainer>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
