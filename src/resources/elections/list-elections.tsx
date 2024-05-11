import { TextField, DateField, TextInput, NumberField } from "react-admin";
import { ListPanel } from "../../components/list-panel";
import { IdField } from "../../components/IdField";
import { useParams } from "react-router-dom";
import { SimpleTable } from "../../components/simple-table";
export const ListElections = () => {
  const { organisation_id } = useParams();

  return (
    <SimpleTable
      resource="elections"
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
