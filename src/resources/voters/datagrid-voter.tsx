import { Datagrid, TextField, DateField } from "react-admin";
import { IdField } from "../../components/IdField";

export const VoterGrid = () => (
  <Datagrid rowClick="show">
    <IdField />
    <TextField source="first_name" />
    <TextField source="last_name" />
    <DateField source="created_at" />
  </Datagrid>
);
