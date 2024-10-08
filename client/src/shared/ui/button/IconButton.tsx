import MUIIconButton, {
  type IconButtonProps as MUIIconButtonProps,
} from "@mui/material/IconButton";
import styles from "./IconButton.module.css";
import { getIcon, type Icon } from "../helpers/getIcon";

interface IconButtonProps extends MUIIconButtonProps {
  icon: Icon;
}

export function IconButton({ icon, ...props }: IconButtonProps) {
  return (
    <MUIIconButton className={styles.iconButton} {...props}>
      {getIcon(icon)}
    </MUIIconButton>
  );
}
