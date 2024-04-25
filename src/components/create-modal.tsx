import { CreateBase, SimpleForm, useCreate } from "react-admin";
import { Box, Typography, Modal, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PropsWithChildren } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

export interface SModelProps extends PropsWithChildren {
  title: string;
  open: boolean;
  onClose: () => void;
  redirect: string;
  resource: string;
}
export const CreateModal = ({
  open,
  redirect,
  onClose,
  children,
  title,
  resource,
}: SModelProps) => {
  const [create] = useCreate();
  const navigate = useNavigate();
  const postSave = (data: any) => {
    create(
      resource,
      { data },
      {
        onSettled: () => {
          navigate(redirect);
          onClose();
        },
      }
    );
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Grid container>
          <Grid item xs={12}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CreateBase resource={resource}>
              <SimpleForm onSubmit={postSave}>{children}</SimpleForm>
            </CreateBase>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
