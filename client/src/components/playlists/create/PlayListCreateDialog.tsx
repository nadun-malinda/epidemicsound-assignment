import { Input, Button, Dialog } from "../../../shared/ui";
import { useCreatePlayListMutation } from "../../../shared/data/playlists/useCreatePlayListMutation";
import styles from "./PlayListCreateDialog.module.css";
import { useEffect, useState } from "react";
import { PlayList } from "../../../shared/data/playlists/schema";

interface PlayListCreateDialogProps {
  open: boolean;
  onClose: () => void;
}

type FormData = Pick<PlayList, "name" | "description">;

const initialFormData: FormData = {
  name: "",
  description: "",
};

export function PlayListCreateDialog({
  open,
  onClose,
}: PlayListCreateDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="New playlist"
      content={
        <DialogContent
          onClose={onClose}
          onSuccess={(isSuccess) => isSuccess && onClose()}
        />
      }
    />
  );
}

interface DialogContentProps {
  onSuccess: (isSuccess: boolean) => void;
  onClose: () => void;
}
function DialogContent({ onSuccess, onClose }: DialogContentProps) {
  const [formError, setFormError] = useState(false);
  const [formData, setFormFData] = useState(initialFormData);
  const { mutate: createPlayList, isSuccess } = useCreatePlayListMutation();

  useEffect(() => {
    onSuccess(isSuccess);
  }, [isSuccess, onSuccess]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormFData({ ...formData, [name]: value });
    setFormError(name === "");
  };

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
