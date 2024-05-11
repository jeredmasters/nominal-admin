import {
  Datagrid,
  ListBase,
  ListProps,
  ListToolbar,
  Pagination,
  RaRecord,
  TopToolbar,
} from "react-admin";
import { useShowPath } from "../util";
import { CreateButton } from "./create-button";

export interface OrgListProps<RecordType extends RaRecord = any>
  extends ListProps<RecordType> {
  resource: string;
}

export const ListPanel = ({
  children,
  actions,
  filters,
  filter,
  resource,
  ...props
}: OrgListProps) => {
  const rowClick = useShowPath(resource);
  if (!filter) {
    filter = {};
  }
  return (
    <ListBase
      resource={resource}
      filter={{
        ...filter,
      }}
      exporter={false}
      perPage={50}
      {...props}
    >
      <ListToolbar
        filters={filters}
        actions={
          <TopToolbar>
            <CreateButton resource={resource} state={filter} />
          </TopToolbar>
        }
      />
      <Datagrid resource={resource} rowClick={rowClick}>
        {children}
      </Datagrid>
      <Pagination />
    </ListBase>
  );
};
