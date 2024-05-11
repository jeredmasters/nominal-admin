import { useParams, Link } from "react-router-dom";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { ShowSimple } from "../../components/show-blob";
import { Typography, Card, Grid, TextField } from "@mui/material";
import { ModalBodyProps, SimpleButton } from "../../components/simple-button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { FC, useContext, useState } from "react";
import { AuthContext } from "../../context/auth.provider";
import { ErrorPanel } from "../../components/error";
import { useGetOne } from "../../context/data.provider";
import { SimpleLoading } from "../../components/loading";

export const ShowProfile = () => {
  const { profile_id } = useParams();

  if (!profile_id) {
    return <ErrorPanel text="Must have profile_id" source="ShowProfile" />;
  }
  const profile = useGetOne("profiles", profile_id);

  if (!profile) {
    return <SimpleLoading />;
  }
  return (
    <TabContainer>
      <TabPanel label="Profile">
        <ShowSimple
          id={profile_id}
          resource="profiles"
          keys={["version", "status", "preferred_name", "rejected_reason"]}
          buttons={[
            {
              label: "Approve",
              icon: <ThumbUpIcon />,
              modal: (onClose) => {
                console.log("rerender");
                return <ApproveForm id={profile_id} onClose={onClose} />;
              },
            },
            {
              label: "Reject",
              icon: <ThumbDownIcon />,
              modal: (onClose) => (
                <RejectForm id={profile_id} onClose={onClose} />
              ),
            },
          ]}
        />
        <Typography mt={2} pl={1} variant="h6">
          Statement
        </Typography>
        <Card variant="outlined" sx={{ p: 2 }}>
          <pre>{profile.statement}</pre>
        </Card>
      </TabPanel>
    </TabContainer>
  );
};

interface ApproveFormProps extends ModalBodyProps {
  id: string;
}
const ApproveForm = ({ onClose, id }: ApproveFormProps) => {
  const { fetch } = useContext(AuthContext);
  if (!fetch) {
    return <div>MUST BE AUTHENTICATED</div>;
  }
  const handleConfim = () => {
    fetch(`/profiles/${id}/approve`, { method: "POST" }).then((r) => {
      if (r.status === 200) {
        onClose && onClose();
      }
    });
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography mt={2} pl={1} variant="h6">
          Approve Statement?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <SimpleButton label="Confirm" variant="contained" func={handleConfim} />
        <SimpleButton label="Cancel" func={onClose} />
      </Grid>
    </Grid>
  );
};

interface RejectFormProps extends ModalBodyProps {
  id: string;
}
const RejectForm = ({ onClose, id }: RejectFormProps) => {
  const [rejectedReason, setRejectReason] = useState<string>();
  const { fetch } = useContext(AuthContext);
  if (!fetch) {
    return <div>MUST BE AUTHENTICATED</div>;
  }
  const handleConfim = () => {
    fetch(`/profiles/${id}/reject`, {
      method: "POST",
      body: { reject_reason: rejectedReason },
    }).then((r) => {
      if (r.status === 200) {
        onClose && onClose();
      }
    });
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography mt={2} pl={1} variant="h6">
          Reject Statement?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-multiline-static"
          label="Reject Reason"
          multiline
          rows={4}
          fullWidth
          value={rejectedReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <SimpleButton label="Confirm" variant="contained" func={handleConfim} />
        <SimpleButton label="Cancel" func={onClose} />
      </Grid>
    </Grid>
  );
};
