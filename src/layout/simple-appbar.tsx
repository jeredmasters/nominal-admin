import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import { Menu, Button } from "@mui/material";

import { useLocation } from "react-router-dom";
import BusinessIcon from "@mui/icons-material/Business";
import SettingsIcon from "@mui/icons-material/Settings";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { AuthContext } from "../context/auth.provider";
import { useContext } from "react";
import { SimpleButton } from "../components/simple-button";

interface SimpleAppBarProps {
  onSidebar: () => void;
}
export const SimpleAppBar = ({ onSidebar }: SimpleAppBarProps) => {
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onSidebar}
          >
            <MenuIcon />
          </IconButton>
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
          {user && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

interface NavButtonProps {
  label: string;
  to: string;
  active: boolean;
  icon: any;
}
export const NavButton = ({ label, active, to, icon }: NavButtonProps) => (
  <SimpleButton
    href={to}
    label={label}
    sx={{
      color: active ? "white" : "#EEE",
      appearance: "auto",
      borderColor: "#FFF",
      marginLeft: 2,
    }}
    variant={active ? "outlined" : "text"}
    icon={icon}
  ></SimpleButton>
);
