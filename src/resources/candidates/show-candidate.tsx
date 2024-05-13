import { useParams } from "react-router-dom";
import { ListBallots } from "../ballots/list-ballots";
import { ListProfiles } from "../profiles/list-profiles";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { StatusChip } from "../../components/status-chip";
import { ProfileCards } from "../profiles/profile-cards";
import { ShowSimple } from "../../components/show-blob";
import { Card, Typography, Box, Grid } from "@mui/material";
import { ListCandidates } from "../candidates/list-candidates";
import { Link } from "react-router-dom";
import { useShowPath } from "../../util";
import { CreateButton } from "../../components/create-button";
import { useGetMany } from "../../context/data.provider";
import { SimpleLoading } from "../../components/loading";
import { ErrorPanel } from "../../components/error";
import { RESOURCE } from "../../const/resources";

export const ShowCandidatePage = () => {
  const { candidate_id } = useParams();

  if (!candidate_id) {
    return <ErrorPanel text="Must have candidate_id" source="ShowCandidate" />;
  }

  return (
    <TabContainer>
      <TabPanel label="Candidate">
        <hr />
        <ShowCandidate candidate_id={candidate_id} />
        <hr />
        <Typography>Running in:</Typography>
        <BallotCards candidate_id={candidate_id} />
      </TabPanel>
      <TabPanel label="Profiles">
        <ListProfiles candidate_id={candidate_id} />
      </TabPanel>
    </TabContainer>
  );
};

interface ShowCandidateProps {
  candidate_id: string;
}
export const ShowCandidate = ({ candidate_id }: ShowCandidateProps) => {
  return (
    <ShowSimple
      resource={RESOURCE.candidate}
      id={candidate_id}
      keys={[
        "status",
        "title",
        "first_name",
        "last_name",
        "preferred_name",
        "email",
      ]}
    />
  );
};

export interface BallotCardsProps {
  election_id?: string;
  candidate_id: string;
  showCandidates?: boolean;
}
export const BallotCards = ({
  election_id,
  candidate_id,
  showCandidates,
}: BallotCardsProps) => {
  const path = useShowPath(RESOURCE.ballot);
  const { data: ballots } = useGetMany(RESOURCE.ballot, {
    filter: { election_id, candidate_id },
  });
  if (!ballots) {
    return <SimpleLoading />;
  }
  return (
    <Box>
      {ballots.map((b: any) => (
        <Box mb={2} key={b.id}>
          <Card key={b.id} variant="outlined">
            <Box p={1} mb={1}>
              <Grid container>
                <Grid item xs={12} sm={4} p={2}>
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

                      <ListCandidates
                        ballot_id={b.id}
                        election_id={election_id}
                      />
                    </>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={8} p={2}>
                  <CandidateStatement
                    candidate_id={candidate_id}
                    ballot_id={b.id}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

interface CandidateStatementProps {
  candidate_id: string;
  ballot_id: string;
}
const CandidateStatement = ({
  candidate_id,
  ballot_id,
}: CandidateStatementProps) => {
  const showPath = useShowPath(RESOURCE.profile);

  const { data: profiles } = useGetMany(RESOURCE.profile, {
    filter: { candidate_id, ballot_id },
  });
  if (!profiles) {
    return <SimpleLoading />;
  }
  if (profiles.length === 0) {
    return (
      <Box>
        <Typography>No statement</Typography>
        <CreateButton
          label="New Statement"
          resource={RESOURCE.profile}
          state={{ candidate_id, ballot_id }}
        />
      </Box>
    );
  }
  const profile = profiles[0];
  return (
    <Box>
      <Link to={showPath(profile.id)}>
        Statement: <StatusChip status={profile.status} />
        <Card variant="outlined">
          <pre style={{ margin: 10 }}>{profile.statement}</pre>
        </Card>
      </Link>
    </Box>
  );
};
