import * as React from "react";
import { SimpleCreate } from "../../components/simple-create";
import {
  DateInput,
  SelectInput,
  TextInput,
} from "../../components/simple-form";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useLocation } from "react-router-dom";

export const CreateBallot = () => {
  const { state } = useLocation();
  return (
    <TabContainer>
      <TabPanel label="Create Election">
        <SimpleCreate resource="ballots" initialValue={state}>
          <TextInput field="label" sm={8} />
          <SelectInput
            field="response_type"
            options={[
              { value: "YES_NO", label: "Yes/No" },
              { value: "RANKING", label: "Ranking" },
              { value: "PREFERENCE", label: "Preference" },
              { value: "FIRST_PAST", label: "First Past the Post" },
            ]}
            sm={4}
          />
          <DateInput
            label="Opens At"
            field="opens_at"
            defaultValue={new Date()}
          />
          <DateInput
            label="Closes At"
            field="closes_at"
            defaultValue={new Date().setDate(new Date().getDate() + 30)}
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
