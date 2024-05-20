import { createContext, useContext } from "react";

export interface IFormContext {
  form: any | null;
  setForm: (v: any) => void;
}

export const FormContext = createContext<IFormContext>({
  form: null,
  setForm: (v: any) => null,
});

export const useResolveProp = <T = any>(
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
