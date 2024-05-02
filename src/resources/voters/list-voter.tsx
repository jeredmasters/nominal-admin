import {
  DateField,
  List,
  SearchInput,
  TextField,
  TextInput,
} from "react-admin";
import { OrgList } from "../../components/org-list";
import { IdField } from "../../components/IdField";

export interface ListVotersProps {
  election_id?: string;
}
export const ListVoters = ({ election_id }: ListVotersProps) => {
  return (
    <OrgList
      resource="voters"
      perPage={100}
      filters={[
        <SearchInput source="q" alwaysOn />,
        <TextInput label="Email" source="email" alwaysOn />,
      ]}
      filter={{ election_id }}
    >
      <IdField />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <DateField source="created_at" />
    </OrgList>
  );
};
