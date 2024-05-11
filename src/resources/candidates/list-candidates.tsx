import { ListPanel } from "../../components/list-panel";
import { TextField } from "react-admin";
import { IdField } from "../../components/IdField";
import { SimpleTable } from "../../components/simple-table";

interface ListCandidatesProps {
  election_id?: string;
  ballot_id?: string;
}
export const ListCandidates = ({
  election_id,
  ballot_id,
}: ListCandidatesProps) => {
  return (
    <SimpleTable
      resource="candidates"
      filter={{ election_id, ballot_id }}
      columns={["first_name", "last_name", "status"]}
    />
  );
};
