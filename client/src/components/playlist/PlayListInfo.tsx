import emptyPlayList from "../../assets/playlist-empty.png";
import styles from "./PlayListInfo.module.css";
import { pluralize } from "../../shared/utils/text";
import { type PlayList } from "../../shared/data/playlists/schema";
import { PlayListActions } from "./PlayListActions";

interface PlayListInfoProps {
  playList: PlayList;
}

/**
 * A component that displays information about a specific playlist.
 *
 * This component includes the playlist's cover image, title,
 * description, number of tracks, creation date, and actions
 * for managing the playlist.
 *
 * @param {PlayListInfoProps} props - The properties for the component.
 * @returns {JSX.Element} The PlayListInfo component.
 */
export function PlayListInfo({ playList }: PlayListInfoProps) {
  return (
    <div className={styles.playListInfoBox}>
      <div>
        <div className={styles.playListCover}>
          <img src={emptyPlayList} alt="Empty playlist" />
        </div>
        <p className={styles.playListTitle}>{playList?.name}</p>
        <div className={styles.playListMeta}>
          <p>{playList?.description}</p>
          <p>{pluralize(playList?.tracks.length, "track")}</p>
          <p>
            {playList?.created_at &&
              new Date(playList.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <PlayListActions playList={playList} />
    </div>
  );
}
