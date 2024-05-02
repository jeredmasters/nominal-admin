import { Datagrid, TextField, DateField } from "react-admin";
import { IdField } from "../../components/IdField";

export const AdminUserGrid = () => (
  <Datagrid rowClick="show">
    <IdField />
    <TextField source="first_name" />
    <TextField source="last_name" />
    <TextField source="email" />
  </Datagrid>
);
