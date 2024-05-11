import { ListPanel } from "../../components/list-panel";
import { TextField } from "react-admin";
import { IdField } from "../../components/IdField";
import { SimpleTable } from "../../components/simple-table";

interface ListProfilesProps {
  candidate_id?: string;
}
export const ListProfiles = ({ candidate_id }: ListProfilesProps) => {
  return (
    <SimpleTable
      resource="profiles"
      filter={{ candidate_id }}
      columns={["status", "statement"]}
    />
  );
};
