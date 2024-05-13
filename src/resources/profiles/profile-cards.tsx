import { Card, Typography, Box } from "@mui/material";
import { ListCandidates } from "../candidates/list-candidates";
import { StatusChip } from "../../components/status-chip";
import { RESOURCE } from "../../const/resources";
import { SimpleLoading } from "../../components/loading";
import { useGetMany } from "../../context/data.provider";

export interface ProfileCardsProps {
  election_id?: string;
  candidate_id?: string;
  ballot_id?: string;
  status?: string;
  showCandidates?: boolean;
}
export const ProfileCards = ({
  election_id,
  candidate_id,
  status,
  showCandidates,
}: ProfileCardsProps) => {
  const { data: profiles } = useGetMany(RESOURCE.profile, {
    filter: { election_id, candidate_id, status },
  });
  if (!profiles) {
    return <SimpleLoading />;
  }
  return (
    <div>
      {profiles.map((b) => (
        <Box mb={2} key={b.id}>
          <Card key={b.id} variant="outlined">
            <Box p={3} mb={1}>
              <Typography variant="h6">
                Profile: {b.label}
                <StatusChip status={b.status} />
              </Typography>
              <Typography variant="body2">
                Response Type: {b.response_type}
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
    </div>
  );
};
