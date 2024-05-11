import React, { PropsWithChildren, useContext, useMemo } from "react";
import { useShowPath } from "../util";
import { useNavigate } from "react-router-dom";
import { useGetOne } from "../context/data.provider";
import { ErrorPanel } from "./error";
import { AuthContext } from "../context/auth.provider";
import { SimpleLoading } from "./loading";
import { SimpleForm } from "./simple-form";

export interface SimpleCreateProps extends PropsWithChildren {
  resource: string;
  initialValue?: any;
  cancelPath?: string;
  onSuccess?: (value: any) => void;
}

export const SimpleCreate = ({
  resource,
  initialValue,
  children,
  cancelPath,
  onSuccess,
}: SimpleCreateProps) => {
  const showPath = useShowPath(resource);
  const navigate = useNavigate();
  const { fetch } = useContext(AuthContext);

  if (!fetch) {
    return (
      <ErrorPanel text="Must have fetch" source={`SimpleEdit(${resource})`} />
    );
  }

  const handleSubmit = (form: any) => {
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
  const handleCancel = useMemo(
    () => (cancelPath ? () => navigate(cancelPath) : undefined),
    [cancelPath]
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
