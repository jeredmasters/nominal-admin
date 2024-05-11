import * as React from "react";
import { Button } from "@mui/material";
import { CreatePanel } from "../../components/create-panel";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useParams } from "react-router-dom";
import { HiddenInput } from "../../components/hidden-input";
import { ErrorPanel } from "../../components/error";
import { TextInput } from "../../components/simple-form";
import { SimpleCreate } from "../../components/simple-create";

export const CreateVoter = () => {
  const { election_id } = useParams();

  if (!election_id) {
    return <ErrorPanel text="election_id" source="CreateVoter" />;
  }
  return (
    <TabContainer>
      <TabPanel label="New Voter">
        <SimpleCreate resource="voters" initialValue={{ election_id }}>
          <TextInput field="first_name" sm={6} />
          <TextInput field="last_name" sm={6} />
          <TextInput field="email" />
        </SimpleCreate>
      </TabPanel>
    </TabContainer>
  );
};
