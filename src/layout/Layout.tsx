import React, { useMemo } from "react";
import { Layout, LayoutProps } from "react-admin";
import { MyAppBar } from "./AppBar";
import { AdminMenu, OrganisationMenu } from "./Menu";
import { useLocation } from "react-router-dom";

const useMenu = () => {
  const { pathname } = useLocation();
  const menu = useMemo(
    () =>
      pathname.startsWith("/organisations") ? OrganisationMenu : AdminMenu,
    [pathname]
  );
  return menu;
};
export default (props: LayoutProps) => {
  const menu = useMenu();
  return <Layout {...props} appBar={MyAppBar} menu={menu as any} />;
};

import { Box } from "@mui/material";
import { AppBar, Menu, Sidebar } from "react-admin";

export const MyLayout = ({ children, dashboard }: any) => (
  <Box
    display="flex"
    flexDirection="column"
    zIndex={1}
    minHeight="100vh"
    backgroundColor="theme.palette.background.default"
    position="relative"
    {...({} as any)}
  >
    <Box
      display="flex"
      flexDirection="column"
      overflowX="auto"
      {...({} as any)}
    >
      <AppBar />
      <Box display="flex" flexGrow={1}>
        <Sidebar>
          <Menu hasDashboard={!!dashboard} />
        </Sidebar>
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={2}
          p={3}
          marginTop="4em"
          paddingLeft={5}
        >
          {children}
        </Box>
      </Box>
    </Box>
  </Box>
);
