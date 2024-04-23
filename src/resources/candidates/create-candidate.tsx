import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  ReferenceInput,
  SelectInput,
  Title,
} from "react-admin";
import { Button, Typography } from "@mui/material";

export const CreateCandidate = () => (
  <Create>
    <Typography variant="h4">Create Candidate</Typography>

    <SimpleForm>
      <TextInput source="label" validate={[required()]} fullWidth />
      <ReferenceInput
        source="organisation_id"
        reference="organisations"
        isRequired
        fullWidth
        disabled
      />
      <TextInput source="election_id" hidden />
    </SimpleForm>
  </Create>
);
