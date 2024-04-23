import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { Layout, Login } from "./layout";
import { Dashboard } from "./dashboard";
import { ShowOrganisation } from "./resources/organisations/show-organisation";
import { Route } from "react-router-dom";
import { ListOrganisations } from "./resources/organisations/list-organisations";
import { ShowVoter } from "./resources/voters/show-voter";
import { CreateElection } from "./resources/elections/create-election";
import { ListCandidates } from "./resources/candidates/list-candidates";
import { ShowCandidate } from "./resources/candidates/show-candidate";
import { ShowElection } from "./resources/elections/show-election";
import { ListVoters } from "./resources/voters/list-voter";
import { ListElections } from "./resources/elections/list-elections";
import { CreateVoter } from "./resources/voters/create-voter";
import { CreateCandidate } from "./resources/candidates/create-candidate";

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    layout={Layout}
    loginPage={Login}
    dashboard={Dashboard}
  >
    <Resource
      name="elections"
      list={ListElections}
      edit={EditGuesser}
      show={ShowElection}
      create={CreateElection}
      recordRepresentation={(record) => record.label}
    />

    <Resource
      name="organisations"
      list={ListOrganisations}
      edit={EditGuesser}
      show={ShowOrganisation}
      recordRepresentation={(record) => record.label}
    ></Resource>
    <Resource
      name="voters"
      list={ListVoters}
      edit={EditGuesser}
      show={ShowVoter}
      create={CreateVoter}
      recordRepresentation={(record) =>
        record.first_name + " " + record.last_name
      }
    />
    <Resource
      name="candidates"
      list={ListCandidates}
      edit={EditGuesser}
      show={ShowCandidate}
      create={CreateCandidate}
      recordRepresentation={(record) => record.label}
    />
    <Resource
      name="enrolments"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      recordRepresentation={(record) => record.label}
    />
    <Resource
      name="email-tokens"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);
