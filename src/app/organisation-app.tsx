import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  CustomRoutes,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider2 } from "./authProvider";
import { ShowOrganisation } from "../resources/organisations/show-organisation";
import { Route } from "react-router-dom";
import { ListOrganisations } from "../resources/organisations/list-organisations";
import { ShowVoter } from "../resources/voters/show-voter";
import { CreateElection } from "../resources/elections/create-election";
import { ListCandidates } from "../resources/candidates/list-candidates";
import { ShowCandidate } from "../resources/candidates/show-candidate";
import { ShowElection } from "../resources/elections/show-election";
import { ListVoters } from "../resources/voters/list-voter";
import { ListElections } from "../resources/elections/list-elections";
import { CreateVoter } from "../resources/voters/create-voter";
import { CreateCandidate } from "../resources/candidates/create-candidate";
import { EditVoter } from "../resources/voters/edit-voter";
import { ListBallots } from "../resources/ballots/list-ballots";
import { ShowBallot } from "../resources/ballots/show-ballot";
import { CreateBallot } from "../resources/ballots/create-ballot";
import { Login } from "../layout/Login";

import * as React from "react";
import { Layout, LayoutProps } from "react-admin";
import { MyAppBar } from "../layout/AppBar";
import { OrganisationMenu } from "../layout/Menu";
import { useParams } from "react-router-dom";
import { CreateEmailToken } from "../resources/email-tokens/create-email-token";
import { ShowEmailToken } from "../resources/email-tokens/show-email-token";

const OrganisationLayout = (props: LayoutProps) => {
  return <Layout {...props} appBar={MyAppBar} menu={OrganisationMenu} />;
};

const IndexPage = () => {
  const { organisation_id } = useParams();
  if (organisation_id == "list") {
    return <ListOrganisations />;
  }
  return <ShowOrganisation />;
};

export const OrganisationApp = () => (
  <Admin
    dataProvider={dataProvider}
    layout={OrganisationLayout}
    loginPage={Login}
    dashboard={ListOrganisations}
    basename="/organisations/:organisation_id"
  >
    <CustomRoutes>
      <Route path="" element={<IndexPage />} />
      <Route path="/" element={<IndexPage />} />
      <Route path="/show" element={<ShowOrganisation />} />
    </CustomRoutes>
    <Resource
      name="elections"
      list={ListElections}
      edit={EditGuesser}
      show={ShowElection}
      create={CreateElection}
      recordRepresentation={(record) => record.label}
    />
    <Resource
      name="ballots"
      list={ListBallots}
      edit={EditGuesser}
      show={ShowBallot}
      create={CreateBallot}
      recordRepresentation={(record) => record.label}
    />
    <Resource
      name="voters"
      list={ListVoters}
      edit={EditVoter}
      show={ShowVoter}
      create={CreateVoter}
      recordRepresentation={(r) =>
        `${r.first_name} ${r.last_name} (${r.email})`
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
      show={ShowEmailToken}
      create={CreateEmailToken}
    />
  </Admin>
);
