import * as React from "react";
import { ReactElement, ReactNode } from "react";
import {
  List,
  MenuItem,
  ListItemIcon,
  Typography,
  Collapse,
  Tooltip,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTranslate, useSidebarState } from "react-admin";

interface Props {
  dense: boolean;
  icon: ReactElement;
  name: string;
  children: ReactNode;
}

const SubMenu = (props: Props) => {
  const { name, icon, children, dense } = props;
  const translate = useTranslate();

  const [sidebarIsOpen] = useSidebarState();
  const [open, setOpen] = React.useState(false);

  const header = (
    <MenuItem dense={dense} onClick={() => setOpen(!open)}>
      <ListItemIcon sx={{ minWidth: 5 }}>
        {open ? <ExpandMore /> : icon}
      </ListItemIcon>
      <Typography variant="inherit" color="textSecondary">
        {translate(name)}
      </Typography>
    </MenuItem>
  );

  return (
    <div>
      {sidebarIsOpen || open ? (
        header
      ) : (
        <Tooltip title={translate(name)} placement="right">
          {header}
        </Tooltip>
      )}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          dense={dense}
          component="div"
          disablePadding
          sx={{
            "& .MuiMenuItem-root": {
              transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
              paddingLeft: (theme) =>
                sidebarIsOpen ? theme.spacing(4) : theme.spacing(2),
            },
          }}
        >
          {children}
        </List>
      </Collapse>
    </div>
  );
};

export default SubMenu;
