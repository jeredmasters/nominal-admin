import React, { PropsWithChildren, useContext, useMemo } from "react";
import { useShowPath } from "../util";
import { useNavigate } from "react-router-dom";
import { ErrorPanel } from "./error";
import { AuthContext } from "../context/auth.provider";
import { SimpleForm } from "./simple-form";
import { RESOURCE } from "../const/resources";

export interface SimpleCreateProps extends PropsWithChildren {
  resource: RESOURCE;
  initialValue?: any;
  onCancel?: string | (() => void);
  onSuccess?: (value: any) => void;
  onBeforeSubmit?: (form: any, submit: (form: any) => void) => void;
}

export const SimpleCreate = ({
  resource,
  initialValue,
  children,
  onCancel,
  onSuccess,
  onBeforeSubmit,
}: SimpleCreateProps) => {
  const showPath = useShowPath(resource);
  const navigate = useNavigate();
  const { fetch } = useContext(AuthContext);

  if (!fetch) {
    return (
      <ErrorPanel text="Must have fetch" source={`SimpleEdit(${resource})`} />
    );
  }

  const submit = (form: any) => {
    fetch(`/${resource}`, { method: "post", body: form }).then((response) => {
      if (onSuccess) {
        onSuccess(response.json);
      } else {
        const { id } = response.json;
        const path = showPath(String(id));
        navigate(path);
      }
    });
  };

  const handleSubmit = (form: any) => {
    if (onBeforeSubmit) {
      onBeforeSubmit(form, submit);
    } else {
      submit(form);
    }
  };
  const handleCancel = useMemo(
    () => (typeof onCancel === "string" ? () => navigate(onCancel) : onCancel),
    [onCancel]
  );

  return (
    <SimpleForm
      initialValue={initialValue}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      {children}
    </SimpleForm>
  );
};
