import React, { PropsWithChildren } from "react";
import {
  Create,
  SimpleForm,
  useCreateController,
  useGetOne,
  EditBase,
  useCreate,
  useRedirect,
} from "react-admin";
import { useShowPath } from "../util";
import { Card, CardContent, Container } from "@mui/material";
import { RESOURCE } from "../const/resources";

export interface EditPanelProps extends PropsWithChildren {
  resource: RESOURCE;
}

export const EditPanel = ({ resource, children }: EditPanelProps) => {
  const showPath = useShowPath(resource);
  const redirect = useRedirect();
  const [create] = useCreate();
  const postSave = (data: any) => {
    create(resource, { data }, { onSuccess: handleSuccess });
  };
  const handleSuccess = ({ id }: any, variables: any, context: any) => {
    if (id && resource) {
      const path = showPath(String(id));
      console.log({ path });
      redirect(path);
    }
  };
  return (
    <EditBase resource={resource} redirect={false}>
      <SimpleForm onSubmit={postSave}>{children}</SimpleForm>
    </EditBase>
  );
};
