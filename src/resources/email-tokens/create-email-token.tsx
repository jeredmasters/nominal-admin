import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  ReferenceInput,
  SelectInput,
  useRecordContext,
  useCreateController,
  useGetOne,
} from "react-admin";
import { Button, Typography } from "@mui/material";
import { HiddenInput } from "../../components/hidden-input";
import { CreatePanel } from "../../components/create-panel";

export const CreateEmailToken = () => {
  const { record } = useCreateController();
  const { voter_id } = record || {};
  const { data: voter } = useGetOne("voters", { id: voter_id });
  return (
    <CreatePanel resource="email-tokens">
      <TextInput
        source="email"
        fullWidth
        disabled
        defaultValue={voter ? voter.email : null}
      />

      <ReferenceInput
        source="election_id"
        reference="elections"
        filter={{ voter_id }}
      />

      <TextInput source="voter_id" style={{ display: "none" }} />
    </CreatePanel>
  );
};
