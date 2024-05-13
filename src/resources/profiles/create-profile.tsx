import * as React from "react";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useLocation } from "react-router-dom";
import { SimpleCreate } from "../../components/simple-create";
import { TextInput } from "../../components/simple-form";
import { ErrorPanel } from "../../components/error";
import { RESOURCE } from "../../const/resources";

export const CreateProfile = () => {
  const { state } = useLocation();
  const { candidate_id } = state;

  if (!candidate_id) {
    return <ErrorPanel text="Must have candidate_id" source="CreateProfile" />;
  }

  return (
    <TabContainer>
      <TabPanel label="New Profile">
        <SimpleCreate resource={RESOURCE.profile} initialValue={state}>
          <TextInput
            field="preferred_name"
            helperText="(Optional) Overrides how the name is displayed on the ballot"
          />
          <TextInput field="statement" multiline={4} />
        </SimpleCreate>
      </TabPanel>
    </TabContainer>
  );
};
