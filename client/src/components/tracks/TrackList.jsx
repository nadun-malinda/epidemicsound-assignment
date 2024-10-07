import { useState, useEffect } from "react";
import TrackRow from "./TrackRow";
import AudioPlayer from "../audio-player/AudioPlayer";

export function TrackList() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();

  useEffect(() => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  const handlePlay = (track) => setCurrentTrack(track);

  return (
    <>
      {tracks.map((track, ix) => (
        <TrackRow key={ix} track={track} handlePlay={handlePlay} />
      ))}

      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}
