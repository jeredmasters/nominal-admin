import { SimpleTable } from "../../components/simple-table";
import { RESOURCE } from "../../const/resources";

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
      resource={RESOURCE.candidate}
      filter={{ election_id, ballot_id }}
      columns={["first_name", "last_name", "status"]}
    />
  );
};
