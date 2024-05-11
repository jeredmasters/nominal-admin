import { JSX, PropsWithChildren, useState } from "react";
import { Box, Button, Typography, Modal, Grid } from "@mui/material";

interface SimpleModalProps extends PropsWithChildren {
  buttonLabel: string | JSX.Element;
}

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

export const SimpleModalBtn = ({ buttonLabel, children }: SimpleModalProps) => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setModal(true)} type="button">
        {buttonLabel}
      </Button>
      {modal ? (
        <Modal open={true} onClose={() => setModal(false)}>
          <Box sx={style}>{children}</Box>
        </Modal>
      ) : null}
    </>
  );
};
