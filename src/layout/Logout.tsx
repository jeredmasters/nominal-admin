import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "react-admin";

import { AUTH_STATUS, AuthContext } from "../context/auth.provider";

export const Logout = () => {
  const { logout, status } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const navigateToLogin = () => navigate("/login");
  console.log("LOGOUT PAGE");
  useEffect(() => {
    if (status === AUTH_STATUS.UNAUTHENTICATED) {
      navigateToLogin();
    }
  }, [status]);

  useEffect(logout, []);

  return <Loading />;
};
