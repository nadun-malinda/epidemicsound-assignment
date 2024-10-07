import { useEffect, useState } from "react";
import TrackRow from "./TrackRow";
import AudioPlayer from "../audio-player/AudioPlayer";
import { Track } from "@/shared/hooks/schema";
import { useTracks } from "../../shared/hooks/useTracks";

export function TrackList() {
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const { tracks } = useTracks();

  useEffect(() => {
    console.log("tracks: ", tracks);
  }, [tracks]);

  const handlePlay = (track: Track) => setCurrentTrack(track);

  return (
    <>
      {tracks.map((track, ix) => (
        <TrackRow key={ix} track={track} handlePlay={handlePlay} />
      ))}

      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}
