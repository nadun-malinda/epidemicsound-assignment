import MUIButton from "@mui/material/Button";
import styles from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ onClick, children }: ButtonProps) {
  return (
    <MUIButton onClick={onClick} variant="contained" className={styles.button}>
      {children}
    </MUIButton>
  );
}
