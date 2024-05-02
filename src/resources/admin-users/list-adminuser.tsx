import { List } from "react-admin";
import { AdminUserGrid } from "./datagrid-adminuser";

export const ListAdminUsers = () => {
  return (
    <List perPage={100}>
      <AdminUserGrid />
    </List>
  );
};
