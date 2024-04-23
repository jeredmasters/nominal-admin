import {
  Show,
  TextField,
  DateField,
  useRecordContext,
  EditButton,
  TopToolbar,
  TabbedShowLayout,
  List,
  CreateButton,
  useGetOne,
} from "react-admin";
import { useParams } from "react-router-dom";
import { IdField } from "../../components/IdField";
import { CandidateGrid } from "../candidates/datagrid-candidate";
import { VoterGrid } from "../voters/datagrid-voter";

export const ShowElection = () => {
  const { id } = useParams();
  const {
    data: election,
    isLoading,
    error,
  } = useGetOne("elections", { id: id });

  return (
    <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Election">
          <IdField />
          <TextField source="label" />
          <DateField source="created_at" />
          <EditButton />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Candidates">
          <List
            resource="candidates"
            filter={{ election_id: id }}
            sort={{ field: "label", order: "ASC" }}
            exporter={false}
            empty={
              <CreateButton
                resource="candidates"
                state={{
                  record: {
                    election_id: id,
                    organisation_id: election ? election.organisation_id : null,
                  },
                }}
              />
            }
            actions={
              <CreateButton
                resource="candidates"
                state={{
                  record: {
                    election_id: id,
                    organisation_id: election ? election.organisation_id : null,
                  },
                }}
              />
            }
          >
            <CandidateGrid />
          </List>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Voters">
          <List
            resource="voters"
            filter={{ election_id: id }}
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
            <VoterGrid />
          </List>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
