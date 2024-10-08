import MUITextField, { type TextFieldProps } from "@mui/material/TextField";

type InputProps = TextFieldProps;

export function Input(props: InputProps) {
  return (
    <MUITextField
      variant={props.variant || "standard"}
      {...props}
      slotProps={{
        input: { style: { color: "#fff" } },
        inputLabel: { style: { color: "#fff" } },
      }}
    />
  );
}
