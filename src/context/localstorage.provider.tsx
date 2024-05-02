import React, {
  createContext,
  useEffect,
  useState,
  PropsWithChildren,
  useCallback,
} from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import jwt from "jwt-encode";
import { IAdminUser } from "../domain/admin-user";
import { API_BASE } from "../config";

export interface ILocalStorageContext {
  getValue: (key: string) => string | null;
  setValue: (key: string, value: string) => void;
  delValue: (key: string) => void;
}

export type IStore = { [key: string]: any };

export const LocalStorageContext = createContext<ILocalStorageContext>({
  getValue: (key: string) => null,
  setValue: (key: string, value: string) => null,
  delValue: (key: string) => null,
});
export const LocalStorageProvider: React.FC<PropsWithChildren> = (props) => {
  const [store, setStore] = useState<IStore>({});

  const getValue = (key: string) => {
    if (key in store) {
      return store[key];
    }
    store[key] = localStorage.getItem(key);
    return store[key];
  };

  const setValue = (key: string, value: string) => {
    localStorage.setItem(key, value);
    setStore({ ...store, [key]: value });
  };

  const delValue = (key: string) => {
    localStorage.removeItem(key);
    setStore((v) => {
      delete v[key];
      return v;
    });
  };

  return (
    <LocalStorageContext.Provider value={{ getValue, setValue, delValue }}>
      {props.children}
    </LocalStorageContext.Provider>
  );
};
