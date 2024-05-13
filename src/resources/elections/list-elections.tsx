import { useParams } from "react-router-dom";
import { SimpleTable } from "../../components/simple-table";
import { RESOURCE } from "../../const/resources";
export const ListElections = () => {
  const { organisation_id } = useParams();

  return (
    <SimpleTable
      resource={RESOURCE.election}
      filter={{ organisation_id }}
      // filters={[<TextInput label="Label" source="label" alwaysOn />]}
      columns={[
        "label",
        "status",
        "ballot_count",
        "voter_count",
        "candidate_count",
      ]}
    />
  );
};
