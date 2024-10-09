import { useState } from "react";
import { PlayLists } from "./list";
import { PlayListCreate } from "./create";
import { PlayListDeleteDialog } from "./delete";
import { type PlayList } from "../../shared/data/playlists/schema";
import { IconButton } from "../../shared/ui";

export function PlayListsPage() {
  const [playList, setPlayList] = useState<PlayList>();
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const handleOnEdit = (playList: PlayList) => {
    console.log(">>> edit: ", playList);
  };

  const handleOnDelete = (playList: PlayList) => {
    console.log(">>> delete: ", playList);
    setPlayList(playList);
    setIsOpenDeleteDialog(true);
  };

  return (
    <>
      <PlayListCreate />
      <PlayLists>
        {(playList) => (
          <>
            <IconButton icon="edit" onClick={() => handleOnEdit(playList)} />
            <IconButton
              icon="delete"
              onClick={() => handleOnDelete(playList)}
            />
          </>
        )}
      </PlayLists>

      {playList && (
        <PlayListDeleteDialog
          open={isOpenDeleteDialog}
          onClose={() => setIsOpenDeleteDialog(false)}
          playList={playList}
        />
      )}
    </>
  );
}
