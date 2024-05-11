import * as React from "react";
import {
  SimpleForm,
  TextInput,
  ReferenceInput,
  Edit,
  ReferenceField,
  useGetOne,
} from "react-admin";
import { EditPanel } from "../../components/edit-panel";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useParams } from "react-router-dom";

export const EditProfile = () => {
  const { id } = useParams();
  const { data: voter } = useGetOne("profiles", { id });

  return (
    <TabContainer>
      <TabPanel label="Edit Profile">
        <EditPanel resource="profiles">
          <TextInput source="first_name" fullWidth isRequired />
          <TextInput source="last_name" fullWidth isRequired />
          <TextInput source="email" fullWidth isRequired />

          <ReferenceField
            label="Organisation"
            source="organisation_id"
            reference="organisations"
          />
        </EditPanel>
      </TabPanel>
    </TabContainer>
  );
};
