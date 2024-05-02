import {
  Show,
  TextField,
  DateField,
  TabbedShowLayout,
  ListBase,
  ReferenceField,
} from "react-admin";
import { useParams } from "react-router-dom";
import { IdField } from "../../components/IdField";
import { EditButton } from "../../components/edit-button";
import { ListElections } from "../elections/list-elections";

export const ShowCandidate = () => {
  const { id } = useParams();
  return (
    <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Candidate">
          <IdField />
          <TextField source="label" />
          <DateField source="created_at" />
          <ReferenceField
            source="organisation_id"
            reference="organisations"
            link="show"
          />
          <EditButton />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Elections">
          <ListElections />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
