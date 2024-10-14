import { Link } from "react-router-dom";
import { PlayListCreate } from "./PlayListCreate";
import styles from "./PlayListRow.module.css";
import { PlayListsContainer } from "./PlayListsContainer";

/**
 * A component that represents the playlists page.
 *
 * This component includes a button to create a new playlist and renders a container
 * to display the existing playlists. Each playlist can be clicked to navigate to its detail page.
 *
 * @returns {JSX.Element} The playlists page containing the create button and the playlist links.
 */
export function PlayListsPage() {
  return (
    <div data-testid="playlists-page">
      <PlayListCreate />

      <PlayListsContainer>
        {(playList) => (
          <Link
            to={`/playlists/${playList.id}`}
            className={styles.playListLink}
          />
        )}
      </PlayListsContainer>
    </div>
  );
}
