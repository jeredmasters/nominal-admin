import { useContext } from "react";
import { SimpleTable } from "../../components/simple-table";
import { AuthContext } from "../../context/auth.provider";
import { RESOURCE } from "../../const/resources";
import { useParams } from "react-router-dom";
import { ErrorPanel } from "../../components/error";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useCreatePath } from "../../util";
import { AddTagForm } from "../voter_tags/create-voter-tag";

export const ListVotersPage = () => {
  const { election_id } = useParams();
  if (!election_id) {
    return <ErrorPanel text="Must have election_id" source="ListVotersPage" />;
  }
  return (
    <TabContainer>
      <TabPanel label="Voters">
        <ListVoters election_id={election_id} />
      </TabPanel>
    </TabContainer>
  );
};

export interface ListVotersProps {
  election_id: string;
}
export const ListVoters = ({ election_id }: ListVotersProps) => {
  const { fetch } = useContext(AuthContext);
  const createPath = useCreatePath(RESOURCE.email_batch);

  return (
    <SimpleTable
      resource={RESOURCE.voter}
      filter={{ election_id }}
      columns={["first_name", "last_name", "email"]}
      selectActions={[
        {
          label: "Send Batch Invite",
          href: createPath,
          confirm: true,
          variant: "contained",
        },
        {
          label: "Add Tag",
          modal: (onClose, meta) => ({
            content: <AddTagForm onClose={onClose} voter_id={meta.selected} />,
          }),
        },
      ]}
    />
  );
};
