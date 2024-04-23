import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { Button, Typography } from "@mui/material";

export const CreateVoter = () => (
  <Create redirect="show">
    <Typography variant="h4">New Voter</Typography>

    <SimpleForm>
      <TextInput source="first_name" fullWidth isRequired />
      <TextInput source="last_name" fullWidth isRequired />
      <TextInput source="email" fullWidth isRequired />

      <ReferenceInput
        source="organisation_id"
        reference="organisations"
        isRequired
        fullWidth
        disabled
      />
    </SimpleForm>
  </Create>
);
