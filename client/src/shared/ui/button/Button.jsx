import MUIButton from "@mui/material/Button";
import styles from "./Button.module.css";

export function Button({ onClick, children }) {
  return (
    <MUIButton onClick={onClick} variant="contained" className={styles.button}>
      {children}
    </MUIButton>
  );
}
