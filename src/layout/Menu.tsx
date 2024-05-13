import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useGetMany } from "../context/data.provider";
import { SimpleLoading } from "../components/loading";
import { RESOURCE } from "../const/resources";
import { Link } from "react-router-dom";

interface OrganisationMenuProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}
export const OrganisationMenu = () => {
  const { data: organisations } = useGetMany(RESOURCE.organisation);
  if (!organisations) {
    return <SimpleLoading />;
  }
  return (
    <Box>
      <List>
        {organisations
          ? organisations.map((o) => (
              <ListItem key={o.id} disablePadding sx={{ width: "100%" }}>
                <Link
                  key={o.id}
                  to={`/organisations/${o.id}`}
                  style={{ width: "100%" }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <FiberManualRecordIcon />
                    </ListItemIcon>
                    <ListItemText primary={o.label} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))
          : null}
      </List>
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
