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
  FormControlLabel,
  FormGroup,
  Checkbox,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { AuthContext } from "../../../context/auth.provider";
import { Button, Loading, TextField } from "react-admin";
import { useParams } from "react-router-dom";
import { parse } from "papaparse";
import { PreviewUpload } from "./preview-upload";
const options = [
  { value: "_ignore_", label: "(ignore)" },
  { value: "first_name", label: "First Name" },
  { value: "last_name", label: "Last Name" },
  { value: "preferred_name", label: "Preferred Name" },
  { value: "email", label: "Email" },
  { value: "tag", label: "Tag" },
];

interface ParseResult {
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
interface UploadConfig {
  election_id: string;
  organisation_id: string;
  first_row_is_headers: boolean;
  delimiter: string;
  linebreak: "\n" | "\r\n";
}
interface ConfigureDigestProps {
  file: File;
  election_id: string;
}

export const ConfigureUpload = ({
  file,
  election_id,
}: ConfigureDigestProps) => {
  const { organisation_id } = useParams();
  const { fetch } = useContext(AuthContext);
  const [rawSample, setRawSample] = useState<string | null>(null);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [columns, setColumns] = useState<any | null>(null);
  const [rowCount, setRowCount] = useState<any | null>(null);

  const [form, setForm] = useState<UploadConfig>({
    election_id,
    organisation_id: organisation_id || "",
    first_row_is_headers: true,
    delimiter: "",
    linebreak: "\n",
  });

  const { first_row_is_headers, delimiter, linebreak } = form;

  useEffect(() => {
    file.text().then((raw): any => {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      if (first_row_is_headers) {
        setRowCount(raw.split("\n").length - 1);
      } else {
        setRowCount(raw.split("\n").length);
      }
      const sample = raw
        .split("\n", 10)
        .slice(0, 9)
        .join("\n")
        .substring(0, 10000);
      setRawSample(sample);
      const parsed: ParseResult = parse<string[]>(sample, {
        delimiter,
      });
      setParseResult(parsed);
      setForm({
        ...form,
        delimiter: parsed.meta.delimiter,
        linebreak: parsed.meta.linebreak as any,
      });
      console.log("parsed", parsed);
    });
  }, [file, delimiter, linebreak]);

  const parsedWell =
    parseResult &&
    parseResult.data.length > 3 &&
    parseResult.data[0].length > 1 &&
    !parseResult.meta.aborted;

  if (!organisation_id) {
    return <div>organisation_id is required</div>;
  }

  if (!fetch || !parseResult) {
    return <Loading />;
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("organisation_id", organisation_id);
    formData.append("election_id", election_id);
    formData.append(
      "first_row_is_headers",
      first_row_is_headers ? "true" : "false"
    );
    formData.append("delimiter", delimiter);
    formData.append("linebreak", linebreak.toString());
    formData.append("columns", JSON.stringify(columns));

    fetch(`/voter_digests/upload`, {
      method: "post",
      body: formData,
      multipartFormData: true,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Grid container p={1}>
      <Grid item xs={12}>
        <Typography variant="h5">Review Upload</Typography>
        <form>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.first_row_is_headers}
                  onChange={() =>
                    setForm({
                      ...form,
                      first_row_is_headers: !form.first_row_is_headers,
                    })
                  }
                />
              }
              label="First row is header"
            />
            <FormControl>
              <MuiTextField
                label="Delimiter"
                value={delimiter.replace("\t", "\\t")}
                onChange={(e) =>
                  setForm({
                    ...form,
                    delimiter: e.target.value.replace("\\t", "\t"),
                  })
                }
                select
              >
                <MenuItem value=",">,</MenuItem>
                <MenuItem value=";">;</MenuItem>
                <MenuItem value=":">:</MenuItem>
                <MenuItem value="\t">\t</MenuItem>
              </MuiTextField>
            </FormControl>
            <FormControl>
              <MuiTextField
                label="New line"
                value={
                  linebreak
                    ? linebreak.replace("\r\n", "\\r\\n").replace("\n", "\\n")
                    : undefined
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    linebreak: e.target.value
                      .replace("\\r\\n", "\r\n")
                      .replace("\\n", "\n") as any,
                  })
                }
                select
              >
                <MenuItem value="\n">\n</MenuItem>
                <MenuItem value="\r\n">\r\n</MenuItem>
              </MuiTextField>
            </FormControl>
          </FormGroup>
        </form>
      </Grid>
      {!parsedWell ? (
        <Grid item xs={12} p={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Raw file content</Typography>
          </Grid>
          <Grid item xs={12}>
            <pre>{rawSample}</pre>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <PreviewUpload
            parseResult={parseResult}
            first_row_is_headers={first_row_is_headers}
            onChange={setColumns}
          />
          <Typography>Total rows: {rowCount}</Typography>
        </Grid>
      )}
      <Grid item xs={12} mt={2}>
        <Button
          type="button"
          label="Submit"
          variant="contained"
          size="large"
          sx={{ justifyContent: "flex-end" }}
          onClick={handleSubmit}
        ></Button>
      </Grid>
    </Grid>
  );
};
