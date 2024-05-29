import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { ListEmailTokens } from "../email-tokens/list-email-tokens";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { ShowSimple } from "../../components/show-blob";
import { AuthContext } from "../../context/auth.provider";
import { SimpleTable } from "../../components/simple-table";
import { ErrorPanel } from "../../components/error";
import { RESOURCE } from "../../const/resources";
import { ListTicketMessages } from "./list-ticket-messages";

export const ShowTicketPage = () => {
  const { ticket_id } = useParams();
  if (!ticket_id) {
    return <ErrorPanel text="Must have ticket_id" source="ShowTicket" />;
  }

  return (
    <TabContainer>
      <TabPanel label="Ticket">
        <hr />
        <ShowTicket ticket_id={ticket_id} />
        <hr />
        <ListTicketMessages ticket_id={ticket_id} />
      </TabPanel>
    </TabContainer>
  );
};

interface ShowTicketProps {
  ticket_id: string;
}
export const ShowTicket = ({ ticket_id }: ShowTicketProps) => {
  const { fetch } = useContext(AuthContext);
  if (!fetch) {
    return <ErrorPanel text="Must have auth fetch" source="ShowTicket" />;
  }

  const handleSend = () => {
    fetch(`/tickets/${ticket_id}/send_invite`, {
      method: "post",
      body: { replace_token: true },
    });
  };
  return (
    <ShowSimple
      resource={RESOURCE.ticket}
      id={ticket_id}
      keys={[
        "created_at",
        "reason",
        "admin_summary",
        "admin_description",
        "voter_summary",
        "voter_description",
      ]}
      buttons={[
        {
          label: "Send Invite",
          icon: <MailOutlineIcon />,
          func: handleSend,
          confirm: true,
        },
      ]}
    />
  );
};
