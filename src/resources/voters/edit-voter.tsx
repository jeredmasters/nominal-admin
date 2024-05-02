import * as React from "react";
import {
  SimpleForm,
  TextInput,
  ReferenceInput,
  Edit,
  ReferenceField,
} from "react-admin";
import { Button, Typography } from "@mui/material";

export const EditVoter = () => (
  <Edit redirect="show">
    <Typography variant="h4">Edit Voter</Typography>

    <SimpleForm>
      <TextInput source="first_name" fullWidth isRequired />
      <TextInput source="last_name" fullWidth isRequired />
      <TextInput source="email" fullWidth isRequired />

      <ReferenceField
        label="Organisation"
        source="organisation_id"
        reference="organisations"
      />
    </SimpleForm>
  </Edit>
);
