import React, {
  ChangeEventHandler,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Grid,
  Typography,
  TextField as MuiTextField,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  MenuItem,
  FormControl,
} from "@mui/material";
import { AuthContext } from "../../../context/auth.provider";
import { Loading } from "react-admin";

const options = [
  { value: "_ignore_", label: "(ignore)" },
  { value: "first_name", label: "First Name" },
  { value: "last_name", label: "Last Name" },
  { value: "preferred_name", label: "Preferred Name" },
  { value: "email", label: "Email" },
  { value: "tag", label: "Tag" },
];

export interface ParseResult {
  data: Array<string[]>;
  errors: Array<any>;
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
  };
}

interface ConfigureDigestProps {
  parseResult: ParseResult;
  first_row_is_headers: boolean;
  onChange: (columns: Array<ColumnAssignment>) => void;
}
interface ColumnAssignment {
  index: number;
  label: string;
  target: string | null;
}

const getDefaultAssign = (column: string) => {
  switch (column.toLocaleLowerCase().replace(/[_-\s]/, "")) {
    case "firstname":
      return "first_name";
    case "lastname":
      return "last_name";
    case "preferredname":
      return "preferred_name";
    case "email":
    case "emailaddress":
      return "email";
  }
  return "_ignore_";
};

export const PreviewUpload = ({
  parseResult,
  first_row_is_headers,
  onChange,
}: ConfigureDigestProps) => {
  const { fetch } = useContext(AuthContext);
  const [parsedHeaders, setParsedHeaders] =
    useState<Array<ColumnAssignment> | null>(null);

  const parsedSample = useMemo((): Array<string[]> | null => {
    if (!parseResult) {
      return null;
    }
    if (first_row_is_headers) {
      return parseResult.data.slice(1, 9);
    }
    return parseResult.data.slice();
  }, [parseResult, first_row_is_headers]);
  useEffect(() => {
    if (!parseResult) {
      setParsedHeaders(null);
      return;
    }
    if (first_row_is_headers) {
      console.log({ first_row_is_headers }, parseResult.data[0]);
      setParsedHeaders(
        parseResult.data[0].map((h, i) => ({
          index: i,
          label: h,
          target: getDefaultAssign(h),
        }))
      );
      return;
    }
    setParsedHeaders(
      parseResult.data[0].map((h, i) => ({
        index: i,
        label: i.toString(),
        target: "_ignore_",
      }))
    );
  }, [parseResult, first_row_is_headers]);

  useEffect(() => {
    console.log("onChange");
    if (parsedHeaders) onChange(parsedHeaders);
  }, [parsedHeaders]);

  if (!fetch) {
    return <Loading />;
  }

  const handleAssign = (index: number, value: string) => {
    console.log({ index, value });
    if (parsedHeaders) {
      setParsedHeaders(
        parsedHeaders.map(
          (h): ColumnAssignment =>
            h.index !== index ? h : { ...h, target: value }
        )
      );
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell component="th" sx={{ background: "lightgrey" }}>
              Use As
            </TableCell>
            {parsedHeaders &&
              parsedHeaders.map((h) => (
                <TableCell
                  key={h.index}
                  component="th"
                  sx={{ m: 0, p: 0, minWidth: 120 }}
                >
                  <FormControl
                    sx={{
                      m: 0,
                      p: 0,
                      width: "100%",
                    }}
                    size="small"
                  >
                    <MuiTextField
                      sx={{
                        m: 0,
                        p: 0,
                      }}
                      select
                      value={h.target}
                      onChange={(e) => handleAssign(h.index, e.target.value)}
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </MuiTextField>
                  </FormControl>
                </TableCell>
              ))}
          </TableRow>
          {first_row_is_headers ? (
            <TableRow>
              <TableCell component="th" sx={{ background: "lightgrey" }}>
                Header
              </TableCell>
              {parsedHeaders &&
                parsedHeaders.map((h) => (
                  <TableCell key={h.index} component="th">
                    {h.label}
                  </TableCell>
                ))}
            </TableRow>
          ) : null}
        </TableHead>
        <TableBody>
          {parsedSample &&
            parsedSample.map((r, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row" sx={{ background: "lightgrey" }}>
                  {i}
                </TableCell>

                {r.map((c, i) => (
                  <TableCell
                    scope="row"
                    sx={
                      parsedHeaders &&
                      parsedHeaders[i] &&
                      parsedHeaders[i].target !== "_ignore_"
                        ? {
                            background: "#EFE",
                          }
                        : {
                            color: "#CCC",
                          }
                    }
                  >
                    {c}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
