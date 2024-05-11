import ContentCreate from "@mui/icons-material/Create";
import { useEditPath } from "../util";
import { Link } from "react-router-dom";
import { SimpleButton } from "./simple-button";

interface EditButtonProps {
  resource: string;
  id: string;
}
export const EditButton = ({ resource, id }: EditButtonProps) => {
  const editPath = useEditPath(resource);
  const path = editPath(id);
  return <SimpleButton href={path} label={"Edit"} icon={<ContentCreate />} />;
};
