import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  CustomRoutes,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider2 } from "./authProvider";
import { Dashboard } from "../dashboard";
import { ShowOrganisation } from "../resources/organisations/show-organisation";
import { ListOrganisations } from "../resources/organisations/list-organisations";
import { Login } from "../layout/Login";
import { ListAdminUsers } from "../resources/admin-users/list-adminuser";

import * as React from "react";
import { Layout, LayoutProps } from "react-admin";
import { MyAppBar } from "../layout/AppBar";
import { AdminMenu } from "../layout/Menu";

const AdminLayout = (props: LayoutProps) => {
  return <Layout {...props} appBar={MyAppBar} menu={AdminMenu} />;
};

export const AdminApp = () => (
  <Admin
    dataProvider={dataProvider}
    layout={AdminLayout}
    loginPage={Login}
    dashboard={Dashboard}
    basename="/admin"
  >
    <Resource
      name="organisations"
      list={ListOrganisations}
      edit={EditGuesser}
      show={ShowOrganisation}
      recordRepresentation={(record) => record.label}
    ></Resource>
    <Resource
      name="admin-users"
      list={ListAdminUsers}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="admin-logs"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);
