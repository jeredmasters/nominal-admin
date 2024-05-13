import * as React from "react";
import { useLocation } from "react-router-dom";
import { SimpleCreate } from "../../components/simple-create";
import {
  DateInput,
  SelectInput,
  TextInput,
} from "../../components/simple-form";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { ELECTION_MODE, ELECTION_STATUS } from "../../const/elections";
import { RESOURCE } from "../../const/resources";
import { useParamsOrState } from "../../util";
import { ErrorPanel } from "../../components/error";

const getFutureDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export const CreateElectionPage = () => {
  const organisation_id = useParamsOrState("organisation_id");

  if (!organisation_id) {
    return (
      <ErrorPanel
        text="Must have organisation_id"
        source="CreateElectionPage"
      />
    );
  }
  return (
    <TabContainer>
      <TabPanel label="Create Election"></TabPanel>
    </TabContainer>
  );
};

interface CreateElectionProps {
  organisation_id: string;
}
export const CreateElection = ({ organisation_id }: CreateElectionProps) => {
  return (
    <SimpleCreate
      resource={RESOURCE.election}
      initialValue={{ organisation_id }}
    >
      <TextInput field="label" sm={8} />
      <SelectInput
        field="status"
        sm={4}
        options={ELECTION_STATUS}
        defaultValue={ELECTION_STATUS.DRAFT}
      />
      <SelectInput
        field="mode"
        sm={4}
        options={ELECTION_MODE}
        defaultValue={ELECTION_MODE.MANUAL}
      />
      <DateInput
        label="Opens At"
        field="opens_at"
        defaultValue={new Date()}
        sm={6}
      />
      <DateInput
        label="Closes At"
        field="closes_at"
        defaultValue={getFutureDate(30)}
        sm={6}
      />
      <TextInput
        field="short_description"
        multiline={4}
        label="Short description"
        xs={12}
      />
    </SimpleCreate>
  );
};
