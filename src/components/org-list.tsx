import {
  Datagrid,
  ListBase,
  ListProps,
  ListToolbar,
  Pagination,
  RaRecord,
  Title,
  TopToolbar,
} from "react-admin";
import { useShowPath } from "../util";
import { Card } from "@mui/material";
import { useParams } from "react-router-dom";
import CreateButton from "./create-button";

export interface OrgListProps<RecordType extends RaRecord = any>
  extends ListProps<RecordType> {
  resource: string;
  omitOrgFilter?: boolean;
}

export const OrgList = ({
  children,
  actions,
  filters,
  filter,
  title,
  resource,
  omitOrgFilter,
  ...props
}: OrgListProps) => {
  const rowClick = useShowPath();
  const { organisation_id } = useParams();
  if (!filter) {
    filter = {};
  }
  return (
    <ListBase
      resource={resource}
      filter={{
        organisation_id: omitOrgFilter ? undefined : organisation_id,
        ...filter,
      }}
      exporter={false}
      perPage={100}
      {...props}
    >
      <Title title={title} />
      <ListToolbar
        filters={filters}
        actions={
          <TopToolbar>
            <CreateButton
              resource={resource}
              state={{ record: { organisation_id, ...filter } }}
            />
          </TopToolbar>
        }
      />
      <Card>
        <Datagrid rowClick={rowClick}>{children}</Datagrid>
      </Card>
      <Pagination />
    </ListBase>
  );
};
