import { useParams } from "react-router-dom";
import { ListVoters } from "../voters/list-voter";
import { UploadVotersCsv } from "./upload-voters";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { BallotCards } from "../ballots/ballot-cards";
import { ShowSimple } from "../../components/show-blob";
import { ErrorPanel } from "../../components/error";

export const ShowElection = () => {
  const { election_id } = useParams();

  if (!election_id) {
    return <ErrorPanel text="Must have election_id" source="ShowElection" />;
  }

  return (
    <TabContainer>
      <TabPanel label="Election">
        <hr />
        <ShowSimple
          title="Election Details"
          resource="elections"
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
        <hr />
        <BallotCards election_id={election_id} />
      </TabPanel>
      <TabPanel label="Voters">
        <ListVoters election_id={election_id} />
      </TabPanel>
      <TabPanel label="Upload Voters">
        <UploadVotersCsv election_id={election_id} />
      </TabPanel>
    </TabContainer>
  );
};
