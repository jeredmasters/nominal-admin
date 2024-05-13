import {
  ChangeEventHandler,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FormContext,
  InputProps,
  InputWrapper,
  SimpleForm,
} from "./simple-form";
import { Grid, TextField, InputLabel } from "@mui/material";
import Select from "react-select/dist/declarations/src/Select";
import { fieldLabel } from "../util";

export enum CONDITION_TYPE {
  TAG_EQUALS = "TAG_EQUALS",
}

export type VoterCondition = VoterCondition_Tag;
export interface VoterCondition_Tag {
  type: CONDITION_TYPE.TAG_EQUALS;
  key: string;
  value: string;
}

interface ConditionInputProps extends InputProps {}
export const ConditionInput = (props: ConditionInputProps) => {
  const { field, label } = props;
  const [condition, setCondition] = useState<VoterCondition>({
    type: CONDITION_TYPE.TAG_EQUALS,
    key: "",
    value: "",
  });

  const { form, setForm } = useContext(FormContext);
  const inputLabel = useMemo(() => label || fieldLabel(field), [field, label]);
  const rawCondition = useMemo(
    () => (form && form[field] ? form[field] : ""),
    [form, field]
  );
  useEffect(() => {
    setForm({ ...form, condition });
  }, [condition]);

  const handleKeyChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCondition((f: any) => ({ ...f, key: e.target.value }));
  };
  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCondition((f: any) => ({ ...f, value: e.target.value }));
  };

  return (
    <InputWrapper {...props}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            label="Tag"
            value={condition.key}
            onChange={handleKeyChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Value"
            value={condition.value}
            onChange={handleValueChange}
          />
        </Grid>
      </Grid>
    </InputWrapper>
  );
};
