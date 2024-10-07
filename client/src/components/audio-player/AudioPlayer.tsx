import { useRef, useState, useEffect } from "react";
import styles from "./AudioPlayer.module.css";
import type { Track } from "@/shared/hooks/schema";

interface AudioPlayerProps {
  track: Track;
}

function AudioPlayer({ track }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = (e: any) => {
    setProgress(e.target.currentTime / e.target.duration);
  };

  const handleSliderChange = (e: any) => {
    if (audioRef.current) {
      audioRef.current.currentTime =
        (e.target.value / 1000) * audioRef.current.duration;
    }
  };

  const handleTogglePlaybackClick = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
      audioElement.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audioElement.removeEventListener("play", handlePlay);
        audioElement.removeEventListener("pause", handlePause);
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.currentTime = 0;
    }
  }, [track]);

  return (
    <>
      <audio src={track.audio} ref={audioRef} />
      <div className={styles.audioPlayer}>
        <button
          className={styles.togglePlaybackButton}
          onClick={handleTogglePlaybackClick}
        >
          {isPlaying ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 5H7V19H10V5ZM17 5H14V19H17V5Z"
                fill="#000"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 12L8 5V19L20 12Z" fill="#000" />
            </svg>
          )}
        </button>
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{track.title}</div>
          <div className={styles.trackArtist}>
            {track.main_artists.join(", ")}
          </div>
        </div>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="1"
            max="1000"
            value={progress * 1000}
            className={styles.slider}
            onChange={handleSliderChange}
          />
        </div>
      </div>
    </>
  );
}

export default AudioPlayer;
