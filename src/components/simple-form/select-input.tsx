import { useContext, useMemo } from "react";
import { fieldLabel } from "../../util";
import { InputProps, InputWrapper } from "./input-wrapper";
import { FormContext } from "./util";
import { Select, MenuItem, SelectChangeEvent, InputLabel } from "@mui/material";

type StringEnum = { [key: string]: string };

interface SelectInputProps extends InputProps {
  options: Array<Option> | StringEnum | Array<string>;
}
interface Option {
  label: string;
  value: string;
}
export const SelectInput = (props: SelectInputProps) => {
  const { field, label, options } = props;

  const { form, setForm } = useContext(FormContext);
  const inputLabel = useMemo(() => label || fieldLabel(field), [field, label]);
  const raw = form[field];
  const value = useMemo(() => (raw ? raw : ""), [raw]);
  const handleChange = (e: SelectChangeEvent<any>) => {
    setForm((f: any) => ({ ...f, [field]: e.target.value }));
  };
  const formatOptions: Array<Option> = useMemo(() => {
    if (options.length === 0) {
      return [];
    }
    if (Array.isArray(options)) {
      return options.map(
        (o): Option => (typeof o === "string" ? { value: o, label: o } : o)
      );
    }
    return Object.keys(options).map(
      (o): Option => ({ value: o, label: options[o] })
    );
  }, [options]);
  console.log({ raw, value, options });

  return (
    <InputWrapper {...props}>
      <InputLabel id={`${field}-label`}>{inputLabel}</InputLabel>

      <Select
        labelId={`${field}-label`}
        label={inputLabel}
        id={field}
        value={value}
        onChange={handleChange}
      >
        {formatOptions.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </InputWrapper>
  );
};
