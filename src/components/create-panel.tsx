import * as React from "react";
import {
  Create,
  SimpleForm,
  useCreateController,
  useCreate,
  useRedirect,
  CreateBase,
} from "react-admin";
import { useShowPath } from "../util";

export interface OrgCreateFormProps extends React.PropsWithChildren {
  resource: string;
}
export const CreatePanel = ({ resource, children }: OrgCreateFormProps) => {
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
    <CreateBase resource={resource} redirect={false}>
      <SimpleForm onSubmit={postSave}>{children}</SimpleForm>
    </CreateBase>
  );
};
