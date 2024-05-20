import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useContext, useMemo } from "react";
import { fieldLabel } from "../../util";
import { FormContext } from "./util";
import { InputProps, InputWrapper } from "./input-wrapper";
import { FormControlLabel, Checkbox } from "@mui/material";

interface CheckInputProps extends InputProps {}
export const CheckInput = (props: CheckInputProps) => {
  const { field, label } = props;

  const { form, setForm } = useContext(FormContext);
  const inputLabel = useMemo(() => label || fieldLabel(field), [field, label]);
  const raw = form[field];
  const value = useMemo(() => {
    return raw === true || raw === "true";
  }, [raw]);
  const handleChange = () => {
    setForm((f: any) => ({ ...f, [field]: !value }));
  };
  return (
    <InputWrapper {...props}>
      <FormControlLabel
        control={<Checkbox checked={value} onChange={handleChange} />}
        label={inputLabel}
      />
    </InputWrapper>
  );
};
