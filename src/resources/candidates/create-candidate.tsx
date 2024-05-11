import * as React from "react";
import { useLocation } from "react-router-dom";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { SimpleCreate } from "../../components/simple-create";
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
export const CreateCandidate = () => {
  const { state } = useLocation();
  return (
    <TabContainer>
      <TabPanel label="Create Candidate">
        <SimpleCreate resource="candidates" initialValue={state}>
          <TextInput field="title" />

          <TextInput field="first_name" />
          <TextInput field="last_name" />

          <TextInput field="email" />
          <SelectInput field="status" options={choices} />
        </SimpleCreate>
      </TabPanel>
    </TabContainer>
  );
};
