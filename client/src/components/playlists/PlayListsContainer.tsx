import { PlayLists } from "./PlayLists";
import { type PlayList } from "../../shared/data/playlists/schema";
import { usePlayListsQuery } from "../../shared/data/playlists";
import styles from "./PlayListsContainer.module.css";

interface PlayListsContainerProps {
  children?: (playList: PlayList) => React.ReactNode;
}

/**
 * A container component that fetches and displays playlists.
 *
 * This component handles the fetching of playlists using the `usePlayListsQuery` hook.
 * It manages the loading and error states, displaying appropriate messages,
 * and passes the fetched playlists to the `PlayLists` component.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {(playList: PlayList) => React.ReactNode} [props.children] - An optional function that
 * renders additional content for each playlist, passing the individual `playList` as an argument.
 * @returns {JSX.Element} A list of playlists with loading and error states managed.
 */
export function PlayListsContainer({ children }: PlayListsContainerProps) {
  const { playLists, isLoading, isError } = usePlayListsQuery();

  if (isLoading) {
    return <MessageWrapper>Loading playlists...</MessageWrapper>;
  }

  if (isError) {
    return <MessageWrapper>Error while fetching playlists!</MessageWrapper>;
  }

  if (playLists?.length === 0) {
    return <MessageWrapper>No playlists!</MessageWrapper>;
  }

  return <PlayLists playLists={playLists}>{children}</PlayLists>;
}

function MessageWrapper({ children }: { children: string }) {
  return <p className={styles.message}>{children}</p>;
}
