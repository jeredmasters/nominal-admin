import React, { useMemo, useState } from "react";

import { OrganisationMenu } from "./Menu";
import { Outlet } from "react-router-dom";
import { Box, Drawer, Card, useMediaQuery, Theme } from "@mui/material";
import { SimpleAppBar } from "./simple-appbar";
import { BreadCrumbs } from "../components/breadcrumb";
import { RESOURCE } from "../const/resources";

enum SIDEBAR {
  OPEN,
  CLOSED,
  FIXED,
}

export const SimpleLayout = () => {
  const [sidebar, setSidebar] = useState<SIDEBAR>(SIDEBAR.FIXED);
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <Box
      display="flex"
      flexDirection="column"
      zIndex={1}
      minHeight="100vh"
      backgroundColor="theme.palette.background.default"
      position="relative"
      {...({} as any)}
    >
      <Box display="flex" flexDirection="column" {...({} as any)}>
        <SimpleAppBar
          onSidebar={() =>
            setSidebar(sidebar === SIDEBAR.OPEN ? SIDEBAR.CLOSED : SIDEBAR.OPEN)
          }
        />
        <Box
          display="flex"
          flexGrow={1}
          sx={{
            background: "#F0f0f0",
          }}
        >
          {isSmall ? (
            <Drawer
              open={sidebar === SIDEBAR.OPEN}
              onClose={() => setSidebar(SIDEBAR.CLOSED)}
            >
              <OrganisationMenu />
            </Drawer>
          ) : (
            <Box
              minWidth={200}
              sx={{
                height: "calc(100vh - 64px)",
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 0,
                  paddingTop: "1em",
                  boxSizing: "border-box",
                }}
              >
                <OrganisationMenu />
              </Card>
            </Box>
          )}
          <Box
            sx={{
              flexDirection: "column",
              flexBasis: 0,
              flexGrow: 1,
              padding: "0 2em",

              height: "calc(100vh - 64px)",
            }}
          >
            <BreadCrumbs resource={RESOURCE.election} />
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
