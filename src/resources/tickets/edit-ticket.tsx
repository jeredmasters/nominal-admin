import * as React from "react";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useParams } from "react-router-dom";
import { SimpleEdit } from "../../components/simple-edit";
import { ErrorPanel } from "../../components/error";
import { TextInput } from "../../components/simple-form";
import { RESOURCE } from "../../const/resources";

export const EditTicket = () => {
  const { ticket_id } = useParams();
  if (!ticket_id) {
    return <ErrorPanel text="Must have ticket_id" source="EditTicket" />;
  }
  return (
    <TabContainer>
      <TabPanel label="Edit Ticket">
        <SimpleEdit resource={RESOURCE.ticket} id={ticket_id}>
          <TextInput field="title" sm={2} />
          <TextInput field="first_name" sm={5} />
          <TextInput field="last_name" sm={5} />
          <TextInput field="email" sm={12} />
        </SimpleEdit>
      </TabPanel>
    </TabContainer>
  );
};
