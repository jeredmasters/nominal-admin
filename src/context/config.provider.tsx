import React, { createContext, useState, PropsWithChildren } from "react";
import { IConfig } from "../domain/config";

export interface IConfigContext {
  config: IConfig | null;
}

export const ConfigContext = createContext<IConfigContext>({
  config: null,
});

export const ConfigProvider: React.FC<PropsWithChildren> = (props) => {
  const [config, setConfig] = useState<IConfig | null>(null);

  return (
    <ConfigContext.Provider value={{ config }}>
      {props.children}
    </ConfigContext.Provider>
  );
};
