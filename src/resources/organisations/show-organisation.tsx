import {
  Show,
  TextField,
  DateField,
  EditButton,
  TabbedShowLayout,
} from "react-admin";
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { IdField } from "../../components/IdField";
import { ListVoters } from "../voters/list-voter";
import { OrgList } from "../../components/org-list";
import { ListCandidates } from "../candidates/list-candidates";
import { ListElections } from "../elections/list-elections";

export const ShowOrganisation = () => {
  const { organisation_id } = useParams();
  return (
    <Show resource="organisations" id={organisation_id}>
      <TabbedShowLayout syncWithLocation={false}>
        <TabbedShowLayout.Tab label="Organisation">
          <IdField />
          <TextField source="label" />
          <DateField source="created_at" />
          <EditButton />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Elections">
          <ListElections />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Voters">
          <ListVoters />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Candidates">
          <ListCandidates />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
