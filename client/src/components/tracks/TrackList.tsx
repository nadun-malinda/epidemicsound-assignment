import { useState } from "react";
import TrackRow from "./TrackRow";
import { AudioPlayer } from "@/components/audio-player";
import { type Track } from "@/shared/data/tracks/schema";

interface TrackListProps {
  /**
   * An optional array of Track objects
   */
  tracks?: Track[];

  /**
   * A function that returns a React node for each track
   */
  children?: (track: Track) => React.ReactNode;
}

/**
 * A component that renders a list of tracks and an audio player.
 *
 * The component allows users to play a selected track and provides optional custom rendering for each track.
 *
 * @param {TrackListProps} props - The properties for the component.
 * @returns {JSX.Element} The TrackList component.
 */
export function TrackList({ tracks, children }: TrackListProps) {
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>(
    undefined
  );

  /**
   * Handles the playing of a selected track by updating the currentTrack state.
   *
   * @param {Track} track - The track to play.
   */
  const handlePlay = (track: Track) => {
    // Update the current track state to the selected track
    setCurrentTrack(track);
  };

  return (
    <div data-testid="tracklist">
      {tracks?.map((track) => (
        <TrackRow key={track.id} track={track} handlePlay={handlePlay}>
          {/* Render children if provided */}
          {children ? children(track) : null}
        </TrackRow>
      ))}

      {/* Render the AudioPlayer only if a track is selected */}
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </div>
  );
}
