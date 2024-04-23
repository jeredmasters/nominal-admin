import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  useRecordContext,
  EditButton,
  TopToolbar,
  TabbedShowLayout,
  useShowContext,
  List,
  BooleanField,
  Datagrid,
  CreateButton,
} from "react-admin";
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { IdField } from "../../components/IdField";
import { CandidateGrid } from "../candidates/datagrid-candidate";

export const ShowOrganisation = () => {
  const { id } = useParams();
  return (
    <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Organisation">
          <IdField />
          <TextField source="label" />
          <DateField source="created_at" />
          <EditButton />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Elections">
          <Button color="primary" onClick={(v) => console.log(v)}>
            New Election
          </Button>
          <List
            resource="elections"
            filter={{ organisation_id: id }}
            sort={{ field: "closes_at", order: "DESC" }}
            exporter={false}
          >
            <Datagrid rowClick="show">
              <IdField />
              <TextField source="label" />
              <DateField source="opens_at" />
              <TextField source="closes_at" />
            </Datagrid>
          </List>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Voters">
          <List
            resource="voters"
            filter={{ organisation_id: id }}
            sort={{ field: "first_name", order: "ASC" }}
            exporter={false}
            actions={
              <TopToolbar>
                <CreateButton
                  resource="voters"
                  state={{ record: { organisation_id: id } }}
                />
              </TopToolbar>
            }
          >
            <Datagrid rowClick="show">
              <IdField />
              <TextField source="first_name" />
              <TextField source="last_name" />
            </Datagrid>
          </List>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Candidates">
          <List
            resource="candidates"
            filter={{ organisation_id: id }}
            sort={{ field: "label", order: "ASC" }}
            exporter={false}
          >
            <CandidateGrid />
          </List>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
