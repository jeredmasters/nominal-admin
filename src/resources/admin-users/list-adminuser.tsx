import { SimpleTable } from "../../components/simple-table";
import { RESOURCE } from "../../const/resources";

export const ListAdminUsers = () => {
  return <SimpleTable resource={RESOURCE.admin_users} />;
};
