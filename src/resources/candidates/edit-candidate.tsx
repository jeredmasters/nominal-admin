import * as React from "react";
import { useParams } from "react-router-dom";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { ErrorPanel } from "../../components/error";
import { SimpleEdit } from "../../components/simple-edit";
import { SelectInput, TextInput } from "../../components/simple-form";

const choices = [
  {
    value: "NOMINATED",
    label: "NOMINATED",
  },
  {
    value: "VERIFIED",
    label: "VERIFIED",
  },
  {
    value: "REVIEWED",
    label: "REVIEWED",
  },
  {
    value: "APPROVED",
    label: "APPROVED",
  },
  {
    value: "REJECTED",
    label: "REJECTED",
  },
];
export const EditCandidate = () => {
  const { candidate_id } = useParams();
  if (!candidate_id) {
    return <ErrorPanel text="Must have candidate_id" source="EditCandidate" />;
  }
  return (
    <TabContainer>
      <TabPanel label="Edit Candidate">
        <SimpleEdit resource="candidates" id={candidate_id}>
          <TextInput field="title" />
          <TextInput field="first_name" />
          <TextInput field="last_name" />
          <TextInput field="email" />
          <SelectInput field="status" options={choices} />
        </SimpleEdit>
      </TabPanel>
    </TabContainer>
  );
};
