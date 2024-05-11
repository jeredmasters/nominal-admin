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
import { SimpleCreate } from "../../components/simple-create";
import { TextInput } from "../../components/simple-form";

export const ShowVoter = () => {
  const { voter_id } = useParams();
  const { fetch } = useContext(AuthContext);
  if (!voter_id) {
    return <ErrorPanel text="Must have voter_id" source="ShowVoter" />;
  }
  if (!fetch) {
    return <div>MUST HAVE AUTH</div>;
  }

  const handleSend = () => {
    fetch(`/voters/${voter_id}/send_invite`, {
      method: "post",
      body: { replace_token: true },
    });
  };
  const handleNewTag = () => {
    console.log("TODO: refresh table");
  };
  return (
    <TabContainer>
      <TabPanel label="Voter">
        <hr />
        <ShowSimple
          resource="voters"
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
        <hr />
        <SimpleTable
          resource="voter-tags"
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

interface AddTagFormProps {
  voter_id: string;
  onClose: () => void;
  onNewTag: () => void;
}
export const AddTagForm = ({
  voter_id,
  onNewTag,
  onClose,
}: AddTagFormProps) => {
  const handleSuccess = () => {
    onClose();
    onNewTag();
  };
  return (
    <SimpleCreate
      resource="voter-tags"
      initialValue={{ voter_id }}
      onSuccess={handleSuccess}
    >
      <Typography variant="h6" mb={2}>
        New Voter Tag
      </Typography>

      <TextInput field="key" />
      <TextInput field="value" />
    </SimpleCreate>
  );
};
