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
  ReferenceField,
} from "react-admin";
import { Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { HiddenInput } from "../../components/hidden-input";

const getFutureDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export const CreateElection = () => {
  const { state } = useLocation();
  console.log({ state });
  const { record } = state;
  const { organisation_id } = record || {};

  return (
    <Create redirect="show">
      <Typography variant="h4">Create Election</Typography>

      <SimpleForm>
        <TextInput source="label" validate={[required()]} fullWidth />
        <SelectInput
          source="response_type"
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
        <DateInput
          label="Opens At"
          source="opens_at"
          defaultValue={new Date()}
        />
        <DateInput
          label="Closes At"
          source="closes_at"
          defaultValue={getFutureDate(30)}
        />
        {organisation_id ? (
          <HiddenInput source="organisation_id" />
        ) : (
          <ReferenceInput reference="organisations" source="organisation_id" />
        )}
      </SimpleForm>
    </Create>
  );
};
