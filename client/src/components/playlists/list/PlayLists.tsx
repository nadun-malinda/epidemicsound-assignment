import { useState } from "react";
import { type PlayList as PlayListType } from "../../../shared/data/playlists/schema";
import { usePlayListsQuery } from "../../../shared/data/playlists/usePlayListsQuery";
import { PlayListDeleteDialog } from "../delete/PlayListDeleteDialog";
import { PlayList } from "./PlayList";
import styles from "./PlayLists.module.css";

export function PlayLists() {
  const { playLists } = usePlayListsQuery();
  const [playList, setPlayList] = useState<PlayListType>();
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const handleOnEdit = (playList: PlayListType) => {
    console.log(">>> edit: ", playList);
  };

  const handleOnDelete = (playList: PlayListType) => {
    console.log(">>> delete: ", playList);
    setPlayList(playList);
    setIsOpenDeleteDialog(true);
  };

  return (
    <div className={styles.playLists}>
      {playLists?.map((playList) => (
        <PlayList
          key={playList.id}
          playList={playList}
          onEdit={handleOnEdit}
          onDelete={handleOnDelete}
        />
      ))}

      {playList && (
        <PlayListDeleteDialog
          open={isOpenDeleteDialog}
          onClose={() => setIsOpenDeleteDialog(false)}
          playList={playList}
        />
      )}
      {/* <PlayListItemEditDialog open={isOpenEditDialog} onClose={() => setIsOpenEditDialog(false) playList={playList}/> */}
    </div>
  );
}
