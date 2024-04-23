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

export const CreateElection = () => (
  <Create>
    <Typography variant="h4">Create Election</Typography>

    <SimpleForm>
      <TextInput source="label" validate={[required()]} fullWidth />
      <ReferenceInput
        source="organisation_id"
        reference="organisations"
        isRequired
        fullWidth
      />
      <SelectInput
        source="type"
        choices={[
          { id: "YES_NO", name: "Yes/No" },
          { id: "RANKING", name: "Ranking" },
          { id: "PREFERENCE", name: "Preference" },
          { id: "FIRST_PAST", name: "First Past the Post" },
        ]}
        isRequired
        fullWidth
      />
      <TextInput source="teaser" multiline={true} label="Short description" />
      <DateInput label="Opens At" source="opens_at" defaultValue={new Date()} />
      <DateInput
        label="Closes At"
        source="closes_at"
        defaultValue={new Date().setDate(new Date().getDate() + 30)}
      />
    </SimpleForm>
  </Create>
);
