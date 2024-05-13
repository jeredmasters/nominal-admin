import { SimpleTable } from "../../components/simple-table";
import { RESOURCE } from "../../const/resources";

interface ListEmailBatchsProps {
  election_id?: string;
}
export const ListEmailBatchs = ({ election_id }: ListEmailBatchsProps) => {
  return (
    <SimpleTable
      resource={RESOURCE.email_batch}
      filter={{ election_id }}
      columns={["status"]}
    />
  );
};
