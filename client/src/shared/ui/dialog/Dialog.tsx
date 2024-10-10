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
  ...props
}: DialogProps) {
  return (
    <MUIDialog
      onClose={onClose}
      open={open}
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#121212",
          color: "#ffffff",
          border: "1px solid #333",
        },
      }}
      {...props}
    >
      {title && (
        <MUIDialogTitle
          sx={{
            m: 0,
            p: 2,
            borderBottom: "1px solid #333",
            fontWeight: 600,
            fontSize: "1.5rem",
          }}
        >
          {title}
        </MUIDialogTitle>
      )}
      {content && <MUIDialogContent dividers>{content}</MUIDialogContent>}
    </MUIDialog>
  );
}
