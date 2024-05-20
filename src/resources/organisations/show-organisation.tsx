import { useParams } from "react-router-dom";
import { ListElections } from "../elections/list-elections";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { ErrorPanel } from "../../components/error";
import { ShowSimple } from "../../components/show-blob";
import { RESOURCE } from "../../const/resources";

export const ShowOrganisationPage = () => {
  const { organisation_id } = useParams();
  if (!organisation_id) {
    return (
      <ErrorPanel text="Must have organisation_id" source="ShowOrganisation" />
    );
  }

  return (
    <TabContainer hashTabs>
      <TabPanel label="Organisation Details">
        <ShowOrganisation organisation_id={organisation_id} />
      </TabPanel>
      <TabPanel label="Elections" id={RESOURCE.election}>
        <ListElections />
      </TabPanel>
    </TabContainer>
  );
};

interface ShowOrganisationProps {
  organisation_id: string;
}
export const ShowOrganisation = ({
  organisation_id,
}: ShowOrganisationProps) => {
  return (
    <ShowSimple
      resource={RESOURCE.organisation}
      id={organisation_id}
      keys={["label", "owner", "country"]}
    />
  );
};
