import { Datagrid, TextField, DateField } from "react-admin";
import { IdField } from "../../components/IdField";

export const ElectionGrid = () => (
  <Datagrid rowClick="show">
    <IdField />
    <TextField source="label" />
    <DateField source="opens_at" />
    <TextField source="closes_at" />
  </Datagrid>
);
