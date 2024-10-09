import { Link } from "react-router-dom";
import { PlayLists } from "./list";
import { PlayListCreate } from "./create";
import styles from "./list/PlayListRow.module.css";

export function PlayListsPage() {
  return (
    <>
      <PlayListCreate />
      <PlayLists>
        {(playList) => (
          <Link
            to={`/playlists/${playList.id}`}
            className={styles.playListLink}
          />
        )}
      </PlayLists>
    </>
  );
}
