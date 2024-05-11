import {
  Show,
  TextField,
  DateField,
  EditButton,
  TabbedShowLayout,
  useDataProvider,
} from "react-admin";
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { IdField } from "../../components/IdField";
import { ListElections } from "../elections/list-elections";
import { ShowPanel } from "../../components/show-panel";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useResource } from "../../util";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.provider";
import { ErrorPanel } from "../../components/error";
import { ShowSimple } from "../../components/show-blob";

export const ShowOrganisation = () => {
  useResource();
  const { organisation_id } = useParams();
  if (!organisation_id) {
    return (
      <ErrorPanel text="Must have organisation_id" source="ShowOrganisation" />
    );
  }

  return (
    <TabContainer hashTabs>
      <TabPanel label="Organisation Details">
        <ShowSimple
          resource="organisations"
          id={organisation_id}
          keys={["label"]}
        />
      </TabPanel>
      <TabPanel label="Elections" id="elections">
        <ListElections />
      </TabPanel>
    </TabContainer>
  );
};
