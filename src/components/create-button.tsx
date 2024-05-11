import { Button } from "react-admin";
import AddIcon from "@mui/icons-material/Add";
import { getSingluar, useCreatePath, useEditPath } from "../util";
import { Link } from "react-router-dom";
import { SimpleButton } from "./simple-button";

interface CreateButtonProps {
  resource: string;
  label?: string;
  state?: any;
}
export const CreateButton = ({ resource, label, state }: CreateButtonProps) => {
  let path = useCreatePath(resource);
  console.log({ path });
  return (
    <SimpleButton
      label={label || "New " + getSingluar(resource)}
      href={path}
      state={state}
      icon={<AddIcon />}
    />
  );
};
