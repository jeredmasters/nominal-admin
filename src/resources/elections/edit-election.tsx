import * as React from "react";
import { useLocation } from "react-router-dom";
import { SimpleCreate } from "../../components/simple-create";
import {
  DateInput,
  SelectInput,
  TextInput,
} from "../../components/simple-form";
import { TabContainer, TabPanel } from "../../components/tab-panel";
import { useParams } from "react-router-dom";
import { SimpleEdit } from "../../components/simple-edit";
import { ErrorPanel } from "../../components/error";

export const EditElection = () => {
  const { election_id } = useParams();
  if (!election_id) {
    return <ErrorPanel text="Must have election_id" source="EditElection" />;
  }
  return (
    <TabContainer>
      <TabPanel label="Edit Election">
        <SimpleEdit resource="elections" id={election_id}>
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
            defaultValue={new Date().toLocaleDateString()}
            sm={6}
          />
          <DateInput
            label="Closes At"
            field="closes_at"
            defaultValue={new Date().toLocaleDateString()}
            sm={6}
          />

          <TextInput
            field="short_description"
            multiline={4}
            label="Short description"
            xs={12}
          />
        </SimpleEdit>
      </TabPanel>
    </TabContainer>
  );
};
