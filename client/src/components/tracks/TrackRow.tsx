import React, { useState } from "react";
import styles from "./TrackRow.module.css";
import { Button } from "../../shared/ui/button/Button";
import { PlayListsDialog } from "../playlists/PlayListsDialog";
import { Track } from "@/shared/hooks/schema";

interface TrackRowProps {
  track: Track;
  handlePlay: (track: Track) => void;
}

function TrackRow({ track, handlePlay }: TrackRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.trackRow}>
      <button className={styles.trackPlay} onClick={() => handlePlay(track)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 12L8 5V19L20 12Z" fill="white" />
        </svg>
      </button>
      <div className={styles.trackInfoContainer}>
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{track.title}</div>
          <div className={styles.trackArtist}>
            {track.main_artists.join(", ")}
          </div>
        </div>

        <Button onClick={() => setOpen(true)}>Add to playlist</Button>
        <PlayListsDialog open={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}

export default TrackRow;
