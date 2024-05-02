import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";

import {
  DashboardMenuItem,
  Link,
  MenuItemLink,
  MenuProps,
  useGetList,
  useSidebarState,
} from "react-admin";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const OrganisationMenu = ({ dense = false }: MenuProps) => {
  const [open] = useSidebarState();

  const { data: organisations, isLoading, error } = useGetList("organisations");
  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      {organisations
        ? organisations.map((o) => (
            <MenuItemLink
              key={o.id}
              to={`/organisations/${o.id}/show`}
              state={{ _scrollToTop: true }}
              primaryText={o.label}
              dense={false}
              leftIcon={<FiberManualRecordIcon />}
              {
                ...({} as any) /* strange requirement for onPointerLeaveCapture that causes FE errors */
              }
            />
          ))
        : null}
    </Box>
  );
};

export const AdminMenu = ({ dense = false }: MenuProps) => {
  const [open] = useSidebarState();

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <DashboardMenuItem />
      <MenuItemLink
        to={`/admin/admin-users`}
        state={{ _scrollToTop: true }}
        primaryText={"Admin Users"}
        dense={false}
        leftIcon={<ManageAccountsIcon />}
        {
          ...({} as any) /* strange requirement for onPointerLeaveCapture that causes FE errors */
        }
      />
    </Box>
  );
};
