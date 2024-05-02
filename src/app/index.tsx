import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { AdminApp } from "./admin-app";
import { OrganisationApp } from "./organisation-app";
import { AUTH_STATUS, AuthContext } from "../context/auth.provider";
import { Loading } from "react-admin";
import { Login } from "../layout/Login";
import { Logout } from "../layout/Logout";

export const App = () => {
  const { status } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(
    () =>
      status === AUTH_STATUS.UNAUTHENTICATED ? navigate("/login") : undefined,
    [status]
  );
  if (status === AUTH_STATUS.VERIFYING) {
    return <Loading />;
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/organisations">
        <Route index element={<Redirect to="list" />} />

        <Route path=":organisation_id/*" element={<OrganisationApp />} />
      </Route>

      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  );
};

interface Redirect {
  to: string;
}
const Redirect = ({ to }: Redirect) => {
  const navigate = useNavigate();
  useEffect(() => navigate(to), []);
  return <Loading />;
};
