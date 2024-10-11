import MUITextField, { type TextFieldProps } from "@mui/material/TextField";

/**
 * Custom `Input` component that wraps Material UI's `TextField` to apply
 * default styles, such as setting text color to white and adding a custom
 * border under the input.
 *
 * @param {TextFieldProps} props - The props to pass to the Material UI TextField.
 * @returns {JSX.Element} The customized Input component.
 */
export function Input({ variant = "standard", ...props }: TextFieldProps) {
  return (
    <MUITextField
      variant={variant}
      {...props}
      slotProps={{
        input: {
          style: {
            color: "#fff",
            borderBottom: "1px solid var(--secondary-color)",
          },
        },
        inputLabel: { style: { color: "#fff" } },
      }}
    />
  );
}
