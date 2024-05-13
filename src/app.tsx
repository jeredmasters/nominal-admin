import React, { useContext, useEffect } from "react";
import { useNavigate, RouteObject } from "react-router-dom";
import { AUTH_STATUS, AuthContext } from "./context/auth.provider";
import { Login } from "./layout/Login";
import { Logout } from "./layout/Logout";
import {
  createBrowserRouter,
  RouterProvider,
  useMatches,
} from "react-router-dom";
import { SimpleLayout } from "./layout/simple-layout";
import { SimpleLoading } from "./components/loading";
import { resourceToRoutes } from "./util/resource";
import { ORG_ROUTES } from "./resource-routes";

interface Redirect {
  to: string;
}
const Redirect = ({ to }: Redirect) => {
  const navigate = useNavigate();
  useEffect(() => navigate(to), []);
  console.log(useMatches());
  return <SimpleLoading />;
};

const ProtectedRoutes = () => {
  const { status } = useContext(AuthContext);

  switch (status) {
    case AUTH_STATUS.VERIFYING:
      return <SimpleLoading />;
    case AUTH_STATUS.UNAUTHENTICATED:
      return <Redirect to="/login" />;
    case AUTH_STATUS.AUTHENTICATED:
      return <SimpleLayout />;
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
    path: "/",
    children: [resourceToRoutes(ORG_ROUTES)],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
