import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { AdminApp } from "./admin-app";
import { OrganisationApp } from "./organisation-app";
import { AUTH_STATUS, AuthContext } from "../context/auth.provider";
import { Loading } from "react-admin";
import { Login } from "../layout/Login";
import { Logout } from "../layout/Logout";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useMatches,
} from "react-router-dom";
import { ShowOrganisation } from "../resources/organisations/show-organisation";
import { SimpleLayout } from "../layout/simple-layout";
import { ListOrganisations } from "../resources/organisations/list-organisations";
import { ShowElection } from "../resources/elections/show-election";
import { ShowVoter } from "../resources/voters/show-voter";
import { EditVoter } from "../resources/voters/edit-voter";
import { CreateElection } from "../resources/elections/create-election";
import { CreateBallot } from "../resources/ballots/create-ballot";
import { ShowBallot } from "../resources/ballots/show-ballot";
import { CreateCandidate } from "../resources/candidates/create-candidate";
import { ShowCandidate } from "../resources/candidates/show-candidate";
import { EditCandidate } from "../resources/candidates/edit-candidate";
import { CreateProfile } from "../resources/profiles/create-profile";
import { EditProfile } from "../resources/profiles/edit-profile";
import { ShowProfile } from "../resources/profiles/show-profile";
import { CreateVoter } from "../resources/voters/create-voter";

interface Redirect {
  to: string;
}
const Redirect = ({ to }: Redirect) => {
  const navigate = useNavigate();
  useEffect(() => navigate(to), []);
  console.log(useMatches());
  return <Loading />;
};

const ProtectedRoutes = () => {
  const { status } = useContext(AuthContext);

  switch (status) {
    case AUTH_STATUS.VERIFYING:
      return <Loading />;
    case AUTH_STATUS.UNAUTHENTICATED:
      return <Redirect to="/login" />;
    case AUTH_STATUS.AUTHENTICATED:
      return <Outlet />;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Redirect to="/organisations" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logoutasdf",
    element: <Logout />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/organisations-old",
        children: [
          {
            path: "",
            element: <Redirect to="/organisations-old/list" />,
          },
          {
            path: ":organisation_id/*",
            element: <OrganisationApp />,
          },
        ],
      },
      {
        path: "/organisations",
        element: <SimpleLayout />,
        children: [
          {
            index: true,
            element: <ListOrganisations />,
          },
          {
            path: ":organisation_id",
            element: <ShowOrganisation />,
          },
          {
            path: ":organisation_id/elections/create",
            element: <CreateElection />,
          },
          {
            path: ":organisation_id/elections/:election_id",
            element: <ShowElection />,
          },
          {
            path: ":organisation_id/elections/:election_id/voters/create",
            element: <CreateVoter />,
          },
          {
            path: ":organisation_id/elections/:election_id/voters/:voter_id",
            element: <ShowVoter />,
          },
          {
            path: ":organisation_id/elections/:election_id/voters/:voter_id/edit",
            element: <EditVoter />,
          },
          {
            path: ":organisation_id/elections/:election_id/ballots/create",
            element: <CreateBallot />,
          },
          {
            path: ":organisation_id/elections/:election_id/ballots/:ballot_id",
            element: <ShowBallot />,
          },
          {
            path: ":organisation_id/elections/:election_id/candidates/create",
            element: <CreateCandidate />,
          },
          {
            path: ":organisation_id/elections/:election_id/candidates/:candidate_id",
            element: <ShowCandidate />,
          },
          {
            path: ":organisation_id/elections/:election_id/candidates/:candidate_id/edit",
            element: <EditCandidate />,
          },
          {
            path: ":organisation_id/elections/:election_id/candidates/:candidate_id/profiles/create",
            element: <CreateProfile />,
          },
          {
            path: ":organisation_id/elections/:election_id/candidates/:candidate_id/profiles/:profile_id",
            element: <ShowProfile />,
          },
          {
            path: ":organisation_id/elections/:election_id/candidates/:candidate_id/profiles/:profile_id/edit",
            element: <EditProfile />,
          },
        ],
      },
      {
        path: "/admin/*",
        element: <AdminApp />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
