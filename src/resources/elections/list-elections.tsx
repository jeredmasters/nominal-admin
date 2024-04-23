import { List, Datagrid, TextField, DateField } from "react-admin";
import { ElectionGrid } from "./datagrid-election";

export const ListElections = () => {
  return (
    <List perPage={100}>
      <ElectionGrid />
    </List>
  );
};
