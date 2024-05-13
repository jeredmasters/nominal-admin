import { useParams } from "react-router-dom";
import { ListVoters } from "../voters/list-voter";
import { UploadVotersCsv } from "./upload-voters";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { BallotCards } from "../ballots/ballot-cards";
import { ShowSimple } from "../../components/show-blob";
import { ErrorPanel } from "../../components/error";
import { ListEmailBatchs } from "../email-batches/list-email-batches";
import { RESOURCE } from "../../const/resources";

export const ShowElectionPage = () => {
  const { election_id } = useParams();

  if (!election_id) {
    return <ErrorPanel text="Must have election_id" source="ShowElection" />;
  }

  return (
    <TabContainer hashTabs>
      <TabPanel label="Election">
        <hr />
        <ShowElection election_id={election_id} />
        <hr />
        <BallotCards election_id={election_id} />
      </TabPanel>
      <TabPanel label="Voters" id="voters">
        <ListVoters election_id={election_id} />
      </TabPanel>
      <TabPanel label="Upload Voters" id="upload-voters">
        <UploadVotersCsv election_id={election_id} />
      </TabPanel>
      <TabPanel label="Email Batch" id="email-batches">
        <ListEmailBatchs election_id={election_id} />
      </TabPanel>
    </TabContainer>
  );
};

interface ShowElectionProps {
  election_id: string;
}
export const ShowElection = ({ election_id }: ShowElectionProps) => {
  return (
    <ShowSimple
      title="Election Details"
      resource={RESOURCE.election}
      id={election_id}
      keys={[
        "label",
        "status",
        "opens_at",
        "closes_at",
        "ballot_count",
        "voter_count",
        "candidate_count",
      ]}
    />
  );
};
