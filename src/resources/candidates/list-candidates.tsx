import { OrgList } from "../../components/org-list";
import { TextField } from "react-admin";
import { IdField } from "../../components/IdField";

interface ListCandidatesProps {
  ballot_id?: string;
}
export const ListCandidates = ({ ballot_id }: ListCandidatesProps) => {
  return (
    <OrgList resource="candidates" perPage={100} filter={{ ballot_id }}>
      <IdField />
      <TextField source="label" />
    </OrgList>
  );
};
