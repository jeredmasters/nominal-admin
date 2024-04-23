import {
  Show,
  TextField,
  DateField,
  EditButton,
  TopToolbar,
  TabbedShowLayout,
  List,
  Datagrid,
  ReferenceInput,
  TextInput,
  ListBase,
} from "react-admin";
import { useParams } from "react-router-dom";
import { IdField } from "../../components/IdField";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { CreateModal } from "../../components/create-modal";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

const Empty = ({ onClick }: { onClick: () => void }) => (
  <Box textAlign="center" m={1}>
    <Typography variant="h5" paragraph>
      Not enrolled in any elections
    </Typography>
    <Button variant="contained" onClick={onClick}>
      Enroll
    </Button>
  </Box>
);

const EnrollModal = ({
  voter_id,
  open,
  onClose,
}: {
  voter_id: string;
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <CreateModal
      redirect={`/voters/${voter_id}/show/1`}
      title="Enroll Voter"
      open={open}
      onClose={onClose}
    >
      <TextInput
        source="voter_id"
        defaultValue={voter_id}
        disabled={true}
        hidden={true}
      />
      <ReferenceInput source="election_id" reference="elections" />
    </CreateModal>
  );
};

export const ShowVoter = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { id } = useParams();

  if (!id) {
    return "ERROR";
  }

  return (
    <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Voter">
          <IdField />
          <TextField source="first_name" />
          <TextField source="last_name" />
          <TextField source="email" />
          <DateField source="created_at" />
          <EditButton />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Elections">
          <List
            resource="elections"
            filter={{ voter_id: id }}
            sort={{ field: "closes_at", order: "DESC" }}
            exporter={false}
            empty={<Empty onClick={() => setOpenModal(true)} />}
            actions={
              <TopToolbar>
                <Button onClick={() => setOpenModal(true)}>Enroll</Button>
              </TopToolbar>
            }
          >
            <Datagrid rowClick="show">
              <IdField />
              <TextField source="label" />
              <DateField source="opens_at" />
              <TextField source="closes_at" />
              <Button onClick={() => console.log("Asdf")}>
                Send Invite <ForwardToInboxIcon />
              </Button>
            </Datagrid>
          </List>
          <EnrollModal
            voter_id={id}
            open={openModal}
            onClose={() => setOpenModal(false)}
          />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Email Tokens">
          <ListBase
            resource="email-tokens"
            filter={{ voter_id: id }}
            sort={{ field: "created_at", order: "DESC" }}
            exporter={false}
          >
            <Datagrid rowClick="show">
              <IdField />
              <DateField source="created_at" />
              <TextField source="status" />
            </Datagrid>
          </ListBase>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
