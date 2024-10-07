import MUIDialog from "@mui/material/Dialog";
import MUIDialogTitle from "@mui/material/DialogTitle";
import MUIDialogContent from "@mui/material/DialogContent";

export function Dialog({ onClose, open, title, content }) {
  return (
    <MUIDialog
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { bgcolor: "#121212", color: "#ffffff" } }}
    >
      {title && <MUIDialogTitle sx={{ m: 0, p: 2 }}>{title}</MUIDialogTitle>}
      {content && <MUIDialogContent dividers>{content}</MUIDialogContent>}
    </MUIDialog>
  );
}
