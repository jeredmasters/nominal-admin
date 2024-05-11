import * as React from "react";
import { SimpleForm, TextInput } from "react-admin";
import { Button } from "@mui/material";
import { CreatePanel } from "../../components/create-panel";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useLocation } from "react-router-dom";
import { HiddenInput } from "../../components/hidden-input";
import { ErrorPanel } from "../../components/error";

interface CreateVoterTagProps {
  voter_id?: string;
}
export const CreateVoterTag = ({ voter_id }: CreateVoterTagProps) => {
  const { state } = useLocation();
  if (!voter_id && state && state.voter_id) {
    voter_id = state.voter_id;
  }

  if (!voter_id) {
    return <ErrorPanel text="Must have voter_id" source="CreateVoterTag" />;
  }

  return (
    <TabContainer>
      <TabPanel label="New Voter Tag">
        <CreatePanel resource="voter-tags">
          <TextInput source="key" fullWidth isRequired />
          <TextInput source="value" fullWidth isRequired />
          <HiddenInput source="voter_id" defaultValue={voter_id} />
        </CreatePanel>
      </TabPanel>
    </TabContainer>
  );
};
