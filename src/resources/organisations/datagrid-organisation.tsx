import { Datagrid, TextField, DateField } from "react-admin";
import { IdField } from "../../components/IdField";

export const OrganisationGrid = () => (
  <Datagrid>
    <IdField />
    <TextField source="label" />
    <TextField source="created_at" />
  </Datagrid>
);
