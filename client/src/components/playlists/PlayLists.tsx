import { PlayListRow } from "./PlayListRow";
import { type PlayList } from "@/shared/data/playlists/schema";
import styles from "./PlayLists.module.css";

interface PlayListsProps {
  playLists?: PlayList[];
  children?: (playList: PlayList) => React.ReactNode;
}

/**
 * A component that renders a list of playlists, each represented by a `PlayListRow`.
 *
 * This component receives a list of playlists and an optional render function as `children`.
 * For each playlist, it renders a `PlayListRow`, and if a render function is provided,
 * it will render additional content using the `children` prop.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {PlayList[]} [props.playLists] - An optional array of playlists to be displayed.
 * @param {(playList: PlayList) => React.ReactNode} [props.children] - An optional render
 * function that takes a `playList` object and returns additional content to be rendered within each `PlayListRow`.
 * @returns {JSX.Element} A list of playlists with additional content if provided.
 */

export function PlayLists({ playLists, children }: PlayListsProps) {
  return (
    <div className={styles.playLists}>
      {playLists?.map((playList) => (
        <PlayListRow key={playList.id} playList={playList}>
          {children && children(playList)}
        </PlayListRow>
      ))}
    </div>
  );
}
