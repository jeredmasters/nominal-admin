import * as React from "react";
import { useLocation } from "react-router-dom";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { SelectInput, TextInput } from "../../components/simple-form";
import { RESOURCE } from "../../const/resources";
import { useParamsOrState } from "../../util";
import { ErrorPanel } from "../../components/error";
import { SimpleEdit } from "../../components/simple-edit";

export enum EMAIL_BATCH_STATUS {
  DISABLED = "DISABLED",
  ENABLED = "ENABLED",
  SENT = "SENT",
}

export const EditEmailBatchPage = () => {
  const email_batch_id = useParamsOrState("email_batch_id");
  const { state } = useLocation();

  const voter_ids = state ? state.voter_ids : undefined;

  if (!email_batch_id) {
    return (
      <ErrorPanel text="Must have email_batch_id" source="EditEmailBatchPage" />
    );
  }

  return (
    <TabContainer>
      <TabPanel label="Edit Email Batch">
        <EditEmailBatch email_batch_id={email_batch_id} />
      </TabPanel>
    </TabContainer>
  );
};

interface EditEmailBatchProps {
  email_batch_id: string;
}
export const EditEmailBatch = ({ email_batch_id }: EditEmailBatchProps) => {
  const { state } = useLocation();
  return (
    <SimpleEdit resource={RESOURCE.email_batch} id={email_batch_id}>
      <TextInput field="voter_ids" />
      <SelectInput field="status" options={EMAIL_BATCH_STATUS} />
    </SimpleEdit>
  );
};
