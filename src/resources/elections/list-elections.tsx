import { TextField, DateField, TextInput } from "react-admin";
import { OrgList } from "../../components/org-list";
import { IdField } from "../../components/IdField";

export const ListElections = () => {
  return (
    <OrgList
      resource="elections"
      perPage={100}
      filters={[<TextInput label="Label" source="label" alwaysOn />]}
    >
      <IdField />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <DateField source="created_at" />
    </OrgList>
  );
};
