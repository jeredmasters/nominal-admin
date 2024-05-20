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
import { CheckInput } from "../../components/simple-form/check-input";
import { ConditionInput } from "../../components/condition-editor";

export const CreateBallot = () => {
  const { state } = useLocation();
  return (
    <TabContainer>
      <TabPanel label="Create Ballot">
        <SimpleCreate resource={RESOURCE.ballot} initialValue={state}>
          <TextInput field="label" sm={8} />
          <SelectInput field="response_type" options={RESPONSE_TYPE} sm={4} />
          <CheckInput
            field="shuffle_candidates"
            defaultValue={true}
            hide={(f) =>
              ![RESPONSE_TYPE.PREFERENCE, RESPONSE_TYPE.RANKING].includes(
                f.response_type
              )
            }
            sm={12}
          />
          <TextInput field="short_description" multiline={4} />
          <ConditionInput field="voter_filter" />
        </SimpleCreate>
      </TabPanel>
    </TabContainer>
  );
};
