import { SimpleTable } from "../../components/simple-table";

export const ListOrganisations = () => {
  return <SimpleTable resource="organisations" columns={["label"]} />;
};
