import { List } from "react-admin";
import { CandidateGrid } from "./datagrid-candidate";

export const ListCandidates = () => {
  return (
    <List perPage={100}>
      <CandidateGrid />
    </List>
  );
};
