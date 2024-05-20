import * as React from "react";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { SimpleCreate } from "../../components/simple-create";
import { SelectInput, TextInput } from "../../components/simple-form";
import { RESOURCE } from "../../const/resources";
import { ORG_OWNER } from "../../domain/organisation";

export const CreateOrganisation = () => {
  return (
    <TabContainer>
      <TabPanel label="New Organisation">
        <SimpleCreate resource={RESOURCE.organisation}>
          <TextInput field="label" />
          <SelectInput field="owner" options={ORG_OWNER} />
          <TextInput field="country" />
        </SimpleCreate>
      </TabPanel>
    </TabContainer>
  );
};
