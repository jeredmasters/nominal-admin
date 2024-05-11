import { useParams } from "react-router-dom";
import { ListCandidates } from "../candidates/list-candidates";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { ShowSimple } from "../../components/show-blob";
import { ErrorPanel } from "../../components/error";

export const ShowBallot = () => {
  const { ballot_id } = useParams();

  if (!ballot_id) {
    return <ErrorPanel text="Must have ballot_id" source="ShowBallot" />;
  }

  return (
    <TabContainer>
      <TabPanel label="Ballot">
        <hr />
        <ShowSimple resource="ballots" id={ballot_id} />
        <hr />
        <ListCandidates ballot_id={ballot_id} />
      </TabPanel>
    </TabContainer>
  );
};
