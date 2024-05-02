import {
  Show,
  TextField,
  EditButton,
  TabbedShowLayout,
  useRecordContext,
  ReferenceField,
  Link,
} from "react-admin";
import { useParams } from "react-router-dom";
import { IdField } from "../../components/IdField";
import { useContext } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { AuthContext } from "../../context/auth.provider";
import { Button } from "@mui/material";

export const ShowEmailToken = () => {
  const { id } = useParams();

  if (!id) {
    return "ERROR";
  }

  return (
    <Show aside={<Aside />} actions={false}>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Email Token">
          <IdField />
          <TextField source="status" />
          <ReferenceField source="voter_id" reference="voters" />
          <ReferenceField source="election_id" reference="elections" />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};

const Aside = () => {
  const record = useRecordContext();
  const { config } = useContext(AuthContext);

  return (
    <div style={{ width: 200, margin: "1em" }}>
      <EditButton />
      <br />
      <br />

      {config ? (
        <Button
          href={config.consumer_fe_url + "/email-token#" + record.id}
          target="_blank"
        >
          <OpenInNewIcon />
          Open Link
        </Button>
      ) : null}
    </div>
  );
};
