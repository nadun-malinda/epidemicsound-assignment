import { type PlayList } from "../../../shared/data/playlists/schema";
import { usePlayListsQuery } from "../../../shared/data/playlists/usePlayListsQuery";
import { PlayListRow } from "./PlayListRow";
import styles from "./PlayLists.module.css";

interface PlayListsProps {
  children?: (playList: PlayList) => React.ReactNode;
}

export function PlayLists({ children }: PlayListsProps) {
  const { playLists } = usePlayListsQuery();

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
