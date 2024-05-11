import React, { PropsWithChildren, useContext } from "react";
import { useShowPath } from "../util";
import { useNavigate } from "react-router-dom";
import { useGetOne } from "../context/data.provider";
import { ErrorPanel } from "./error";
import { AuthContext } from "../context/auth.provider";
import { SimpleLoading } from "./loading";
import { SimpleForm } from "./simple-form";

export interface EditPanelProps extends PropsWithChildren {
  resource: string;
  id: string;
}

export const SimpleEdit = ({ resource, id, children }: EditPanelProps) => {
  const showPath = useShowPath(resource);
  const navigate = useNavigate();
  const { fetch } = useContext(AuthContext);
  const data = useGetOne(resource, id);

  if (!fetch) {
    return (
      <ErrorPanel text="Must have fetch" source={`SimpleEdit(${resource})`} />
    );
  }
  if (!data) {
    return <SimpleLoading />;
  }

  const handleSubmit = (form: any) => {
    fetch(`/${resource}/${id}`, { method: "put", body: form }).then(() => {
      const path = showPath(String(id));
      navigate(path);
    });
  };
  const handleCancel = () => {
    const path = showPath(String(id));
    navigate(path);
  };

  return (
    <SimpleForm
      initialValue={data}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      {children}
    </SimpleForm>
  );
};
