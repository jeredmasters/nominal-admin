import {
  Identifier,
  RaRecord,
  UseRecordContextParams,
  useRecordContext,
} from "react-admin";

interface IdFieldProps extends UseRecordContextParams<RaRecord<Identifier>> {
  source?: string;
}
export const IdField = (props: IdFieldProps) => {
  let { source } = props;
  if (!source) {
    source = "id";
  }
  const record = useRecordContext(props);
  return record ? <span>{String(record[source]).substring(0, 8)}</span> : null;
};

IdField.defaultProps = { label: "ID" };
