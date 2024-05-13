import * as React from "react";

import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useParams } from "react-router-dom";
import { RESOURCE } from "../../const/resources";
import { ErrorPanel } from "../../components/error";
import { SimpleEdit } from "../../components/simple-edit";
import { TextInput } from "../../components/simple-form";

export const EditProfilePage = () => {
  const { profile_id } = useParams();
  if (!profile_id) {
    return <ErrorPanel text="Must have profile_id" source="EditProfilePage" />;
  }
  return (
    <TabContainer>
      <TabPanel label="Edit Profile">
        <EditProfile profile_id={profile_id} />
      </TabPanel>
    </TabContainer>
  );
};

interface EditProfileProps {
  profile_id: string;
}
export const EditProfile = ({ profile_id }: EditProfileProps) => {
  return (
    <SimpleEdit resource={RESOURCE.profile} id={profile_id}>
      <TextInput field="preferred_name" />
      <TextInput field="statement" multiline={4} />
    </SimpleEdit>
  );
};
