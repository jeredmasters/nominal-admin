import { useContext } from "react";
import { SimpleTable } from "../../components/simple-table";
import { RESOURCE } from "../../const/resources";
import { AuthContext } from "../../context/auth.provider";
import { ErrorPanel } from "../../components/error";

export interface ListEmailTokensProps {
  voter_id?: string;
}
export const ListEmailTokens = ({ voter_id }: ListEmailTokensProps) => {
  const { fetch } = useContext(AuthContext);
  if (!fetch) {
    return (
      <ErrorPanel text="Must have auth and fetch" source="ListEmailTokens" />
    );
  }
  const handleSendToken = () => {
    fetch(`/voters/${voter_id}/send_invite`, {
      method: "post",
      body: { replace_token: true },
    });
  };
  return (
    <SimpleTable
      resource={RESOURCE.email_token}
      filter={{ voter_id }}
      columns={["created_at", "action", "status"]}
      buttons={[
        {
          label: "Send Token",
          func: handleSendToken,
        },
      ]}
    />
  );
};
