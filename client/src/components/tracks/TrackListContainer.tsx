import { TrackList } from "./TrackList";
import { type Track } from "../../shared/data/tracks/schema";
import { useTracksQuery } from "../../shared/data/tracks";

interface TrackListContainerProps {
  children?: (track: Track) => React.ReactNode;
}

/**
 * A container component that fetches and displays tracks.
 *
 * This component handles the fetching of tracks using the `useTracksQuery` hook.
 * It manages the loading and error states, displaying appropriate messages,
 * and passes the fetched tracks to the `TrackList` component.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {(track: Track) => React.ReactNode} [props.children] - An optional function that
 * renders additional content for each track, passing the individual `track` as an argument.
 * @returns {JSX.Element} A list of tracks with loading and error states managed.
 */
export function TrackListContainer({ children }: TrackListContainerProps) {
  const { tracks, isLoading, isError } = useTracksQuery();

  if (isLoading) {
    return <p>Loading playlists...</p>;
  }

  if (isError) {
    return <p>Error while fetching playlists!</p>;
  }

  return <TrackList tracks={tracks}>{children}</TrackList>;
}
