import { SimpleTable } from "../../components/simple-table";
import { RESOURCE } from "../../const/resources";

export interface ListEmailTokensProps {
  voter_id?: string;
}
export const ListEmailTokens = ({ voter_id }: ListEmailTokensProps) => {
  return (
    <SimpleTable
      resource={RESOURCE.email_token}
      filter={{ voter_id }}
      columns={["created_at", "action", "status"]}
    />
  );
};
