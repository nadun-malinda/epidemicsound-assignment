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
      title="Create a playlist"
      content={
        <DialogContent onSuccess={(isSuccess) => isSuccess && onClose()} />
      }
      maxWidth="lg"
    />
  );
}

interface DialogContentProps {
  onSuccess: (isSuccess: boolean) => void;
}
function DialogContent({ onSuccess }: DialogContentProps) {
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
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPlayList(formData);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Name"
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
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
