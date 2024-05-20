import { useContext, useMemo, ChangeEventHandler } from "react";
import { fieldLabel } from "../../util";
import { FormContext } from "./util";
import { TextField } from "@mui/material";
import { InputProps, InputWrapper } from "./input-wrapper";

interface TextInputProps extends InputProps {
  multiline?: boolean | number;
}
export const TextInput = (props: TextInputProps) => {
  const { field, label, multiline } = props;
  const { form, setForm } = useContext(FormContext);
  const inputLabel = useMemo(() => label || fieldLabel(field), [field, label]);
  const rawValue = useMemo(
    () => (form && form[field] ? form[field] : ""),
    [form, field]
  );
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm((f: any) => ({ ...f, [field]: e.target.value }));
  };
  return (
    <InputWrapper {...props}>
      <TextField
        id={field}
        label={inputLabel}
        value={rawValue}
        onChange={handleChange}
        multiline={!!multiline}
        minRows={typeof multiline === "number" ? multiline : undefined}
      />
    </InputWrapper>
  );
};
