import ContentCreate from "@mui/icons-material/Create";
import { useEditPath } from "../util";
import { SimpleButton } from "./simple-button";
import { RESOURCE } from "../const/resources";

interface EditButtonProps {
  resource: RESOURCE;
  id: string;
}
export const EditButton = ({ resource, id }: EditButtonProps) => {
  const editPath = useEditPath(resource);
  const path = editPath(id);
  return <SimpleButton href={path} label={"Edit"} icon={<ContentCreate />} />;
};
