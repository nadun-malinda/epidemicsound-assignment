import { useParams } from "react-router-dom";
import emptyPlayList from "../../assets/playlist-empty.png";
import { usePlayListByIdQuery } from "../../shared/data/playlists/usePlayListByIdQuery";
import styles from "./PlayList.module.css";

export function PlayListInfo() {
  const { id } = useParams();
  const { playList } = usePlayListByIdQuery(id);

  return (
    <div className={styles.playListInfoBox}>
      <div className={styles.playListCover}>
        <img src={emptyPlayList} alt="Empty playlist" />
      </div>
      <p className={styles.title}>{playList?.name}</p>
      <div className={styles.playListMeta}>
        <p>{playList?.tracks.length} tracks</p>
        <p>
          {playList?.created_at && new Date(playList?.created_at).getDate()}
        </p>
      </div>
    </div>
  );
}
