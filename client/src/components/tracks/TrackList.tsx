import { useEffect, useState } from "react";
import TrackRow from "./TrackRow";
import AudioPlayer from "../audio-player/AudioPlayer";
import { Track } from "../../shared/data/tracks/schema";
import { useTracksQuery } from "../../shared/data/tracks/useTracksQuery";

export function TrackList() {
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const { tracks, isLoading, error } = useTracksQuery();

  useEffect(() => {
    console.log("tracks: ", tracks);
  }, [tracks]);

  const handlePlay = (track: Track) => setCurrentTrack(track);

  if (isLoading) {
    return <>Loading ...</>;
  }

  if (error) {
    <>Error while fetching tracks!</>;
  }

  return (
    <>
      {tracks?.map((track, ix) => (
        <TrackRow key={ix} track={track} handlePlay={handlePlay} />
      ))}

      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}
