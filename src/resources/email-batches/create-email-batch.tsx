import * as React from "react";
import { useLocation } from "react-router-dom";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { SimpleCreate } from "../../components/simple-create";
import {
  DateInput,
  DateTimeInput,
  SelectInput,
  TextInput,
} from "../../components/simple-form";
import { RESOURCE } from "../../const/resources";
import { useParamsOrState } from "../../util";
import { ErrorPanel } from "../../components/error";
import { ConditionInput } from "../../components/condition-editor";
import { CONDITION_TYPE } from "../../domain/conditions";
import { EMAIL_SCHEDULE } from "../../domain/emails";
import { EMAIL_BATCH_STATUS } from "./edit-email-batch";
import { ModalContext } from "../../context/modal.provider";

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
  const { setModal } = React.useContext(ModalContext);
  const handleBeforeSubmit = (form: any, submit: (form: any) => void) => {
    console.log("handleBeforeSubmit", form);
    if (form.status === EMAIL_BATCH_STATUS.ENABLED) {
      setModal({
        title: "Send Emails Now?",
        text: `By saving a batch with status = ${EMAIL_BATCH_STATUS.ENABLED}, the system will send the batch immediately after save. Change to ${EMAIL_BATCH_STATUS.DRAFT} if you do not with to send now.`,
        onConfim: () => submit(form),
      });
    }
  };
  const statusHelperText = ({ status, schedule }: any) => {
    switch (status) {
      case EMAIL_BATCH_STATUS.DRAFT:
        return "DRAFT batches will never send. You must change the status to ENABLED for any emails to be sent.";
      case EMAIL_BATCH_STATUS.ENABLED:
        if (schedule === EMAIL_SCHEDULE.SEND_NOW) {
          return "ENABLED batches will send immediately after saving.";
        }
        return "ENABLED batches will be sent at the scheduled time.";
    }
  };
  return (
    <SimpleCreate
      resource={RESOURCE.email_batch}
      onBeforeSubmit={handleBeforeSubmit}
      initialValue={{
        election_id,
        status: EMAIL_BATCH_STATUS.DRAFT,
        schedule: EMAIL_SCHEDULE.SEND_NOW,
        where: voterIds
          ? {
              type: CONDITION_TYPE.PROP_EQUALS,
              value: voterIds.join("\n"),
              split_lines: true,
            }
          : undefined,
      }}
    >
      <SelectInput
        field="status"
        options={EMAIL_BATCH_STATUS}
        helperText={statusHelperText}
      />
      <SelectInput field="schedule" options={EMAIL_SCHEDULE} />

      <DateTimeInput
        field="sent_at"
        hide={(form: any) => form.schedule !== EMAIL_SCHEDULE.SEND_LATER}
      />

      <ConditionInput field="where" />
    </SimpleCreate>
  );
};
