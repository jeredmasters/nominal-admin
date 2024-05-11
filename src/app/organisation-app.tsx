import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  CustomRoutes,
  Loading,
} from "react-admin";
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
import simpleRestProvider from "ra-data-json-server";

import * as React from "react";
import { Layout, LayoutProps } from "react-admin";
import { MyAppBar } from "../layout/AppBar";
import { OrganisationMenu } from "../layout/Menu";
import { useParams, Outlet } from "react-router-dom";
import { CreateEmailToken } from "../resources/email-tokens/create-email-token";
import { ShowEmailToken } from "../resources/email-tokens/show-email-token";
import { AuthContext } from "../context/auth.provider";
import { MyLayout } from "../layout/Layout";
import { EditElection } from "../resources/elections/edit-election";
import { ListProfiles } from "../resources/profiles/list-profiles";
import { CreateProfile } from "../resources/profiles/create-profile";
import { ShowProfile } from "../resources/profiles/show-profile";
import { EditCandidate } from "../resources/candidates/edit-candidate";

const OrganisationLayout = (props: LayoutProps) => {
  return <Layout {...props} appBar={MyAppBar} menu={OrganisationMenu as any} />;
};

const IndexPage = () => {
  const { organisation_id } = useParams();
  if (organisation_id == "list") {
    return <ListOrganisations />;
  }
  return <ShowOrganisation />;
};

export const OrganisationApp = () => {
  const { fetch } = React.useContext(AuthContext);
  const dataProvider = React.useMemo(() => {
    if (fetch) {
      return simpleRestProvider("", fetch);
    }
    return null;
  }, [fetch]);
  if (!dataProvider) {
    return <Loading />;
  }
  return (
    <Admin
      dataProvider={dataProvider}
      layout={OrganisationLayout}
      loginPage={Login}
      dashboard={ListOrganisations}
      basename="/organisations/:organisation_id"
    >
      <Outlet />
      <CustomRoutes>
        <Route path="" element={<IndexPage />} />
        <Route path="/" element={<IndexPage />} />
        <Route path="/show" element={<ShowOrganisation />} />
      </CustomRoutes>
      <Resource
        name="organisations"
        recordRepresentation={(record) => record.label}
      />
      <Resource
        name="elections"
        list={ListElections}
        edit={EditElection}
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
        edit={EditCandidate}
        show={ShowCandidate}
        create={CreateCandidate}
        recordRepresentation={(record) =>
          `${record.first_name} ${record.last_name}`
        }
      />{" "}
      <Resource
        name="profiles"
        list={ListProfiles}
        edit={EditGuesser}
        show={ShowProfile}
        create={CreateProfile}
        recordRepresentation={(record) =>
          `${record.version} ${record.last_name}`
        }
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
};
