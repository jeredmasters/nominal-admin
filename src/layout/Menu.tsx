import { Box, Drawer } from "@mui/material";

import {
  DashboardMenuItem,
  Link,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useGetMany } from "../context/data.provider";
import { SimpleLoading } from "../components/loading";

interface OrganisationMenuProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}
export const OrganisationMenu = () => {
  const { data: organisations } = useGetMany("organisations");
  if (!organisations) {
    return <SimpleLoading />;
  }
  return (
    <Box>
      {organisations
        ? organisations.map((o) => (
            <MenuItemLink
              key={o.id}
              to={`/organisations/${o.id}`}
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
