import React, { createContext, useState, PropsWithChildren } from "react";

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
  const [store, setStore] = useState<IStore>({ ...localStorage });

  const getValue = (key: string) => {
    if (key in store) {
      return store[key];
    }
    store[key] = localStorage.getItem(key);
    return store[key];
  };

  const setValue = (key: string, value: string) => {
    localStorage.setItem(key, value);
    setStore({ ...localStorage });
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
