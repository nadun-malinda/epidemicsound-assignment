import { Link } from "react-router-dom";
import { PlayListCreate } from "./create";
import styles from "./list/PlayListRow.module.css";
import { PlayListsContainer } from "./PlayListsContainer";

export function PlayListsPage() {
  return (
    <>
      <PlayListCreate />

      <PlayListsContainer>
        {(playList) => (
          <Link
            to={`/playlists/${playList.id}`}
            className={styles.playListLink}
          />
        )}
      </PlayListsContainer>
    </>
  );
}
