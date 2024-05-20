import { PropsWithChildren, useContext, useEffect, useMemo } from "react";
import { FormControl, FormHelperText, Grid } from "@mui/material";
import { FormContext, useResolveProp } from "./util";

export interface InputProps extends PropsWithChildren {
  field: string;
  label?: string;
  helperText?: string | ((form: any) => string | undefined);
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
  const _helperText = useMemo(() => {
    if (!helperText) {
      return null;
    }
    if (typeof helperText === "string") {
      return helperText;
    }
    if (typeof helperText === "function") {
      return helperText(form);
    }
  }, [helperText, form]);

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
        {helperText ? <FormHelperText>{_helperText}</FormHelperText> : null}
      </FormControl>
    </Grid>
  );
};
