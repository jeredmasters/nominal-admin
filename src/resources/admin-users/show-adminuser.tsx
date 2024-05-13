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

export const ShowAdminUser = () => {
  const { id } = useParams();
  return (
    <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="AdminUser">
          <IdField />
          <TextField source="label" />
          <DateField source="created_at" />
          <ReferenceField
            source="organisation_id"
            reference=RESOURCE.organisation
            link="show"
          />
          <EditButton />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
