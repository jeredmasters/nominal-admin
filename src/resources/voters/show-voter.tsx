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
import { AddTagForm } from "../voter_tags/create-voter-tag";

export const ShowVoterPage = () => {
  const { voter_id } = useParams();
  if (!voter_id) {
    return <ErrorPanel text="Must have voter_id" source="ShowVoter" />;
  }

  const handleNewTag = () => {
    console.log("TODO: refresh table");
  };
  return (
    <TabContainer>
      <TabPanel label="Voter">
        <hr />
        <ShowVoter voter_id={voter_id} />
        <hr />
        <SimpleTable
          resource={RESOURCE.voter_tag}
          filter={{ voter_id }}
          columns={["key", "value"]}
          buttons={[
            {
              label: "Add Tag",
              modal: (onClose) => (
                <AddTagForm
                  onClose={onClose}
                  voter_id={voter_id}
                  onNewTag={handleNewTag}
                />
              ),
            },
          ]}
          onRowClick={false}
        />
      </TabPanel>
      <TabPanel label="Email Tokens">
        <ListEmailTokens voter_id={voter_id} />
      </TabPanel>
    </TabContainer>
  );
};

interface ShowVoterProps {
  voter_id: string;
}
export const ShowVoter = ({ voter_id }: ShowVoterProps) => {
  const { fetch } = useContext(AuthContext);
  if (!fetch) {
    return <ErrorPanel text="Must have auth fetch" source="ShowVoter" />;
  }

  const handleSend = () => {
    fetch(`/voters/${voter_id}/send_invite`, {
      method: "post",
      body: { replace_token: true },
    });
  };
  return (
    <ShowSimple
      resource={RESOURCE.voter}
      id={voter_id}
      keys={["first_name", "last_name", "email"]}
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
