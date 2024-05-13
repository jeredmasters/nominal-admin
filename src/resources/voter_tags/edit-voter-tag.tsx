import * as React from "react";

import { EditPanel } from "../../components/edit-panel";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useParams } from "react-router-dom";
import { SimpleCreate } from "../../components/simple-create";
import { useGetOne } from "../../context/data.provider";
import { RESOURCE } from "../../const/resources";
import { TextInput } from "../../components/simple-form";
import { Typography } from "@mui/material";
import { ErrorPanel } from "../../components/error";

export const EditVoterTag = () => {
  const { voter_id } = useParams();
  if (!voter_id) {
    return <ErrorPanel text="Must have voter_id" source="EditVoterTag" />;
  }
  const { data: voter } = useGetOne(RESOURCE.voter, voter_id);

  return (
    <TabContainer>
      <TabPanel label="Edit Voter">
        <EditTagForm voter_id={voter_id} />
      </TabPanel>
    </TabContainer>
  );
};

interface EditTagFormProps {
  voter_id: string;
  onClose?: () => void;
  onNewTag?: () => void;
}
export const EditTagForm = ({
  voter_id,
  onNewTag,
  onClose,
}: EditTagFormProps) => {
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
