import React, {
  createContext,
  useEffect,
  useState,
  PropsWithChildren,
  useCallback,
  useContext,
} from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import jwt from "jwt-encode";
import { IAdminUser } from "../domain/admin-user";
import { API_BASE } from "../config";
import { LocalStorageContext } from "./localstorage.provider";
import { IConfig } from "../domain/config";
export enum AUTH_STATUS {
  VERIFYING = "VERIFYING",
  AUTHENTICATED = "AUTHENTICATED",
  UNAUTHENTICATED = "UNAUTHENTICATED",
}
export interface IAuthContext {
  fetch: <T = any>(config: AxiosRequestConfig<T>) => Promise<T>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  user: IAdminUser | null;
  authAt: Date | null;
  status: AUTH_STATUS;
  config: IConfig | null;
}

export interface HttpRequest {}

export const AuthContext = createContext<IAuthContext>({
  fetch: (config: AxiosRequestConfig<any>) => {
    throw new Error("Not authorized");
  },
  login: (email: string, password: string) => Promise.resolve(),
  logout: () => null,
  user: null,
  authAt: null,
  status: AUTH_STATUS.VERIFYING,
  config: null,
});
export const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  const { getValue, setValue, delValue } = useContext(LocalStorageContext);
  const publicKey = getValue("admin_public_key");
  const secretKey = getValue("admin_secret_key");

  const [status, setStatus] = useState<AUTH_STATUS>(AUTH_STATUS.VERIFYING);
  const [authAt, setAuthAt] = useState<Date | null>(null);
  const [user, setUser] = useState<IAdminUser | null>(null);
  const [config, setConfig] = useState<IConfig | null>(null);

  const logout = () => {
    setStatus(AUTH_STATUS.UNAUTHENTICATED);
    delValue("admin_public_key");
    delValue("admin_secret_key");
  };

  const fetch = useCallback(
    (config: AxiosRequestConfig<any>) => {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers["Accept"] = "application/json";
      config.url = API_BASE + config.url;

      if (publicKey && secretKey) {
        var token = jwt({ public_key: publicKey }, secretKey);
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return axios(config).then((response) => response.data);
    },
    [publicKey, secretKey]
  );

  const login = (email: string, password: string) => {
    return axios({
      url: API_BASE + "/login",
      method: "post",
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        const { admin_user_id, public_key, secret_key } = response.data;
        setValue("admin_user_id", admin_user_id);
        setValue("admin_public_key", public_key);
        setValue("admin_secret_key", secret_key);
        return true;
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  };

  useEffect(() => {
    if (publicKey && secretKey) {
      fetch({
        method: "get",
        url: "/auth/status",
      })
        .then((user) => {
          setUser(user);
          setAuthAt(new Date());
          setStatus(AUTH_STATUS.AUTHENTICATED);
          fetch({
            method: "get",
            url: "/auth/config",
          }).then(setConfig);
        })
        .catch(() => logout());
    } else {
      setStatus(AUTH_STATUS.UNAUTHENTICATED);
    }
  }, [fetch, publicKey, secretKey]);

  return (
    <AuthContext.Provider
      value={{ fetch, login, logout, user, authAt, status, config }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
