import { PlayListCreate } from "./create/PlayListCreate";
import { PlayLists } from "./list/PlayLists";

export function PlayListsPage() {
  return (
    <>
      <PlayListCreate />
      <PlayLists />
    </>
  );
}
