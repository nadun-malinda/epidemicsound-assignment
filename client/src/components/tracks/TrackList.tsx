import { useState } from "react";
import TrackRow from "./TrackRow";
import AudioPlayer from "../audio-player/AudioPlayer";
import { type Track } from "../../shared/data/tracks/schema";

interface TrackListProps {
  tracks?: Track[];
  children?: (track: Track) => React.ReactNode;
}

export function TrackList({ tracks, children }: TrackListProps) {
  const [currentTrack, setCurrentTrack] = useState<Track>();

  const handlePlay = (track: Track) => setCurrentTrack(track);

  return (
    <>
      {tracks?.map((track, ix) => (
        <TrackRow key={ix} track={track} handlePlay={handlePlay}>
          {children && children(track)}
        </TrackRow>
      ))}

      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}
