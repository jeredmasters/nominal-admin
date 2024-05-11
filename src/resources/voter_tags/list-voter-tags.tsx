import { SimpleTable } from "../../components/simple-table";
import { useParams } from "react-router-dom";

export interface ListVoterTagsProps {
  voter_id?: string;
}
export const ListVoterTags = ({ voter_id }: ListVoterTagsProps) => {
  const params = useParams();
  if (!voter_id) {
    voter_id = params.voter_id;
  }
  return (
    <SimpleTable
      resource="voter-tags"
      filter={{ voter_id }}
      columns={["key", "value"]}
    />
  );
};
