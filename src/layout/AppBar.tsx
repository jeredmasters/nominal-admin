import React, { useContext } from "react";
import {
  AppBar,
  Button,
  Logout,
  MenuItemLink,
  TitlePortal,
  UserMenu,
  useUserMenu,
} from "react-admin";
import {
  Box,
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AppBarToolbar } from "./AppBarToolbar";
import { useLocation } from "react-router-dom";
import BusinessIcon from "@mui/icons-material/Business";
import SettingsIcon from "@mui/icons-material/Settings";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { AuthContext } from "../context/auth.provider";

interface NavButtonProps {
  label: string;
  to: string;
  active: boolean;
  icon: any;
}
export const NavButton = ({ label, active, to, icon }: NavButtonProps) => (
  <Button
    href={to}
    label={label}
    sx={{
      color: active ? "white" : "#EEE",
      appearance: "auto",
      borderColor: "#FFF",
      marginLeft: 2,
    }}
    variant={active ? "outlined" : "text"}
  >
    {icon}
  </Button>
);

export const MyAppBar = () => {
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);

  return (
    <AppBar
      color="secondary"
      toolbar={<AppBarToolbar />}
      userMenu={
        <UserMenu>
          <Typography pl={2}>
            {user?.first_name} {user?.last_name} {user?.email}
          </Typography>
          <MenuItemLink
            to="/logout"
            primaryText="Logout"
            leftIcon={<PowerSettingsNewIcon />}
            {...({} as any)}
          />
        </UserMenu>
      }
    >
      <Box ml={2}>
        <NavButton
          label="Organisations"
          to="/organisations"
          active={pathname.startsWith("/organisations")}
          icon={<BusinessIcon />}
        />
        <NavButton
          label="Admin"
          to="/admin"
          active={pathname.startsWith("/admin")}
          icon={<SettingsIcon />}
        />
      </Box>
      {/* <TitlePortal />
      {isLargeEnough && <Typography>Nominal Voting Inc.</Typography>} */}
      <Box component="span" sx={{ flex: 1 }} />
    </AppBar>
  );
};

// It's important to pass the ref to allow Material UI to manage the keyboard navigation
const SettingsMenuItem = React.forwardRef((props, ref) => {
  // We are not using MenuItemLink so we retrieve the onClose function from the UserContext
  const { onClose } = useUserMenu();
  return (
    <MenuItem
      onClick={onClose}
      ref={ref as any}
      // It's important to pass the props to allow Material UI to manage the keyboard navigation
      {...props}
    >
      <ListItemIcon>
        <SettingsIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Customize</ListItemText>
    </MenuItem>
  );
});
