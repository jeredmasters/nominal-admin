import * as React from "react";
import { useLocation } from "react-router-dom";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { SimpleCreate } from "../../components/simple-create";
import {
  DateInput,
  SelectInput,
  TextInput,
} from "../../components/simple-form";
import { RESOURCE } from "../../const/resources";
import { useParamsOrState } from "../../util";
import { ErrorPanel } from "../../components/error";
import { List, ListItem } from "@mui/material";
import { ResourceLabel } from "../../components/resource-label";
import { ConditionInput } from "../../components/condition-editor";

export enum EMAIL_BATCH_STATUS {
  DISABLED = "DISABLED",
  ENABLED = "ENABLED",
  SENT = "SENT",
  SENDING = "SENDING",
}

export enum EMAIL_SCHEDULE {
  DRAFT = "DRAFT",
  SEND_NOW = "SEND_NOW",
  SEND_LATER = "SEND_LATER",
}

export const CreateEmailBatchPage = () => {
  const election_id = useParamsOrState("election_id");
  const { state } = useLocation();

  const voterIds = state ? state.selected : undefined;

  console.log({ state, voterIds });

  if (!election_id) {
    return (
      <ErrorPanel text="Must have election_id" source="CreateEmailBatchPage" />
    );
  }

  return (
    <TabContainer>
      <TabPanel label="Create Email Batch">
        <CreateEmailBatch election_id={election_id} voterIds={voterIds} />
      </TabPanel>
    </TabContainer>
  );
};

interface CreateEmailBatchProps {
  election_id: string;
  voterIds?: Array<string>;
}
export const CreateEmailBatch = ({
  election_id,
  voterIds,
}: CreateEmailBatchProps) => {
  return (
    <SimpleCreate
      resource={RESOURCE.email_batch}
      initialValue={{ election_id, condition: { test: "value" } }}
    >
      <SelectInput field="schedule" options={EMAIL_SCHEDULE} />

      <DateInput
        field="sent_at"
        hide={(form: any) => form.schedule !== EMAIL_SCHEDULE.SEND_LATER}
      />
      {voterIds ? (
        <VoterList voterIds={voterIds} />
      ) : (
        <ConditionInput field="condition" />
      )}
    </SimpleCreate>
  );
};

interface VoterListProps {
  voterIds: Array<string>;
}
const VoterList = ({ voterIds }: VoterListProps) => {
  return (
    <List>
      {voterIds.map((v) => (
        <ListItem key={v} disablePadding sx={{ width: "100%" }}>
          <ResourceLabel resource={RESOURCE.voter} id={v} />
        </ListItem>
      ))}
    </List>
  );
};
