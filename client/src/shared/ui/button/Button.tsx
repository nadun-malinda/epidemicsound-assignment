import MUIButton, {
  type ButtonProps as MUIButtonProps,
} from "@mui/material/Button";
import styles from "./Button.module.css";
import spin from "../../../assets/spin.png";

interface ButtonProps extends MUIButtonProps {
  loading?: boolean;
}

export function Button({
  disabled,
  loading,
  children,
  color = "inherit",
  variant = "contained",
  ...props
}: ButtonProps) {
  return (
    <MUIButton
      color={color}
      variant={variant}
      disabled={disabled || loading}
      sx={{
        color: variant === "outlined" ? "inherit" : "#000",
      }}
      className={styles.button}
      {...props}
    >
      {loading && <img src={spin} alt="Loading" className={styles.spin} />}
      {children}
    </MUIButton>
  );
}
