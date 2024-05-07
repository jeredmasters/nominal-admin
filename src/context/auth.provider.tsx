import React, {
  createContext,
  useEffect,
  useState,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import jwt from "jwt-encode";
import { IAdminUser } from "../domain/admin-user";
import { API_BASE } from "../config";
import { LocalStorageContext } from "./localstorage.provider";
import { IConfig } from "../domain/config";
import { DataProvider } from "react-admin";

export enum AUTH_STATUS {
  VERIFYING = "VERIFYING",
  AUTHENTICATED = "AUTHENTICATED",
  UNAUTHENTICATED = "UNAUTHENTICATED",
}

export interface IAuthContext {
  fetch:
    | (<T = any>(
        url: string,
        config?: DPRequestOptions
      ) => Promise<DPResponse<T>>)
    | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  user: IAdminUser | null;
  authAt: Date | null;
  status: AUTH_STATUS;
  config: IConfig | null;
}

export interface HttpRequest {}

export interface DPRequestOptions {
  method?: string;
  headers?: any;
  body?: any;
  multipartFormData?: boolean;
}

export interface DPResponse<T = any> {
  status: number;
  headers: Headers | any;
  body: string;
  json: T;
}

const getData = (body?: FormData | any) => {
  if (body && body instanceof FormData) {
    var object: any = {};
    body.forEach(function (value, key) {
      object[key] = value;
    });
    return object;
  }
  return body;
};

export const AuthContext = createContext<IAuthContext>({
  fetch: null,
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

  const fetch = useMemo(() => {
    if (!publicKey || !secretKey) {
      return null;
    }
    return (url: string, config?: DPRequestOptions) => {
      if (!config) {
        config = {
          method: "get",
        };
      }
      if (!config.headers) {
        config.headers = {};
      }

      if (config.multipartFormData !== true) {
        config.headers["Accept"] = "application/json";
        config.headers["Content-Type"] = "application/json";
      }

      if (publicKey && secretKey) {
        var token = jwt({ public_key: publicKey }, secretKey);
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return axios({
        url: API_BASE + "/auth" + url,
        data: config.body,
        ...config,
      }).then(
        (response): DPResponse => ({
          body: response.data,
          json: response.data,
          status: response.status,
          headers: response.headers,
        })
      );
    };
  }, [publicKey, secretKey]);

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
    if (fetch) {
      fetch("/status")
        .then((r) => {
          setUser(r.json);
          setAuthAt(new Date());
          setStatus(AUTH_STATUS.AUTHENTICATED);
          fetch("/config").then((r) => setConfig(r.json));
        })
        .catch(() => logout());
    } else {
      setStatus(AUTH_STATUS.UNAUTHENTICATED);
    }
  }, [fetch, publicKey, secretKey]);

  return (
    <AuthContext.Provider
      value={{
        fetch,
        login,
        logout,
        user,
        authAt,
        status,
        config,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
