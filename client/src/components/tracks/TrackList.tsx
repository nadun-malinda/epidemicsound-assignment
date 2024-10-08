import { useEffect, useState } from "react";
import TrackRow from "./TrackRow";
import AudioPlayer from "../audio-player/AudioPlayer";
import { Track } from "../../shared/data/tracks/schema";
import { useTracksQuery } from "../../shared/data/tracks/useTracksQuery";
import { TrackAddToPlayListDialog } from "./TrackAddToPlayListDialog";

export function TrackList() {
  const { tracks, isLoading, error } = useTracksQuery();
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [selectedTrack, setSelectedTrack] = useState<Track>();
  const [isOpenAddToPlayListDialog, setIsOpenAddToPlayListDialog] =
    useState(false);

  useEffect(() => {
    console.log("tracks: ", tracks);
  }, [tracks]);

  const handlePlay = (track: Track) => setCurrentTrack(track);

  const handleAddToPlayList = (track: Track) => {
    console.log("track: ", track);
    setSelectedTrack(track);
    setIsOpenAddToPlayListDialog(true);
  };

  if (isLoading) {
    return <>Loading ...</>;
  }

  if (error) {
    <>Error while fetching tracks!</>;
  }

  return (
    <>
      {tracks?.map((track, ix) => (
        <TrackRow
          key={ix}
          track={track}
          handlePlay={handlePlay}
          onAddToPlayList={handleAddToPlayList}
        />
      ))}

      {selectedTrack && (
        <TrackAddToPlayListDialog
          trackId={selectedTrack.id}
          open={isOpenAddToPlayListDialog}
          onClose={() => setIsOpenAddToPlayListDialog(false)}
        />
      )}

      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}
