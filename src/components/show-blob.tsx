import {
  Grid,
  Box,
  TableContainer,
  Table,
  Typography,
  TableRow,
  TableCell,
  TableBody,
  Card,
} from "@mui/material";
import {
  MouseEventHandler,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { EditButton } from "./edit-button";
import { SimpleButton, SimpleButtonProps } from "./simple-button";
import { StatusChip } from "./status-chip";
import { useGetOne } from "../context/data.provider";
import { fieldLabel } from "../util";
import { RESOURCE } from "../const/resources";
import { SimpleLoading } from "./loading";
import { getSingluar } from "../util/resource";

interface ShowPanelProps extends PropsWithChildren {
  resource: RESOURCE;
  id: string;
  title?: string;
  keys?: string[];
  editable?: boolean;
  buttons?: Array<SimpleButtonProps>;
}

export const ShowSimple = ({
  resource,
  id,
  children,
  editable,
  buttons,
  keys,
  title,
}: ShowPanelProps) => {
  const data = useGetOne(resource, id);
  const useKeys = useMemo(
    () => (keys ? keys : data ? Object.keys(data) : []),
    [data, keys]
  );
  if (!data) {
    return <SimpleLoading />;
  }
  if (!title) {
    title = getSingluar(resource) + " Details";
  }

  return (
    <Grid container>
      {title ? (
        <Grid item xs={12}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
      ) : null}
      <Grid item sm={9}>
        <Box mt={2} mb={2}>
          <Card variant="outlined">
            <TableContainer sx={{ maxWidth: 800 }}>
              <Table size="small">
                <TableBody>
                  {useKeys.map((k) => (
                    <TableRow
                      key={k}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{ width: 200, fontWeight: 700 }}>
                        {fieldLabel(k)}
                      </TableCell>
                      <TableCell>{formatValue(k, data[k])}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Grid>
      <Grid item sm={3}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box>
            {editable !== false ? (
              <Box>
                <EditButton resource={resource} id={id} />
              </Box>
            ) : null}
            {buttons &&
              buttons.map((b, i) => (
                <Box key={i}>
                  <SimpleButton {...b} />
                </Box>
              ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

const formatValue = (key: string, value: any) => {
  switch (key) {
    case "status":
      return <StatusChip status={value} />;
  }
  switch (typeof value) {
    case "bigint":
    case "number":
    case "boolean":
      return <pre>{value.toString()}</pre>;
    case "string":
      if (/^\d{4}-\d{2}-\d{2}T\d\d:\d\d:\d\d.\d{3}Z$/.test(value)) {
        const date = new Date(value);
        return (
          <>
            <Typography variant="body1">{date.toLocaleDateString()}</Typography>
            <Typography variant="body2">
              {" "}
              ({date.toLocaleTimeString()})
            </Typography>
          </>
        );
      }
      return value;
    case "object":
      return <pre style={{ margin: 0 }}>{JSON.stringify(value, null, 2)}</pre>;
  }
};
