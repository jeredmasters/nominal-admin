import { SimpleTable } from "../../components/simple-table";
import { RESOURCE } from "../../const/resources";

export interface ListTicketsProps {
  ticket_id: string;
}
export const ListTicketMessages = ({ ticket_id }: ListTicketsProps) => {
  return (
    <SimpleTable
      resource={RESOURCE.ticket_messages}
      filter={{ ticket_id }}
      columns={["created_at", "content"]}
    />
  );
};
