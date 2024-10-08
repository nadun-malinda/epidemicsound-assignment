import { type PlayList as PlayListType } from "../../../shared/data/playlists/schema";
import { usePlayListsQuery } from "../../../shared/data/playlists/usePlayListsQuery";
import { PlayList } from "./PlayList";
import styles from "./PlayLists.module.css";

interface PlayListsProps {
  children?: (playList: PlayListType) => React.ReactNode;
}

export function PlayLists({ children }: PlayListsProps) {
  const { playLists } = usePlayListsQuery();

  return (
    <div className={styles.playLists}>
      {playLists?.map((playList) => (
        <PlayList key={playList.id} playList={playList}>
          {children && children(playList)}
        </PlayList>
      ))}
    </div>
  );
}
