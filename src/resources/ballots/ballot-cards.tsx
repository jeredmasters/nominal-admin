import { Card, Typography, Box } from "@mui/material";
import { ListCandidates } from "../candidates/list-candidates";
import { Link } from "react-router-dom";
import { useShowPath } from "../../util";
import { CreateButton } from "../../components/create-button";
import { ErrorPanel } from "../../components/error";
import { SimpleLoading } from "../../components/loading";
import { useGetMany } from "../../context/data.provider";

export interface BallotCardsProps {
  election_id?: string;
  candidate_id?: string;
  showCandidates?: boolean;
}
export const BallotCards = ({
  election_id,
  candidate_id,
  showCandidates,
}: BallotCardsProps) => {
  const path = useShowPath("ballots");
  const { data: ballots } = useGetMany("ballots", {
    filter: { election_id, candidate_id },
  });
  if (!election_id) {
    return <ErrorPanel text="Must have election id" source="BallotCards" />;
  }
  if (!ballots) {
    return <SimpleLoading />;
  }
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h5">Ballots</Typography>
        </Box>
        <Box>
          <CreateButton
            resource="ballots"
            state={{ election_id: election_id }}
          />
        </Box>
      </Box>
      {ballots.map((b) => (
        <Box mb={2} key={b.id}>
          <Card key={b.id} variant="outlined">
            <Box p={3} mb={1}>
              <Link to={path(b.id)}>
                <Typography variant="h6">Ballot: {b.label}</Typography>
              </Link>
              <Typography variant="body2">
                Response Type: {b.response_type}
              </Typography>
              <Typography variant="body2">
                Candidates: {b.running_count}
              </Typography>
              {showCandidates ? (
                <>
                  <hr />
                  <Typography variant="body1">Candidates </Typography>

                  <ListCandidates ballot_id={b.id} election_id={election_id} />
                </>
              ) : null}
            </Box>
          </Card>
        </Box>
      ))}
    </>
  );
};
