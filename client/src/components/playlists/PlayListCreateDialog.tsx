import { useEffect, useState } from "react";
import { Input, Button, Dialog, Snackbar } from "@/shared/ui";
import { useCreatePlayListMutation } from "@/shared/data/playlists";
import { PlayList } from "@/shared/data/playlists/schema";
import styles from "./PlayListCreateDialog.module.css";

/**
 * Props for PlayListCreateDialog component.
 * @property {boolean} open - Controls the visibility of the dialog.
 * @property {Function} onClose - Callback to handle closing the dialog.
 */
interface PlayListCreateDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Type representing the form data for creating a playlist.
 */
type FormData = Pick<PlayList, "name" | "description">;

const initialFormData: FormData = {
  name: "",
  description: "",
};

/**
 * Dialog component for creating a new playlist.
 * It handles the form submission, success, and error states.
 *
 * @param {PlayListCreateDialogProps} props - The props for the component.
 * @returns {JSX.Element} The PlayListCreateDialog component.
 */
export function PlayListCreateDialog({
  open,
  onClose,
}: PlayListCreateDialogProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  /**
   * Handles setting the success state and closes the dialog if successful.
   *
   * @param {boolean} success - Indicates if the playlist was created successfully.
   */
  const handleOnSuccess = (success: boolean) => {
    if (success) {
      onClose();
    }
    setIsSuccess(success);
  };

  /**
   * Handles setting the error state.
   *
   * @param {boolean} error - Indicates if there was an error creating the playlist.
   */
  const handleOnError = (error: boolean) => {
    setIsError(error);
  };

  return (
    <div data-testid="playlist-create-dialog">
      <Dialog
        open={open}
        onClose={onClose}
        title="New playlist"
        content={
          <DialogContent
            onClose={onClose}
            onSuccess={handleOnSuccess}
            onError={handleOnError}
          />
        }
      />
      <Snackbar open={isSuccess} message="Playlist created successfully!" />
      <Snackbar open={isError} message="Failed to create playlist!" />
    </div>
  );
}

/**
 * Props for DialogContent component.
 * @property {Function} onSuccess - Callback to handle success state.
 * @property {Function} onError - Callback to handle error state.
 * @property {Function} onClose - Callback to handle closing the dialog.
 */
interface DialogContentProps {
  onSuccess: (isSuccess: boolean) => void;
  onError: (isError: boolean) => void;
  onClose: () => void;
}

/**
 * Form content for the playlist creation dialog.
 * Handles form submission and mutation for creating a new playlist.
 *
 * @param {DialogContentProps} props - The props for the component.
 * @returns {JSX.Element} The DialogContent component.
 */
function DialogContent({ onSuccess, onError, onClose }: DialogContentProps) {
  const [formError, setFormError] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const {
    mutate: createPlayList,
    isSuccess,
    isError,
  } = useCreatePlayListMutation();

  // Update the parent with success state when the mutation succeeds
  useEffect(() => {
    onSuccess(isSuccess);
  }, [isSuccess, onSuccess]);

  // Update the parent with error state when the mutation fails
  useEffect(() => {
    onError(isError);
  }, [isError, onError]);

  /**
   * Handles form input changes and updates the form data.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The input change event.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormError(name === "name" && value === "");
  };

  /**
   * Handles form submission to create a new playlist.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.name) {
      setFormError(false);
      createPlayList(formData);
    } else {
      setFormError(true);
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          error={formError}
          helperText={formError && "Name is required"}
          name="name"
          label="Name"
          variant="standard"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          multiline
        />
        <div className={styles.buttonGroup}>
          <Button variant="text" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
}
