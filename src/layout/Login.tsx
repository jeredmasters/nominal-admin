import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import {
  Form,
  required,
  TextInput,
  useTranslate,
  useNotify,
  Loading,
} from "react-admin";

import Box from "@mui/material/Box";
import { AUTH_STATUS, AuthContext } from "../context/auth.provider";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const translate = useTranslate();

  const notify = useNotify();
  const { login, status } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const navigateToDashboard = () => navigate("/organisations");

  useEffect(() => {
    if (status === AUTH_STATUS.AUTHENTICATED) {
      navigateToDashboard();
    }
  }, [status]);

  const handleSubmit = ({ email, password }: FormValues) => {
    if (!email || !password) {
      return false;
    }
    setLoading(true);
    login(email, password)
      .then(navigateToDashboard)
      .catch((error: Error) => {
        setLoading(false);
        notify(
          typeof error === "string"
            ? error
            : typeof error === "undefined" || !error.message
            ? "ra.auth.sign_in_error"
            : error.message,
          {
            type: "error",
            messageArgs: {
              _:
                typeof error === "string"
                  ? error
                  : error && error.message
                  ? error.message
                  : undefined,
            },
          }
        );
      });
  };

  if (status === AUTH_STATUS.VERIFYING) {
    return <Loading />;
  }

  return (
    <Form
      onSubmit={handleSubmit}
      noValidate
      defaultValues={{
        email: "admin@example.com",
        password: "asdf1234",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "flex-start",
          background: "url(https://source.unsplash.com/featured/1600x900)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Card sx={{ minWidth: 300, marginTop: "6em" }}>
          <Box
            sx={{
              margin: "1em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              <LockIcon />
            </Avatar>
          </Box>
          <Box
            sx={{
              marginTop: "1em",
              display: "flex",
              justifyContent: "center",
              color: (theme) => theme.palette.grey[700],
            }}
          >
            Nominal Admin
          </Box>
          <Box sx={{ padding: "0 1em 1em 1em" }}>
            <Box sx={{ marginTop: "1em" }}>
              <TextInput
                autoFocus
                source="email"
                label={translate("ra.auth.username")}
                //disabled={loading}
                validate={required()}
                fullWidth
              />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <TextInput
                source="password"
                label={translate("ra.auth.password")}
                type="password"
                //disabled={loading}
                validate={required()}
                fullWidth
              />
            </Box>
          </Box>
          <CardActions sx={{ padding: "0 1em 1em 1em" }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading && <CircularProgress size={25} thickness={2} />}
              {translate("ra.auth.sign_in")}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Form>
  );
};

Login.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

interface FormValues {
  email?: string;
  password?: string;
}
