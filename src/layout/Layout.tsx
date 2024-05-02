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
  return <Layout {...props} appBar={MyAppBar} menu={menu} />;
};
