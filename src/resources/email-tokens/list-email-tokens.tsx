import {
  DateField,
  List,
  SearchInput,
  TextField,
  TextInput,
} from "react-admin";
import { OrgList } from "../../components/org-list";
import { IdField } from "../../components/IdField";

export interface ListEmailTokensProps {
  voter_id?: string;
}
export const ListEmailTokens = ({ voter_id }: ListEmailTokensProps) => {
  return (
    <OrgList resource="email-tokens" perPage={100} filter={{ voter_id }}>
      <IdField />
      <DateField source="created_at" />
      <TextField source="status" />
    </OrgList>
  );
};
