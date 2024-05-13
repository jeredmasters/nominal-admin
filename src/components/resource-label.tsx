import { FC } from "react";
import { RESOURCE } from "../const/resources";
import { useGetLabel } from "../context/data.provider";

interface ResourceLabelProps {
  resource: RESOURCE;
  id: string;
}

export const ResourceLabel = ({ resource, id }: ResourceLabelProps) => {
  const label = useGetLabel(resource, id);

  return <span>{label}</span>;
};
