import React, { ChangeEventHandler, useState } from "react";
import { Grid, Typography, TextField as MuiTextField } from "@mui/material";
import { TextField } from "react-admin";
import { IdField } from "../../../components/IdField";
import { OrgList } from "../../../components/org-list";
import { ConfigureUpload } from "./configure-upload";

interface UploadVotersCsvProps {
  election_id: string;
}
export const UploadVotersCsv = ({ election_id }: UploadVotersCsvProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        setFile(file);
      }
    }
  };
  if (file) {
    return <ConfigureUpload file={file} election_id={election_id} />;
  }
  return (
    <Grid container p={1}>
      <Grid item xs={12}>
        <Typography variant="h5">Upload Voter CSV</Typography>
      </Grid>
      <Grid item xs={12}>
        <form>
          <MuiTextField type="file" onChange={handleFileUpload} />
        </form>
      </Grid>
      <Grid item xs={12}>
        <OrgList resource="voter_digests" perPage={100} omitOrgFilter={true}>
          <IdField />
          <TextField source="original_filename" />
          <TextField source="row_count" />
          <TextField source="status" />
        </OrgList>
      </Grid>
    </Grid>
  );
};
