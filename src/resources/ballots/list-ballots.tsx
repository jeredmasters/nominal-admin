import { TextField } from "react-admin";
import { ListPanel } from "../../components/list-panel";
import { IdField } from "../../components/IdField";

export interface ListBallots {
  election_id?: string;
  candidate_id?: string;
}
export const ListBallots = ({ election_id, candidate_id }: ListBallots) => {
  return (
    <ListPanel
      title="Ballots"
      resource="ballots"
      perPage={100}
      filter={{ election_id, candidate_id }}
    >
      <IdField />
      <TextField source="label" />
      <TextField source="running_count" title="Candidates" label="Candidates" />
      <TextField source="condition" />
    </ListPanel>
  );
};
