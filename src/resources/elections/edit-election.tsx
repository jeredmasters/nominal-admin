import * as React from "react";
import { useLocation } from "react-router-dom";
import { SimpleCreate } from "../../components/simple-create";
import {
  DateInput,
  SelectInput,
  TextInput,
} from "../../components/simple-form";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useParams } from "react-router-dom";
import { SimpleEdit } from "../../components/simple-edit";
import { ErrorPanel } from "../../components/error";
import { ELECTION_MODE, ELECTION_STATUS } from "../../const/elections";
import { RESOURCE } from "../../const/resources";

export const EditElectionPage = () => {
  const { election_id } = useParams();
  if (!election_id) {
    return <ErrorPanel text="Must have election_id" source="EditElection" />;
  }
  return (
    <TabContainer>
      <TabPanel label="Edit Election">
        <EditElection election_id={election_id} />
      </TabPanel>
    </TabContainer>
  );
};

interface EditElectionProps {
  election_id: string;
}
export const EditElection = ({ election_id }: EditElectionProps) => {
  return (
    <SimpleEdit resource={RESOURCE.election} id={election_id}>
      <TextInput field="label" sm={12} md={4} />
      <SelectInput field="status" md={4} sm={6} options={ELECTION_STATUS} />
      <SelectInput field="mode" md={4} sm={6} options={ELECTION_MODE} />
      <DateInput label="Opens At" field="opens_at" sm={6} />
      <DateInput label="Closes At" field="closes_at" sm={6} />

      <TextInput
        field="short_description"
        multiline={4}
        label="Short description"
        xs={12}
      />
    </SimpleEdit>
  );
};
