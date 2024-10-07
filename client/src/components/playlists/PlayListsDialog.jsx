import { Dialog } from "../../shared/ui";

export function PlayListsDialog({ open, onClose }) {
  return (
    <Dialog
      title="Playlists"
      content={<>Some contents...</>}
      open={open}
      onClose={onClose}
    />
  );
}
