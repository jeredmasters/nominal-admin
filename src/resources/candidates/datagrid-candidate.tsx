import { Datagrid, TextField, DateField } from "react-admin";
import { IdField } from "../../components/IdField";

export const CandidateGrid = () => (
  <Datagrid rowClick="show">
    <IdField />
    <TextField source="label" />
  </Datagrid>
);
