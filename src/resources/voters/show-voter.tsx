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
  useRecordContext,
  useGetOne,
  NumberField,
} from "react-admin";
import { useParams } from "react-router-dom";
import { IdField } from "../../components/IdField";
import { Box, Button, Typography, Modal, Grid } from "@mui/material";
import { useState } from "react";
import { CreateModal } from "../../components/create-modal";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import CheckIcon from "@mui/icons-material/Check";
import { httpClientAuth } from "../../app/dataProvider";
import { getFormData } from "../../util";
import { ListEmailTokens } from "../email-tokens/list-email-tokens";
import { ShowButton } from "../../components/show-button";
import { OrgList } from "../../components/org-list";

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
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};
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
      resource="enrollments"
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

const SendInviteButton = ({ voter_id }: { voter_id: string }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [sent, setSent] = useState(false);
  const { enrollment_id } = useRecordContext();
  const { data: voter } = useGetOne("voters", { id: voter_id });

  const handleSend = () => {
    httpClientAuth(`/enrollments/${enrollment_id}/send_invite`, {
      method: "post",
      body: getFormData({ replace_token: true }),
    }).then((response) => {
      setSent(true);
    });
  };

  return (
    <>
      <Button onClick={() => setModal(true)} type="button" disabled={sent}>
        {sent ? (
          <>
            Sent! <CheckIcon />
          </>
        ) : (
          <>
            Send Invite <ForwardToInboxIcon />
          </>
        )}
      </Button>
      {modal ? (
        <Modal open={true} onClose={() => setModal(false)}>
          <Box sx={style}>
            <Grid container>
              <Grid item xs={12} mb={4}>
                <Typography id="modal-modal-title" variant="h6">
                  {sent ? "sent!" : "Send invite to user?"}
                </Typography>
              </Grid>
              <Grid item xs={12} mb={4}>
                <Typography variant="subtitle1">{voter.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                {!sent ? (
                  <Button variant="contained" onClick={handleSend}>
                    Send
                  </Button>
                ) : null}
                <Button variant="outlined" onClick={() => setModal(false)}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      ) : null}
    </>
  );
};

export const ShowVoter = () => {
  const [enrolModal, setEnrolModal] = useState<boolean>(false);

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
          <OrgList
            resource="voter-tags"
            perPage={100}
            filter={{ voter_id: id }}
            omitOrgFilter={true}
          >
            <TextField source="key" />
            <TextField source="value" />
          </OrgList>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Elections">
          <List
            resource="elections"
            filter={{ voter_id: id }}
            sort={{ field: "closes_at", order: "DESC" }}
            exporter={false}
            empty={<Empty onClick={() => setEnrolModal(true)} />}
            actions={
              <TopToolbar>
                <Button onClick={() => setEnrolModal(true)}>Enroll</Button>
              </TopToolbar>
            }
          >
            <Datagrid>
              <IdField />
              <TextField source="label" />
              <DateField source="opens_at" />
              <TextField source="closes_at" />
              <NumberField source="ballot_count" label="Ballots" />
              <NumberField source="running_count" label="Candidates" />

              <ShowButton />
              <SendInviteButton voter_id={id} />
            </Datagrid>
          </List>
          <EnrollModal
            voter_id={id}
            open={enrolModal}
            onClose={() => setEnrolModal(false)}
          />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Email Tokens">
          <ListEmailTokens voter_id={id} />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
