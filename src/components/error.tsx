import { Card, Box, Grid, Typography } from "@mui/material";

interface ErrorProps {
  text: string;
  source: string;
  meta?: any;
}
export const ErrorPanel = ({ text, source, meta }: ErrorProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h3">Something went wrong</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">{text}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">{source}</Typography>
            </Grid>
            <Grid item xs={12}>
              {meta ? JSON.stringify(meta, null, 2) : null}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
};
