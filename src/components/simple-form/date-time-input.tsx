import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useContext, useMemo } from "react";
import { fieldLabel } from "../../util";
import { FormContext } from "./util";
import { InputProps, InputWrapper } from "./input-wrapper";

interface DateTimeInputProps extends InputProps {}
export const DateTimeInput = (props: DateTimeInputProps) => {
  const { field, label } = props;

  const { form, setForm } = useContext(FormContext);
  const inputLabel = useMemo(() => label || fieldLabel(field), [field, label]);
  const rawValue = useMemo(
    () => (form && form[field] ? form[field] : ""),
    [form]
  );
  const handleChange = (value: any) => {
    setForm((f: any) => ({ ...f, [field]: value }));
  };
  return (
    <InputWrapper {...props}>
      <DateTimePicker
        value={dayjs(rawValue)}
        label={inputLabel}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};
