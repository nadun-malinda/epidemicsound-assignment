import { Track } from "@/shared/data/tracks/schema";
import { formatSecondsToHMS } from "@/shared/utils/date";
import styles from "./TrackRow.module.css";

interface TrackRowProps {
  track: Track;
  handlePlay: (track: Track) => void;
  children?: React.ReactNode;
}

function TrackRow({ track, handlePlay, children }: TrackRowProps) {
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

        <div>
          <span className={styles.trackLength}>
            {formatSecondsToHMS(track.length)}
          </span>
          {children}
        </div>
      </div>
    </div>
  );
}

export default TrackRow;
