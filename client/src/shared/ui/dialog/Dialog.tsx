import MUIDialog, {
  type DialogProps as MUIDialogProps,
} from "@mui/material/Dialog";
import MUIDialogTitle from "@mui/material/DialogTitle";
import MUIDialogContent from "@mui/material/DialogContent";

interface DialogProps extends Omit<MUIDialogProps, "content"> {
  content?: string | React.ReactNode;
}

export function Dialog({
  onClose,
  open,
  title,
  content,
  maxWidth,
}: DialogProps) {
  return (
    <MUIDialog
      onClose={onClose}
      open={open}
      maxWidth={maxWidth}
      PaperProps={{ sx: { bgcolor: "#121212", color: "#ffffff" } }}
    >
      {title && <MUIDialogTitle sx={{ m: 0, p: 2 }}>{title}</MUIDialogTitle>}
      {content && <MUIDialogContent dividers>{content}</MUIDialogContent>}
    </MUIDialog>
  );
}
