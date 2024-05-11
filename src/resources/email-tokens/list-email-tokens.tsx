import { SimpleTable } from "../../components/simple-table";

export interface ListEmailTokensProps {
  voter_id?: string;
}
export const ListEmailTokens = ({ voter_id }: ListEmailTokensProps) => {
  return <SimpleTable resource="email-tokens" filter={{ voter_id }} />;
};
