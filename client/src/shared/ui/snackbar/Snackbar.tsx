import { useState, useEffect } from "react";
import MUISnackbar, {
  SnackbarCloseReason,
  type SnackbarProps as MUISnackbarProps,
} from "@mui/material/Snackbar";
import { IconButton } from "../button";

/**
 * Reusable Snackbar component that manages open/close state internally.
 *
 * @param {boolean} initialOpen - Initial state to control the Snackbar's visibility.
 * @param {string} message - Message to display in the Snackbar.
 * @param {number} autoHideDuration - Time in milliseconds before automatically closing the Snackbar (optional).
 */
export function Snackbar({
  open: initialOpen = false,
  message,
  autoHideDuration = 6000,
  ...props
}: MUISnackbarProps) {
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    setOpen(initialOpen);
  }, [initialOpen]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <MUISnackbar
      open={open}
      message={message}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      action={<SnackbarAction onClose={handleClose} />}
      {...props}
    />
  );
}

/**
 * Internal component to handle the action (e.g., close button) in the Snackbar.
 *
 * @param {Function} onClose - Function to close the Snackbar.
 */
function SnackbarAction({
  onClose,
}: {
  onClose: (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
}) {
  return (
    <IconButton
      icon="close"
      size="large"
      aria-label="close"
      color="inherit"
      onClick={onClose}
    />
  );
}
