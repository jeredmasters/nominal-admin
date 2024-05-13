import { RESOURCE } from "../../const/resources";
import { SimpleTable } from "../../components/simple-table";

export interface ListBallots {
  election_id?: string;
  candidate_id?: string;
}
export const ListBallots = ({ election_id, candidate_id }: ListBallots) => {
  return (
    <SimpleTable
      resource={RESOURCE.ballot}
      columns={["label", "running_count"]}
    />
  );
};
