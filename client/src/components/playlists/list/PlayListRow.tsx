import React from "react";
import { type PlayList as PlayListType } from "../../../shared/data/playlists/schema";
import styles from "./PlayListRow.module.css";
import { pluralize } from "../../../shared/utils/text";

interface PlayListProps {
  playList: PlayListType;
  children?: React.ReactNode;
}

/**
 * A component that renders a single row of playlist information,
 * including the playlist name and the number of tracks in the playlist.
 *
 * This component also supports rendering additional content, passed via the `children` prop,
 * which can be any valid React node (e.g., buttons, icons) to be displayed alongside the playlist details.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {PlayListType} props.playList - The playlist data to be displayed, including name and tracks.
 * @param {React.ReactNode} [props.children] - Optional children components to be rendered inside the row,
 * typically used for actions (e.g., buttons, links).
 * @returns {JSX.Element} A single row representing playlist information, with optional actions or content.
 */

export function PlayListRow({ playList, children }: PlayListProps) {
  return (
    <div className={styles.playListRow}>
      <div className={styles.playListInfo}>
        <p className={styles.playListTitle}>{playList.name}</p>
        <p className={styles.playListTracks}>
          {pluralize(playList?.tracks?.length, "track")}
        </p>
      </div>

      <div>{children}</div>
    </div>
  );
}
