import { TextField } from "react-admin";
import { OrgList } from "../../components/org-list";
import { IdField } from "../../components/IdField";

export interface ListBallots {
  election_id?: string;
}
export const ListBallots = ({ election_id }: ListBallots) => {
  return (
    <OrgList
      title="Ballots"
      resource="ballots"
      perPage={100}
      filter={{ election_id }}
    >
      <IdField />
      <TextField source="label" />
    </OrgList>
  );
};
