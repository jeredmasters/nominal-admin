import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import LabelIcon from "@mui/icons-material/Label";

import {
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";

// import visitors from '../visitors';
// import orders from '../orders';
// import invoices from '../invoices';
// import products from '../products';
// import categories from '../categories';
// import reviews from '../reviews';
import SubMenu from "./SubMenu";
import OrderIcon from "@mui/icons-material/AttachMoney";
import ProductIcon from "@mui/icons-material/Collections";
import InvoiceIcon from "@mui/icons-material/LibraryBooks";
import ReviewIcon from "@mui/icons-material/Comment";
import CategoryIcon from "@mui/icons-material/Bookmark";
import VisitorIcon from "@mui/icons-material/People";

type MenuName = "menuCatalog" | "menuSales" | "menuCustomers";

export const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    menuCatalog: true,
    menuSales: true,
    menuCustomers: true,
  });
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

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
      <SubMenu
        handleToggle={() => handleToggle("menuSales")}
        isOpen={state.menuSales}
        name="Clients"
        icon={<OrderIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/organisations"
          state={{ _scrollToTop: true }}
          primaryText="Organisations"
          leftIcon={<OrderIcon />}
          dense={dense}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <MenuItemLink
          to="/voters"
          state={{ _scrollToTop: true }}
          primaryText="Voters"
          leftIcon={<InvoiceIcon />}
          dense={dense}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("menuCatalog")}
        isOpen={state.menuCatalog}
        name="Elections"
        icon={<ProductIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/elections"
          state={{ _scrollToTop: true }}
          primaryText="Products"
          leftIcon={<ProductIcon />}
          dense={dense}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <MenuItemLink
          to="/candidates"
          state={{ _scrollToTop: true }}
          primaryText="Candidates"
          leftIcon={<CategoryIcon />}
          dense={dense}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <MenuItemLink
          to="/enrollments"
          state={{ _scrollToTop: true }}
          primaryText="Enrollments"
          leftIcon={<CategoryIcon />}
          dense={dense}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("menuCustomers")}
        isOpen={state.menuCustomers}
        name="Sales"
        icon={<VisitorIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/customers"
          state={{ _scrollToTop: true }}
          primaryText="Customers"
          leftIcon={<VisitorIcon />}
          dense={dense}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <MenuItemLink
          to="/segments"
          state={{ _scrollToTop: true }}
          primaryText="Segments"
          leftIcon={<LabelIcon />}
          dense={dense}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </SubMenu>
      <MenuItemLink
        to="/reviews"
        state={{ _scrollToTop: true }}
        primaryText="Reviews"
        leftIcon={<ReviewIcon />}
        dense={dense}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
    </Box>
  );
};
