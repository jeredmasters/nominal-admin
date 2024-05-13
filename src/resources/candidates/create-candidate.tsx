import * as React from "react";
import { useParams } from "react-router-dom";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { ErrorPanel } from "../../components/error";
import { SelectInput, TextInput } from "../../components/simple-form";
import { RESOURCE } from "../../const/resources";
import { SimpleCreate } from "../../components/simple-create";
export enum CANDIDATE_STATUS {
  NOMINATED = "NOMINATED",
  VERIFIED = "VERIFIED",
  REVIEWED = "REVIEWED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export const CreateCandidatePage = () => {
  const { election_id } = useParams();
  if (!election_id) {
    return (
      <ErrorPanel text="Must have candidate_id" source="CreateCandidate" />
    );
  }
  return (
    <TabContainer>
      <TabPanel label="Create Candidate">
        <CreateCandidate election_id={election_id} />
      </TabPanel>
    </TabContainer>
  );
};

interface CreateCandidateProps {
  election_id: string;
}
export const CreateCandidate = ({ election_id }: CreateCandidateProps) => {
  return (
    <SimpleCreate resource={RESOURCE.candidate} initialValue={election_id}>
      <TextInput field="title" />
      <TextInput field="first_name" />
      <TextInput field="last_name" />
      <TextInput field="email" />
      <SelectInput field="status" options={CANDIDATE_STATUS} />
    </SimpleCreate>
  );
};
