import React from "react";
import { type PlayList as PlayListType } from "../../../shared/data/playlists/schema";
import styles from "./PlayListRow.module.css";

interface PlayListProps {
  playList: PlayListType;
  children?: React.ReactNode;
}

export function PlayListRow({ playList, children }: PlayListProps) {
  return (
    <div className={styles.playListRow}>
      <div className={styles.playListInfo}>
        <p className={styles.playListTitle}>{playList.name}</p>
        <p className={styles.playListTracks}>
          {playList?.tracks?.length || 0} Tracks
        </p>
      </div>

      <div>{children}</div>
    </div>
  );
}
