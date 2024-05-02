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
import { ListVoters } from "../voters/list-voter";
import { ListBallots } from "../ballots/list-ballots";

export const ShowElection = () => {
  const { id } = useParams();
  return (
    <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Election">
          <IdField />
          <TextField source="label" />
          <DateField source="created_at" />
          <EditButton />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Ballots">
          <ListBallots election_id={id} />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Voters">
          <ListVoters election_id={id} />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
