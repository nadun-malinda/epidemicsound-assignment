import MUIButton, {
  type ButtonProps as MUIButtonProps,
} from "@mui/material/Button";
import styles from "./Button.module.css";
import spin from "../../../assets/spin.png";

interface ButtonProps extends MUIButtonProps {
  loading?: boolean;
}

export function Button({ disabled, loading, children, ...props }: ButtonProps) {
  return (
    <MUIButton
      {...props}
      disabled={disabled || loading}
      className={styles.button}
    >
      {loading && <img src={spin} alt="Loading" className={styles.spin} />}
      {children}
    </MUIButton>
  );
}
