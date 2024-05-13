import * as React from "react";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useLocation } from "react-router-dom";
import { SimpleCreate } from "../../components/simple-create";
import { TextInput } from "../../components/simple-form";
import { ErrorPanel } from "../../components/error";
import { RESOURCE } from "../../const/resources";

export const CreateOrganisation = () => {
  return (
    <TabContainer>
      <TabPanel label="New Organisation">
        <SimpleCreate resource={RESOURCE.organisation}>
          <TextInput field="label" />
        </SimpleCreate>
      </TabPanel>
    </TabContainer>
  );
};
