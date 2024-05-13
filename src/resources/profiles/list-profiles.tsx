import { ErrorPanel } from "../../components/error";
import { SimpleTable } from "../../components/simple-table";
import { RESOURCE } from "../../const/resources";
import { useParams } from "react-router-dom";

export const ListProfilesPage = () => {
  const { candidate_id } = useParams();
  if (!candidate_id) {
    return <ErrorPanel text="Must have candidate_id" source="ListVotersPage" />;
  }
  return <ListProfiles candidate_id={candidate_id} />;
};

interface ListProfilesProps {
  candidate_id?: string;
}
export const ListProfiles = ({ candidate_id }: ListProfilesProps) => {
  return (
    <SimpleTable
      resource={RESOURCE.profile}
      filter={{ candidate_id }}
      columns={["status", "statement"]}
    />
  );
};
