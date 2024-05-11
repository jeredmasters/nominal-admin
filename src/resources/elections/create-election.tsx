import * as React from "react";
import { useLocation } from "react-router-dom";
import { SimpleCreate } from "../../components/simple-create";
import {
  DateInput,
  SelectInput,
  TextInput,
} from "../../components/simple-form";
import { TabContainer, TabPanel } from "../../components/tab-panel";

const getFutureDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export const CreateElection = () => {
  const { state } = useLocation();
  return (
    <TabContainer>
      <TabPanel label="Create Election">
        <SimpleCreate resource="elections" initialValue={state}>
          <TextInput field="label" sm={8} />
          <SelectInput
            field="response_type"
            sm={4}
            options={[
              { value: "YES_NO", label: "Yes/No" },
              { value: "RANKING", label: "Ranking" },
              { value: "PREFERENCE", label: "Preference" },
              { value: "FIRST_PAST", label: "First Past the Post" },
            ]}
          />

          <DateInput
            label="Opens At"
            field="opens_at"
            defaultValue={new Date()}
            sm={6}
          />
          <DateInput
            label="Closes At"
            field="closes_at"
            defaultValue={getFutureDate(30)}
            sm={6}
          />

          <TextInput
            field="short_description"
            multiline={4}
            label="Short description"
            xs={12}
          />
        </SimpleCreate>
      </TabPanel>
    </TabContainer>
  );
};
