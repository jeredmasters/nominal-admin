import { TextInput, TextInputProps } from "react-admin";

export interface HiddenInputProps extends TextInputProps {}
export const HiddenInput = (props: HiddenInputProps) => (
  <TextInput {...props} style={{ display: "none" }} />
);
