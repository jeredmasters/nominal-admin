import * as React from "react";
import { RESOURCE } from "../../const/resources";
import { SimpleCreate } from "../../components/simple-create";
import { TextInput } from "../../components/simple-form";
import { useGetOne } from "../../context/data.provider";
import { ErrorPanel } from "../../components/error";
import { useParams } from "react-router-dom";
import { TabContainer, TabPanel } from "../../components/tab-panel";

export const CreateEmailTokenPage = () => {
  const { voter_id } = useParams();
  if (!voter_id) {
    return (
      <ErrorPanel text="Must have voter_id" source="CreateEmailTokenPage" />
    );
  }

  return (
    <TabContainer>
      <TabPanel label="Email Token">
        <CreateEmailToken voter_id={voter_id} />
      </TabPanel>
    </TabContainer>
  );
};

interface CreateEmailTokenProps {
  voter_id: string;
}
export const CreateEmailToken = ({ voter_id }: CreateEmailTokenProps) => {
  return (
    <SimpleCreate resource={RESOURCE.email_token} initialValue={{ voter_id }}>
      <TextInput field="email" />
    </SimpleCreate>
  );
};
