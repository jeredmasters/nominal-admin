import AddIcon from "@mui/icons-material/Add";
import { useCreatePath } from "../util";
import { SimpleButton } from "./simple-button";
import { RESOURCE } from "../const/resources";
import { getSingluar } from "../util/resource";

interface CreateButtonProps {
  resource: RESOURCE;
  label?: string;
  state?: any;
}
export const CreateButton = ({ resource, label, state }: CreateButtonProps) => {
  let path = useCreatePath(resource);
  return (
    <SimpleButton
      label={label || "New " + getSingluar(resource)}
      href={path}
      state={state}
      icon={<AddIcon />}
    />
  );
};
