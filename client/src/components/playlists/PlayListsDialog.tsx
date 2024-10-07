import { Dialog } from "../../shared/ui/dialog/Dialog";

interface PlayListsDialogProps {
  open: boolean;
  onClose: () => void;
}

export function PlayListsDialog({ open, onClose }: PlayListsDialogProps) {
  return (
    <Dialog
      title="Playlists"
      content={<>Some contents...</>}
      open={open}
      onClose={onClose}
    />
  );
}
