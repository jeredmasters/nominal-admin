import * as React from "react";

import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useLocation } from "react-router-dom";
import { ErrorPanel } from "../../components/error";
import { RESOURCE } from "../../const/resources";
import { SimpleCreate } from "../../components/simple-create";
import { Typography } from "@mui/material";
import { TextInput } from "../../components/simple-form";

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
        <AddTagForm voter_id={voter_id} />
      </TabPanel>
    </TabContainer>
  );
};

interface AddTagFormProps {
  voter_id: string;
  onClose?: () => void;
  onNewTag?: () => void;
}
export const AddTagForm = ({
  voter_id,
  onNewTag,
  onClose,
}: AddTagFormProps) => {
  const handleSuccess = () => {
    if (onClose) onClose();
    if (onNewTag) onNewTag();
  };
  return (
    <SimpleCreate
      resource={RESOURCE.voter_tag}
      initialValue={{ voter_id }}
      onSuccess={handleSuccess}
    >
      <Typography variant="h6" mb={2}>
        New Voter Tag
      </Typography>

      <TextInput field="key" />
      <TextInput field="value" />
    </SimpleCreate>
  );
};
