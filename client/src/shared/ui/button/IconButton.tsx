import MUIIconButton, {
  type IconButtonProps as MUIIconButtonProps,
} from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./IconButton.module.css";

type Icon = "delete" | "plus" | "edit";

interface IconButtonProps extends MUIIconButtonProps {
  icon: Icon;
}

function getIcon(icon: Icon) {
  switch (icon) {
    case "delete":
      return <DeleteIcon />;

    case "plus":
      return <PlusOneIcon />;

    case "edit":
      return <EditIcon />;

    default:
      return <PlusOneIcon />;
  }
}

export function IconButton({ icon, ...props }: IconButtonProps) {
  return (
    <MUIIconButton className={styles.iconButton} {...props}>
      {getIcon(icon)}
    </MUIIconButton>
  );
}
