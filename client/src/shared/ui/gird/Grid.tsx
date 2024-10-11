import Grid2, { type Grid2Props } from "@mui/material/Grid2";

/**
 * A wrapper around Material UI's `Grid2` component that forwards all props.
 * This component can be extended for additional customization if needed.
 *
 * @param {Grid2Props} props - The props to pass to the Material UI Grid2 component.
 * @returns {JSX.Element} The Grid component with the passed props.
 */
export function Grid(props: Grid2Props) {
  return <Grid2 {...props} />;
}
