import {
  ChangeEventHandler,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Card,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { fieldLabel } from "../util";
import {
  CONDITION_TYPE,
  VoterCondition,
  VoterCondition_Many,
  VoterCondition_ValueEquals,
} from "../domain/conditions";
import { SimpleButton } from "./simple-button";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.provider";
import { SimpleAccordion } from "./simple-accordion";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { InputProps, InputWrapper } from "./simple-form/input-wrapper";
import { FormContext } from "./simple-form/util";
import { ErrorPanel } from "./error";

interface ConditionInputProps extends InputProps {}
export const ConditionInput = (props: ConditionInputProps) => {
  const { election_id } = useParams();
  const { field, label } = props;

  const { form, setForm } = useContext(FormContext);

  const value = form[field];

  const { fetch } = useContext(AuthContext);
  const [data, setData] = useState<any>(null);
  const [timer, setTimer] = useState<any>(null);

  if (!fetch) {
    return <ErrorPanel text="Must have fetch" source="ConditionInput" />;
  }
  const fetchVoters = () => {
    console.log("filter fetch");

    fetch(`/elections/${election_id}/filter_voters`, {
      method: "post",
      body: value,
    }).then((r) => {
      setData(r.json);
    });
  };
  useEffect(() => {
    console.log("filter useEffect");
    if (data === null) {
      fetchVoters();
      return;
    }
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(setTimeout(fetchVoters, 500));
  }, [value]);

  const handleChange = (condition: VoterCondition) => {
    setForm({ ...form, [field]: condition });
  };
  const handleAllCheckbox = () => {
    if (value) {
      setForm({
        ...form,
        [field]: undefined,
      });
    } else {
      setForm({
        ...form,
        [field]: getDefaultForType(CONDITION_TYPE.TAG_EQUALS),
      });
    }
  };

  return (
    <InputWrapper {...props}>
      <Card sx={{ background: "#f6eedf" }}>
        <Box p={2} sx={{ background: "#f6eedf" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={value === undefined}
                onChange={handleAllCheckbox}
                sx={{ paddingTop: 0, paddingBottom: 0 }}
              />
            }
            label="Send to all voters in this election"
          />
          {value ? (
            <Box>
              <Typography variant="button">Conditions</Typography>
              <ConditionBase value={value} onChange={handleChange} />
            </Box>
          ) : null}
        </Box>
        <SimpleAccordion title={data ? `Voters (${data.total})` : "Voters"}>
          {data ? (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 250 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>First name</TableCell>
                    <TableCell>Last name</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.voters.map((row: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.first_name}</TableCell>
                      <TableCell>{row.last_name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                  ))}
                  {data.voters.length < data.total ? (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell colSpan={3} align="center">
                        .... {data.total} rows ...
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </SimpleAccordion>
      </Card>
    </InputWrapper>
  );
};

const getDefaultForType = (type: CONDITION_TYPE): VoterCondition => {
  switch (type) {
    case CONDITION_TYPE.TAG_EQUALS:
    case CONDITION_TYPE.PROP_EQUALS:
      return {
        type: type,
        key: "",
        value: "",
        split_lines: false,
      };
    case CONDITION_TYPE.MEETS_ALL:
    case CONDITION_TYPE.MEETS_ANY:
      return {
        type: type,
        conditions: [getDefaultForType(CONDITION_TYPE.TAG_EQUALS)],
      };
  }
};

interface ConditionBaseProps {
  value: VoterCondition;
  onChange: (v: VoterCondition) => void;
}
const ConditionBase = ({ value, onChange }: ConditionBaseProps) => {
  const { type } = value;
  const child = useMemo(() => {
    switch (type) {
      case CONDITION_TYPE.TAG_EQUALS:
      case CONDITION_TYPE.PROP_EQUALS:
        return <TagCondition value={value} onChange={onChange} />;
      case CONDITION_TYPE.MEETS_ALL:
      case CONDITION_TYPE.MEETS_ANY:
        return <ConditionMany value={value} onChange={onChange} />;
    }
  }, [type, value, onChange]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>

          <Select
            label="Type"
            value={type}
            onChange={(e) =>
              onChange(getDefaultForType(e.target.value as CONDITION_TYPE))
            }
          >
            {Object.keys(CONDITION_TYPE).map((o) => (
              <MenuItem key={o} value={o}>
                {o}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        {child}
      </Grid>
    </Grid>
  );
};

interface TagConditionProps {
  value: VoterCondition_ValueEquals;
  onChange: (v: VoterCondition_ValueEquals) => void;
}
const TagCondition = ({ value, onChange }: TagConditionProps) => {
  const { election_id } = useParams();
  const [tags, setTags] = useState<Array<any> | null>(null);
  const { fetch } = useContext(AuthContext);
  const { type, split_lines } = value;
  useEffect(() => {
    if (fetch && election_id && type === CONDITION_TYPE.TAG_EQUALS) {
      fetch(`/elections/${election_id}/voter_tags`).then((r) =>
        setTags(r.json)
      );
    }
    if (type !== CONDITION_TYPE.TAG_EQUALS) {
      setTags(null);
    }
  }, [election_id, fetch, type]);
  const handleKeyChange = (e: { target: { value: string } }) => {
    onChange({ ...value, key: e.target.value });
  };
  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange({ ...value, value: e.target.value });
  };
  const handleSplitChange = () => {
    onChange({ ...value, split_lines: !split_lines });
  };
  return (
    <Grid container>
      <Grid item xs={split_lines ? 12 : 6}>
        <FormControl fullWidth>
          {tags && tags.length > 0 ? (
            <Select value={value.key} onChange={handleKeyChange}>
              {tags.map((t) => (
                <MenuItem key={t.key} value={t.key}>
                  {t.key} ({t.count})
                </MenuItem>
              ))}
            </Select>
          ) : (
            <TextField
              label="Tag"
              value={value.key}
              onChange={handleKeyChange}
            />
          )}
        </FormControl>
      </Grid>
      <Grid item xs={split_lines ? 12 : 6}>
        <FormControl fullWidth>
          <TextField
            label="Value"
            value={value.value}
            onChange={handleValueChange}
            multiline={split_lines}
            minRows={4}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox checked={split_lines} onChange={handleSplitChange} />
          }
          label="Multiple values (separate values by new line)"
        />
      </Grid>
    </Grid>
  );
};

interface ConditionManyProps {
  value: VoterCondition_Many;
  onChange: (v: VoterCondition_Many) => void;
}
const ConditionMany = ({ value, onChange }: ConditionManyProps) => {
  const handleAddCondition = () => {
    const newList = value.conditions.slice();
    newList.push(getDefaultForType(CONDITION_TYPE.TAG_EQUALS));
    onChange({ ...value, conditions: newList });
  };
  const handleRemoveCondition = (index: number) => {
    const newList = value.conditions.slice();
    newList.splice(index, 1);
    onChange({ ...value, conditions: newList });
  };
  const handleSubChange = (v: VoterCondition, index: number) => {
    const newList = value.conditions.slice();
    newList[index] = v;
    onChange({ ...value, conditions: newList });
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        {value.conditions.map((c, i) => (
          <Box key={i} mt={1} display="flex" flexGrow={1}>
            <Box>
              <SimpleButton
                label=""
                icon={<RemoveIcon />}
                func={() => handleRemoveCondition(i)}
                color="error"
              />
            </Box>
            <Box sx={{ flexDirection: "column", flexBasis: 0, flexGrow: 1 }}>
              <ConditionBase
                value={c}
                onChange={(v) => handleSubChange(v, i)}
              />
            </Box>
          </Box>
        ))}
      </Grid>
      <Grid item xs={12}>
        <SimpleButton label="" func={handleAddCondition} icon={<AddIcon />} />
      </Grid>
    </Grid>
  );
};
