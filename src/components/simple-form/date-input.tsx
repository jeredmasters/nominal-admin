import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useContext, useMemo } from "react";
import { fieldLabel } from "../../util";
import { FormContext } from "./util";
import { InputProps, InputWrapper } from "./input-wrapper";

interface DateInputProps extends InputProps {}
export const DateInput = (props: DateInputProps) => {
  const { field, label } = props;

  const { form, setForm } = useContext(FormContext);
  const inputLabel = useMemo(() => label || fieldLabel(field), [field, label]);
  const raw = form[field];
  const value = useMemo(() => {
    if (raw) {
      if (typeof raw === "string") {
        return new Date(raw);
      }
      return raw;
    }
    return new Date();
  }, [raw]);
  const handleChange = (value: any) => {
    setForm((f: any) => ({ ...f, [field]: value }));
  };
  return (
    <InputWrapper {...props}>
      <DatePicker
        value={dayjs(value)}
        label={inputLabel}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};
