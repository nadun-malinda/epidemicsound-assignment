import React from "react";
import { type PlayList as PlayListType } from "../../../shared/data/playlists/schema";
import styles from "./PlayList.module.css";
import { useNavigate } from "react-router-dom";

interface PlayListProps {
  playList: PlayListType;
  children?: React.ReactNode;
}

export function PlayList({ playList, children }: PlayListProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.playList}>
      <div
        className={styles.playListInfo}
        onClick={() => navigate(`/playlists/${playList.id}`)}
      >
        <p className={styles.playListTitle}>{playList.name}</p>
        <p className={styles.playListTracks}>
          {playList?.tracks?.length || 0} Tracks
        </p>
      </div>

      <div>{children}</div>
    </div>
  );
}
