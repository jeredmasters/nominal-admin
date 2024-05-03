import { TextField, DateField, TextInput, NumberField } from "react-admin";
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
      <TextField source="label" />
      <TextField source="closes_at" />
      <NumberField source="ballot_count" title="Ballots" />
    </OrgList>
  );
};
