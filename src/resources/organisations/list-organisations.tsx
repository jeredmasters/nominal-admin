import { ErrorPanel } from "../../components/error";
import { SimpleTable } from "../../components/simple-table";
import { RESOURCE } from "../../const/resources";
import { useParams } from "react-router-dom";
import { TabContainer, TabPanel } from "../../components/tab-panel";

export const ListOrganisationsPage = () => {
  return (
    <TabContainer>
      <TabPanel label="Organisations">
        <ListOrganisations />
      </TabPanel>
    </TabContainer>
  );
};

export const ListOrganisations = () => {
  return <SimpleTable resource={RESOURCE.organisation} columns={["label"]} />;
};
