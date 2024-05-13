import { SimpleTable } from "../../components/simple-table";
import { useParams } from "react-router-dom";
import { RESOURCE } from "../../const/resources";

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
      resource={RESOURCE.voter_tag}
      filter={{ voter_id }}
      columns={["key", "value"]}
    />
  );
};
