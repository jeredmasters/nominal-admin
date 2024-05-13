import React, { useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Box, Typography, Checkbox } from "@mui/material";
import {
  PaginationPayload,
  SortPayload,
  useGetMany,
} from "../context/data.provider";
import { fieldLabel, useShowPath } from "../util";
import { useNavigate } from "react-router-dom";
import { CreateButton } from "./create-button";
import { StatusChip } from "./status-chip";
import { SimpleButton, SimpleButtonProps } from "./simple-button";
import { RESOURCE } from "../const/resources";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
interface SimpleColumn {
  key: string;
  label?: string;
}
interface SimpleColumnR {
  key: string;
  label: string;
}
interface SimpleTableProps {
  label?: string;
  resource: RESOURCE;
  buttons?: SimpleButtonProps[];
  filter?: any;
  columns?: string[] | SimpleColumn[];
  onRowClick?: false | ((row: any, col: SimpleColumnR) => void);
  selectActions?: Array<SimpleButtonProps>;
}
export const SimpleTable = ({
  label,
  resource,
  filter,
  columns,
  buttons,
  onRowClick,
  selectActions,
}: SimpleTableProps) => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<PaginationPayload>({
    page: 1,
    perPage: 50,
  });
  const [sort, setSort] = useState<SortPayload>({
    field: "created_at",
    order: "DESC",
  });
  const showPath = useShowPath(resource);
  const [selected, setSelected] = useState<Array<string>>([]);
  const { data } = useGetMany(resource, { sort, pagination, filter });
  const formattedColumns: Array<SimpleColumnR> = useMemo(() => {
    if (columns && columns.length > 0) {
      return columns.map(
        (c): SimpleColumnR =>
          typeof c === "string"
            ? { key: c, label: fieldLabel(c) }
            : {
                key: c.key,
                label: c.label || fieldLabel(c.key),
              }
      );
    }
    if (data && data.length > 0) {
      const firstRow = data[0];
      return Object.keys(firstRow).map(
        (k): SimpleColumnR => ({
          key: k,
          label: fieldLabel(k),
        })
      );
    }
    return [];
  }, [columns, data]);
  const handleClick = (row: any, col: SimpleColumnR) => {
    if (typeof onRowClick === "function") {
      onRowClick(row, col);
    }
    if (onRowClick !== false) {
      const path = showPath(row.id);
      navigate(path);
    }
  };
  const handleCheck = (id: string) => {
    if (selected.includes(id)) {
      setSelected((s) => s.filter((i) => i !== id));
    } else {
      setSelected((s) => [...s, id]);
    }
  };
  const handleCheckAll = () => {
    if (selected.length > 0) {
      setSelected([]);
    } else if (data) {
      setSelected(data.map((d: any) => d.id));
    }
  };
  console.log({ selected });
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h5">{label || fieldLabel(resource)}</Typography>
        </Box>
        <Box>
          {buttons ? (
            buttons.map((b, i) => <SimpleButton key={i} {...b} />)
          ) : (
            <CreateButton resource={resource} state={filter} />
          )}
        </Box>
      </Box>
      <Box
        p={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: selected.length ? "#d5e5f3" : undefined,
        }}
      >
        {selectActions && selected.length > 0
          ? selectActions.map((sa, i) => (
              <SimpleButton key={i} {...sa} state={{ ...sa.state, selected }} />
            ))
          : null}
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {selectActions ? (
                <TableCell>
                  <Checkbox
                    checked={data ? selected.length === data.length : false}
                    onChange={handleCheckAll}
                    sx={{ p: 0 }}
                  />
                </TableCell>
              ) : null}
              {formattedColumns.map((c, i) => (
                <TableCell key={i} style={{ fontWeight: 700 }}>
                  {c.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    ":hover": { background: "#eee" },
                  }}
                >
                  {selectActions ? (
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(row.id)}
                        onChange={() => handleCheck(row.id)}
                        sx={{ p: 0 }}
                      />
                    </TableCell>
                  ) : null}

                  {formattedColumns.map((c, j) => (
                    <TableCell
                      key={j}
                      sx={{
                        cursor: onRowClick === false ? undefined : "pointer",
                      }}
                      onClick={() => handleClick(row, c)}
                    >
                      <RenderCell col={c} row={row} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

interface RenderCellProps {
  col: SimpleColumn;
  row: any;
}
export const RenderCell = ({ col, row }: RenderCellProps) => {
  const val = row[col.key];

  switch (col.key) {
    case "status":
      return <StatusChip status={row[col.key]} />;
  }
  switch (typeof val) {
    case "string":
      return val;
    case "object":
      return JSON.stringify(val, null, 2);
    default:
      return <pre style={{ margin: 0 }}>{val}</pre>;
  }
};
