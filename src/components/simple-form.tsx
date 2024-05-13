import React, {
  ChangeEventHandler,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { fieldLabel, useShowPath } from "../util";
import {
  Box,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { createContext, useState } from "react";
import { SimpleButton } from "./simple-button";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import dayjs, { Dayjs } from "dayjs";

export interface EditPanelProps extends PropsWithChildren {
  initialValue?: any;
  onSubmit?: (form: any) => void;
  onChange?: (form: any) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

export const SimpleForm = ({
  initialValue,
  onSubmit,
  onChange,
  onCancel,
  onDelete,
  children,
}: EditPanelProps) => {
  const [form, setForm] = useState<any | null>(initialValue);

  const handleSubmit = () => onSubmit && onSubmit(form);

  return (
    <FormContext.Provider value={{ form, setForm }}>
      <Box mr={-1}>
        <form>
          <Grid container>
            {children}
            <Grid item xs={12}>
              <Box
                p={2}
                mr={1}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "#d5e5f3",
                }}
              >
                <Box>
                  {onSubmit && (
                    <SimpleButton
                      label="Save"
                      icon={<SaveIcon />}
                      func={handleSubmit}
                      variant="contained"
                      sx={{ marginRight: 2 }}
                    />
                  )}
                  {onCancel && (
                    <SimpleButton
                      label="Cancel"
                      icon={<CloseIcon />}
                      func={onCancel}
                    />
                  )}
                </Box>
                <Box>
                  {onDelete && (
                    <SimpleButton
                      label="Delete"
                      icon={<DeleteForeverIcon />}
                      func={onDelete}
                      variant="contained"
                      color="error"
                    />
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </FormContext.Provider>
  );
};

export interface IFormContext {
  form: any | null;
  setForm: (v: any) => void;
}

export const FormContext = createContext<IFormContext>({
  form: null,
  setForm: (v: any) => null,
});
const useResolveProp = (
  v?: boolean | ((form: any) => boolean),
  fallback: boolean = false
) => {
  const { form, setForm } = useContext(FormContext);
  if (typeof v === "boolean") {
    return v;
  }
  if (typeof v === "function") {
    return v(form);
  }
  return fallback;
};
export interface InputProps extends PropsWithChildren {
  field: string;
  label?: string;
  helperText?: string;
  defaultValue?: any;
  hide?: (form: any) => boolean;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
}
export const InputWrapper = ({
  xs,
  sm,
  md,
  lg,
  hide,
  defaultValue,
  field,
  helperText,
  children,
}: InputProps) => {
  const { form, setForm } = useContext(FormContext);
  const hidden = useResolveProp(hide);
  useEffect(() => {
    if (defaultValue !== undefined) {
      console.log("setting default", field, defaultValue, form);
      setForm((f: any) => ({ ...f, [field]: defaultValue }));
    }
  }, [field, defaultValue]);

  if (!xs) xs = 12;

  const gridProps = { xs, sm, md, lg };
  return (
    <Grid
      item
      {...gridProps}
      pb={1}
      pr={1}
      sx={{ display: hidden ? "none" : undefined }}
    >
      <FormControl fullWidth>
        {children}
        {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
      </FormControl>
    </Grid>
  );
};
interface TextInputProps extends InputProps {
  multiline?: boolean | number;
}
export const TextInput = (props: TextInputProps) => {
  const { field, label, multiline } = props;
  const { form, setForm } = useContext(FormContext);
  const inputLabel = useMemo(() => label || fieldLabel(field), [field, label]);
  const rawValue = useMemo(
    () => (form && form[field] ? form[field] : ""),
    [form]
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
  const rawValue = useMemo(
    () => (form && form[field] ? form[field] : ""),
    [form, field]
  );
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
  return (
    <InputWrapper {...props}>
      <InputLabel id={`${field}-label`}>{inputLabel}</InputLabel>

      <Select
        labelId={`${field}-label`}
        label={inputLabel}
        id={field}
        value={rawValue}
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

interface DateInputProps extends InputProps {}
export const DateInput = (props: DateInputProps) => {
  const { field, label } = props;

  const { form, setForm } = useContext(FormContext);
  const inputLabel = useMemo(() => label || fieldLabel(field), [field, label]);
  const rawValue = useMemo(
    () => (form && form[field] ? form[field] : ""),
    [form]
  );
  const handleChange = (value: any) => {
    console.log("DatePicker", value);
    setForm((f: any) => ({ ...f, [field]: value }));
  };
  return (
    <InputWrapper {...props}>
      <DatePicker
        value={dayjs(rawValue)}
        label={inputLabel}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};
