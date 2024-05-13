import * as React from "react";
import { useParams } from "react-router-dom";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { ErrorPanel } from "../../components/error";
import { SimpleEdit } from "../../components/simple-edit";
import { SelectInput, TextInput } from "../../components/simple-form";
import { RESOURCE } from "../../const/resources";
export enum CANDIDATE_STATUS {
  NOMINATED = "NOMINATED",
  VERIFIED = "VERIFIED",
  REVIEWED = "REVIEWED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export const EditCandidatePage = () => {
  const { candidate_id } = useParams();
  if (!candidate_id) {
    return <ErrorPanel text="Must have candidate_id" source="EditCandidate" />;
  }
  return (
    <TabContainer>
      <TabPanel label="Edit Candidate">
        <EditCandidate candidate_id={candidate_id} />
      </TabPanel>
    </TabContainer>
  );
};

interface EditCandidateProps {
  candidate_id: string;
}
export const EditCandidate = ({ candidate_id }: EditCandidateProps) => {
  return (
    <SimpleEdit resource={RESOURCE.candidate} id={candidate_id}>
      <TextInput field="title" />
      <TextInput field="first_name" />
      <TextInput field="last_name" />
      <TextInput field="email" />
      <SelectInput field="status" options={CANDIDATE_STATUS} />
    </SimpleEdit>
  );
};
