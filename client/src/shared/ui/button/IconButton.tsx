import MUIIconButton, {
  type IconButtonProps as MUIIconButtonProps,
} from "@mui/material/IconButton";
import { getIcon, type Icon } from "../helpers/getIcon";
import styles from "./IconButton.module.css";

interface IconButtonProps extends MUIIconButtonProps {
  icon: Icon;
}

export function IconButton({
  icon,
  color = "inherit",
  ...props
}: IconButtonProps) {
  return (
    <MUIIconButton className={styles.iconButton} color={color} {...props}>
      {getIcon(icon)}
    </MUIIconButton>
  );
}
