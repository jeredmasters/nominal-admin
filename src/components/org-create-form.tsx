import * as React from "react";
import {
  Create,
  SimpleForm,
  useCreateController,
  useGetOne,
  Identifier,
  useCreate,
  useRedirect,
} from "react-admin";
import { Typography, Box } from "@mui/material";
import { useShowPath } from "../util";

export interface OrgCreateFormProps extends React.PropsWithChildren {
  resource: string;
  title: string;
}
export const OrgCreateForm = ({
  title,
  resource,
  children,
}: OrgCreateFormProps) => {
  const { record } = useCreateController();
  const { voter_id } = record || {};
  const { data: voter } = useGetOne("voters", { id: voter_id });
  const showPath = useShowPath();
  const redirect = useRedirect();
  const [create] = useCreate();
  const postSave = (data: any) => {
    create(resource, { data }, { onSuccess: handleSuccess });
  };
  const handleSuccess = ({ id }: any, variables: any, context: any) => {
    if (id && resource) {
      const path = showPath(String(id), resource);
      console.log({ path });
      redirect(path);
    }
  };
  return (
    <Create resource={resource} redirect={false}>
      <Box m={2}>
        <Typography variant="h5">{title}</Typography>
        <hr />
      </Box>
      <SimpleForm onSubmit={postSave}>{children}</SimpleForm>
    </Create>
  );
};
