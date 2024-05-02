import {
  RaRecord,
  useResourceContext,
  useRecordContext,
  useCreatePath,
  Link,
  ButtonProps,
  Button,
} from "react-admin";
import ContentCreate from "@mui/icons-material/Create";
import { ReactElement } from "react";
import { useShowPath } from "../util";

export const ShowButton = <RecordType extends RaRecord = any>(
  props: EditButtonProps<RecordType>
) => {
  const { label = "Show", scrollToTop = true, ...rest } = props;
  const resource = useResourceContext(props);
  const record = useRecordContext(props);
  const showPath = useShowPath();
  if (!record) return null;
  return (
    <Button
      component={Link}
      to={showPath(record.id, resource)}
      label={label}
      onClick={stopPropagation}
      className={EditButtonClasses.root}
      {...(rest as any)}
    >
      <ContentCreate />
    </Button>
  );
};

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = (e: any) => e.stopPropagation();

interface Props<RecordType extends RaRecord = any> {
  icon?: ReactElement;
  label?: string;
  record?: RecordType;
  resource?: string;
  scrollToTop?: boolean;
}

export type EditButtonProps<RecordType extends RaRecord = any> =
  Props<RecordType> & ButtonProps;

const PREFIX = "RaEditButton";

export const EditButtonClasses = {
  root: `${PREFIX}-root`,
};
