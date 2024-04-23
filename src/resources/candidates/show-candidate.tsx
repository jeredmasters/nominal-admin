import {
  Show,
  TextField,
  DateField,
  EditButton,
  TabbedShowLayout,
  ListBase,
  ReferenceField,
} from "react-admin";
import { useParams } from "react-router-dom";
import { IdField } from "../../components/IdField";
import { ElectionGrid } from "../elections/datagrid-election";

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
          <ListBase
            resource="elections"
            filter={{ candidate_id: id }}
            sort={{ field: "closes_at", order: "DESC" }}
            exporter={false}
          >
            <ElectionGrid />
          </ListBase>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
