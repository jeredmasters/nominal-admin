import * as React from "react";
import { AppBar, TitlePortal } from "react-admin";
import { Box, useMediaQuery, Theme, Typography } from "@mui/material";

import Logo from "./Logo";
import { AppBarToolbar } from "./AppBarToolbar";

const CustomAppBar = () => {
  const isLargeEnough = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("sm")
  );
  return (
    <AppBar color="secondary" toolbar={<AppBarToolbar />}>
      <TitlePortal />
      {isLargeEnough && <Typography>Nominal Voting Inc.</Typography>}
      {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
    </AppBar>
  );
};

export default CustomAppBar;
