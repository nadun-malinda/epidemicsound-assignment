import MUIButton, {
  type ButtonProps as MUIButtonProps,
} from "@mui/material/Button";
import styles from "./Button.module.css";
import spin from "../../../assets/spin.png";
import { getIcon, type Icon } from "../helpers/getIcon";

interface ButtonProps extends MUIButtonProps {
  loading?: boolean;
  startIcon?: Icon;
  endIcon?: Icon;
}

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
