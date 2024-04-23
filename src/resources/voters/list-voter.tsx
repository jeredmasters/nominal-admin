import { List, SearchInput, TextInput } from "react-admin";
import { VoterGrid } from "./datagrid-voter";

export const ListVoters = () => {
  return (
    <List
      perPage={100}
      filters={[
        <SearchInput source="q" alwaysOn />,
        <TextInput label="Email" source="email" alwaysOn />,
      ]}
    >
      <VoterGrid />
    </List>
  );
};
