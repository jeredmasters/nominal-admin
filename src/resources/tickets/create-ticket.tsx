import * as React from "react";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useParams } from "react-router-dom";
import { ErrorPanel } from "../../components/error";
import { TextInput } from "../../components/simple-form";
import { SimpleCreate } from "../../components/simple-create";
import { RESOURCE } from "../../const/resources";

export const CreateTicket = () => {
  const { election_id } = useParams();

  if (!election_id) {
    return <ErrorPanel text="election_id" source="CreateTicket" />;
  }
  return (
    <TabContainer>
      <TabPanel label="New Ticket">
        <SimpleCreate resource={RESOURCE.ticket} initialValue={{ election_id }}>
          <TextInput field="first_name" sm={6} />
          <TextInput field="last_name" sm={6} />
          <TextInput field="email" />
        </SimpleCreate>
      </TabPanel>
    </TabContainer>
  );
};
