import { useParams } from "react-router-dom";
import emptyPlayList from "../../assets/playlist-empty.png";
import { usePlayListByIdQuery } from "../../shared/data/playlists/usePlayListByIdQuery";
import styles from "./PlayListInfo.module.css";
import { pluralize } from "../../shared/utils/text";

export function PlayListInfo() {
  const { id } = useParams();
  const { playList } = usePlayListByIdQuery(id);

  return (
    <div className={styles.playListInfoBox}>
      <div className={styles.playListCover}>
        <img src={emptyPlayList} alt="Empty playlist" />
      </div>
      <p className={styles.playListTitle}>{playList?.name}</p>
      <div className={styles.playListMeta}>
        <p>{playList?.description}</p>
        <p>{pluralize(playList?.tracks.length, "track")}</p>
        <p>
          {playList?.created_at &&
            new Date(playList?.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
