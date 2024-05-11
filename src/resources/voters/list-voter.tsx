import { SimpleTable } from "../../components/simple-table";
import { useParams } from "react-router-dom";

export interface ListVotersProps {
  election_id?: string;
}
export const ListVoters = ({ election_id }: ListVotersProps) => {
  const params = useParams();
  if (!election_id) {
    election_id = params.election_id;
  }
  return (
    <SimpleTable
      resource="voters"
      filter={{ election_id }}
      columns={["first_name", "last_name", "email"]}
    />
  );
};
