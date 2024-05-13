import * as React from "react";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useParams } from "react-router-dom";
import { SimpleEdit } from "../../components/simple-edit";
import { ErrorPanel } from "../../components/error";
import { TextInput } from "../../components/simple-form";
import { RESOURCE } from "../../const/resources";

export const EditOrganisation = () => {
  const { organisation_id } = useParams();
  if (!organisation_id) {
    return (
      <ErrorPanel text="Must have organisation_id" source="EditOrganisation" />
    );
  }
  return (
    <TabContainer>
      <TabPanel label="Edit Voter">
        <SimpleEdit resource={RESOURCE.organisation} id={organisation_id}>
          <TextInput field="label" />
        </SimpleEdit>
      </TabPanel>
    </TabContainer>
  );
};
