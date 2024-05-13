import { useParams } from "react-router-dom";
import { RESOURCE } from "../../const/resources";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { ShowSimple } from "../../components/show-blob";
import { ErrorPanel } from "../../components/error";

export const ShowEmailTokenPage = () => {
  const { email_token_id } = useParams();
  if (!email_token_id) {
    return (
      <ErrorPanel text="Must have email_token_id" source="ShowEmailTokenPage" />
    );
  }
  return (
    <TabContainer>
      <TabPanel label="Email Token">
        <ShowEmailToken email_token_id={email_token_id} />
      </TabPanel>
    </TabContainer>
  );
};

interface ShowEmailTokenProps {
  email_token_id: string;
}
export const ShowEmailToken = ({ email_token_id }: ShowEmailTokenProps) => {
  return <ShowSimple resource={RESOURCE.email_token} id={email_token_id} />;
};
