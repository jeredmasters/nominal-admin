import * as React from "react";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useParams } from "react-router-dom";
import { SimpleEdit } from "../../components/simple-edit";
import { ErrorPanel } from "../../components/error";
import { TextInput } from "../../components/simple-form";

export const EditVoter = () => {
  const { voter_id } = useParams();
  if (!voter_id) {
    return <ErrorPanel text="Must have voter_id" source="EditVoter" />;
  }
  return (
    <TabContainer>
      <TabPanel label="Edit Voter">
        <SimpleEdit resource="voters" id={voter_id}>
          <TextInput field="title" sm={2} />
          <TextInput field="first_name" sm={5} />
          <TextInput field="last_name" sm={5} />
          <TextInput field="email" sm={12} />
        </SimpleEdit>
      </TabPanel>
    </TabContainer>
  );
};
