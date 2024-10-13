import { useState } from "react";
import { Button } from "@/shared/ui";
import { PlayListCreateDialog } from "./PlayListCreateDialog";

/**
 * A component that renders a button to create a new playlist and opens the `PlayListCreateDialog` when clicked.
 *
 * This component manages the state for opening and closing the dialog.
 *
 * @returns {JSX.Element} The button to trigger the playlist creation dialog and the dialog itself.
 */
export function PlayListCreate() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} startIcon="add">
        New playlist
      </Button>

      <PlayListCreateDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
