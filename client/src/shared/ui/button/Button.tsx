import MUIButton, {
  type ButtonProps as MUIButtonProps,
} from "@mui/material/Button";
import styles from "./Button.module.css";
import spin from "../../../assets/spin.png";
import { getIcon, type Icon } from "../helpers/getIcon";

interface ButtonProps extends MUIButtonProps {
  /**
   * If true, shows a loading spinner inside the button and disables the button.
   */
  loading?: boolean;

  /**
   * Icon to be displayed at the start of the button. Should be a valid key from the icon set.
   */
  startIcon?: Icon;

  /**
   * Icon to be displayed at the end of the button. Should be a valid key from the icon set.
   */
  endIcon?: Icon;
}

/**
 * A reusable button component that wraps Material UI's Button, adding support for
 * loading state, start and end icons, and custom styling.
 *
 * @param {ButtonProps} props - The props for the Button component, including loading state and icons.
 * @returns {JSX.Element} The customized button component.
 */
export function Button({
  disabled,
  loading,
  children,
  color = "inherit",
  variant = "contained",
  startIcon,
  endIcon,
  ...props
}: ButtonProps) {
  return (
    <MUIButton
      color={color}
      variant={variant}
      disabled={disabled || loading}
      startIcon={startIcon && getIcon(startIcon)}
      endIcon={endIcon && getIcon(endIcon)}
      sx={{
        color:
          variant === "outlined" || variant === "text" ? "inherit" : "#000",
      }}
      className={styles.button}
      {...props}
    >
      {loading && <img src={spin} alt="Loading" className={styles.spin} />}
      {children}
    </MUIButton>
  );
}
