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

export const CreateAdminUser = () => (
  <Create redirect="show">
    <Typography variant="h4">Create AdminUser</Typography>

    <SimpleForm>
      <TextInput source="label" validate={[required()]} fullWidth />
      <ReferenceInput
        source="organisation_id"
        reference=RESOURCE.organisation
        isRequired
        fullWidth
        disabled
      />
      <TextInput source="election_id" hidden />
    </SimpleForm>
  </Create>
);
