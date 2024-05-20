import { Chip } from "@mui/material";
type color =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";
const colorMap: { [status: string]: color } = {
  // profile status
  NEW: "secondary",
  REJECTED: "error",
  CANCELLED: "warning",
  APPROVED: "success",
  DEPRECATED: "default",

  // election status
  DRAFT: "secondary",
  NOMINATIONS: "info",
  RUNNING: "error",
  VOTING: "error",
  COMPLETE: "success",
};
interface StatusChipProps {
  status: string;
}
export const StatusChip = ({ status }: StatusChipProps) => {
  return <Chip size="small" label={status} color={colorMap[status]} />;
};
