import { List, Datagrid, TextField, DateField } from "react-admin";
import { useParams } from "react-router-dom";
import { IdField } from "../../components/IdField";
import { OrganisationGrid } from "./datagrid-organisation";
import { Button, Typography } from "@mui/material";

export const ListOrganisations = () => {
  return (
    <List resource="organisations" perPage={100}>
      <OrganisationGrid />
    </List>
  );
};
