import { useParams } from "react-router-dom";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { ShowSimple } from "../../components/show-blob";
import { ErrorPanel } from "../../components/error";
import { RESOURCE } from "../../const/resources";

export const ShowEmailBatchPage = () => {
  const { email_batch_id } = useParams();

  if (!email_batch_id) {
    return (
      <ErrorPanel text="Must have email_batch_id" source="ShowEmailBatch" />
    );
  }

  return (
    <TabContainer>
      <TabPanel label="EmailBatch">
        <ShowEmailBatch email_batch_id={email_batch_id} />
      </TabPanel>
      <TabPanel label="Profiles"></TabPanel>
    </TabContainer>
  );
};

interface ShowEmailBatchProps {
  email_batch_id: string;
}
export const ShowEmailBatch = ({ email_batch_id }: ShowEmailBatchProps) => {
  return (
    <ShowSimple
      resource={RESOURCE.email_batch}
      id={email_batch_id}
      keys={["status", "voter_ids"]}
    />
  );
};
