import { Track } from "../../shared/data/tracks/schema";
import { Dialog } from "../../shared/ui/dialog/Dialog";

interface TrackAddToPlayListDialogProps {
  open: boolean;
  onClose: () => void;
  trackId: Track["id"];
}

export function TrackAddToPlayListDialog({
  open,
  onClose,
  trackId,
}: TrackAddToPlayListDialogProps) {
  return (
    <Dialog
      title="Playlists"
      content={<>Some contents... {trackId}</>}
      open={open}
      onClose={onClose}
    />
  );
}
