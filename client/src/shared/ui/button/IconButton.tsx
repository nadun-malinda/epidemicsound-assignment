import MUIIconButton, {
  type IconButtonProps as MUIIconButtonProps,
} from "@mui/material/IconButton";
import { getIcon, type Icon } from "../helpers/getIcon";
import styles from "./IconButton.module.css";

interface IconButtonProps extends MUIIconButtonProps {
  /**
   * The name of the icon to be displayed inside the button. Should be a valid key from the icon set.
   */
  icon: Icon;
}

/**
 * A reusable IconButton component that wraps Material UI's IconButton, allowing for easy
 * integration of icons from a custom icon set.
 *
 * @param {IconButtonProps} props - The props for the IconButton, including the icon to display.
 * @returns {JSX.Element} The customized icon button component.
 */
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
