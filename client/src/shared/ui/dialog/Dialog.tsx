import MUIDialog, {
  type DialogProps as MUIDialogProps,
} from "@mui/material/Dialog";
import MUIDialogTitle from "@mui/material/DialogTitle";
import MUIDialogContent from "@mui/material/DialogContent";

interface DialogProps extends Omit<MUIDialogProps, "content"> {
  /**
   * The content to display inside the dialog. Can be a string or a React node.
   */
  content?: string | React.ReactNode;
}

/**
 * A reusable Dialog component that wraps Material UI's Dialog, adding custom styling
 * and support for optional title and content props.
 *
 * @param {DialogProps} props - The props for the Dialog component, including optional title and content.
 * @returns {JSX.Element} The customized dialog component.
 */
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
          border: "1px solid var(--secondary-color)",
        },
      }}
      {...props}
    >
      {title && (
        <MUIDialogTitle
          sx={{
            m: 0,
            p: 2,
            borderBottom: "1px solid var(--secondary-color)",
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
