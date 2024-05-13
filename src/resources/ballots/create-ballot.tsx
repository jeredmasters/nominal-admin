import * as React from "react";
import { SimpleCreate } from "../../components/simple-create";
import {
  DateInput,
  SelectInput,
  TextInput,
} from "../../components/simple-form";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useLocation } from "react-router-dom";
import { RESPONSE_TYPE } from "../../const/elections";
import { RESOURCE } from "../../const/resources";

export const CreateBallot = () => {
  const { state } = useLocation();
  return (
    <TabContainer>
      <TabPanel label="Create Ballot">
        <SimpleCreate resource={RESOURCE.ballot} initialValue={state}>
          <TextInput field="label" sm={8} />
          <SelectInput field="response_type" options={RESPONSE_TYPE} sm={4} />
          <DateInput
            label="Opens At"
            field="opens_at"
            defaultValue={new Date()}
            sm={6}
          />
          <DateInput
            label="Closes At"
            field="closes_at"
            defaultValue={new Date().setDate(new Date().getDate() + 30)}
            sm={6}
          />
          <TextInput
            field="short_description"
            multiline={4}
            label="Short description"
          />
        </SimpleCreate>
      </TabPanel>
    </TabContainer>
  );
};
