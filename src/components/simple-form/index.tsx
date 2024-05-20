import React, { PropsWithChildren } from "react";
import { Box, Grid } from "@mui/material";

import { useState } from "react";
import { SimpleButton } from "../simple-button";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { FormContext } from "./util";

export * from "./text-input";
export * from "./select-input";
export * from "./date-input";
export * from "./date-time-input";

export * from "./input-wrapper";

export interface EditPanelProps extends PropsWithChildren {
  initialValue?: any;
  onSubmit?: (form: any) => void;
  onChange?: (form: any) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

export const SimpleForm = ({
  initialValue,
  onSubmit,
  onChange,
  onCancel,
  onDelete,
  children,
}: EditPanelProps) => {
  const [form, setForm] = useState<any | null>(initialValue);

  const handleSubmit = () => onSubmit && onSubmit(form);

  return (
    <FormContext.Provider value={{ form, setForm }}>
      <Box mr={-1}>
        <form>
          <Grid container>
            {children}
            <Grid item xs={12}>
              <Box
                p={2}
                mr={1}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "#d5e5f3",
                }}
              >
                <Box>
                  {onSubmit && (
                    <SimpleButton
                      label="Save"
                      icon={<SaveIcon />}
                      func={handleSubmit}
                      variant="contained"
                      sx={{ marginRight: 2 }}
                    />
                  )}
                  {onCancel && (
                    <SimpleButton
                      label="Cancel"
                      icon={<CloseIcon />}
                      func={onCancel}
                    />
                  )}
                </Box>
                <Box>
                  {onDelete && (
                    <SimpleButton
                      label="Delete"
                      icon={<DeleteForeverIcon />}
                      func={onDelete}
                      variant="contained"
                      color="error"
                    />
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </FormContext.Provider>
  );
};
