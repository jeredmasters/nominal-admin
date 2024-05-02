import React, {
  createContext,
  useEffect,
  useState,
  PropsWithChildren,
  useContext,
  useCallback,
} from "react";
import { IOrganisation } from "../domain/organisation";

export interface IOrganisationContext {
  organisation: IOrganisation | null;
  setOrganisation: (organisation: IOrganisation) => void;
}

export const OrganisationContext = createContext<IOrganisationContext>({
  organisation: null,
  setOrganisation: (organisation: IOrganisation) => null,
});

export const OrganisationProvider: React.FC<PropsWithChildren> = (props) => {
  const [organisation, setOrganisation] = useState<IOrganisation | null>(null);

  return (
    <OrganisationContext.Provider value={{ organisation, setOrganisation }}>
      {props.children}
    </OrganisationContext.Provider>
  );
};
