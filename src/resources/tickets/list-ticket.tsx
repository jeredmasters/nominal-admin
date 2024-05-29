import { useContext } from "react";
import { SimpleTable } from "../../components/simple-table";
import { AuthContext } from "../../context/auth.provider";
import { RESOURCE } from "../../const/resources";
import { useParams } from "react-router-dom";
import { ErrorPanel } from "../../components/error";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useCreatePath } from "../../util";

export const ListTicketsPage = () => {
  const { election_id } = useParams();
  if (!election_id) {
    return <ErrorPanel text="Must have election_id" source="ListTicketsPage" />;
  }
  return (
    <TabContainer>
      <TabPanel label="Tickets">
        <ListTickets election_id={election_id} />
      </TabPanel>
    </TabContainer>
  );
};

export interface ListTicketsProps {
  election_id: string;
  voter_id?: string;
}
export const ListTickets = ({ election_id, voter_id }: ListTicketsProps) => {
  const { fetch } = useContext(AuthContext);
  const createPath = useCreatePath(RESOURCE.email_batch);

  return (
    <SimpleTable
      resource={RESOURCE.ticket}
      filter={{ election_id }}
      columns={["reason", "admin_summary"]}
    />
  );
};
