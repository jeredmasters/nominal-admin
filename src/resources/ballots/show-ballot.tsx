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
import { ListCandidates } from "../candidates/list-candidates";

export const ShowBallot = () => {
  const { id } = useParams();

  return (
    <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Ballot">
          <IdField />
          <TextField source="label" />
          <DateField source="created_at" />
          <EditButton />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Candidates">
          <ListCandidates ballot_id={id} />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
