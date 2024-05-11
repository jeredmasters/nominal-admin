import { MouseEventHandler, isValidElement, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Box, Typography, Modal, Grid } from "@mui/material";

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
type SimpleButtonVariant = "text" | "outlined" | "contained";
type Color =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

export interface ModalBodyProps {
  onClose: () => void;
}
export type SimpleButtonProps =
  | SimpleButtonProps_Modal
  | SimpleButtonProps_Link
  | SimpleButtonProps_Func;

export interface SimpleButtonProps_Modal {
  label: string;
  icon?: any;
  color?: Color;
  variant?: SimpleButtonVariant;
  modal: (onClose: () => void) => JSX.Element;
  sx?: any;
}
export interface SimpleButtonProps_Link {
  label: string;
  icon?: any;
  color?: Color;
  variant?: SimpleButtonVariant;
  href: string;
  state?: any;
  sx?: any;
}
export interface SimpleButtonProps_Func {
  label: string;
  icon?: any;
  color?: Color;
  variant?: SimpleButtonVariant;
  func: () => void;
  confirm?: boolean | string;
  sx?: any;
}
export const SimpleButton = (props: SimpleButtonProps) => {
  const { label, icon, variant } = props;
  const navigate = useNavigate();
  const [injectModal, setInjectModal] = useState<any | null>();
  const handleClose = () => setInjectModal(null);

  const handleClick: MouseEventHandler = (e) => {
    e.stopPropagation();

    if ("func" in props) {
      const { func, confirm } = props;
      if (!confirm) {
        func();
      } else {
        const text = typeof confirm === "string" ? confirm : label + "?";
        const handleConfirm = () => {
          func();
          handleClose();
        };
        setInjectModal(
          <Modal open={true} onClose={handleClose}>
            <Box sx={style}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography>{text}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <SimpleButton
                    label="Confirm"
                    variant="contained"
                    func={handleConfirm}
                  />
                  <SimpleButton label="Cancel" func={handleClose} />
                </Grid>
              </Grid>
            </Box>
          </Modal>
        );
      }
    }
    if ("modal" in props) {
      const { modal } = props;
      const render = modal(handleClose);
      setInjectModal(
        <Modal open={true} onClose={handleClose}>
          <Box sx={style}>{render}</Box>
        </Modal>
      );
    }
    if ("href" in props) {
      const { href, state } = props;

      navigate(href, { state });
    }
  };
  return (
    <>
      <Button
        onClick={handleClick}
        startIcon={icon}
        variant={variant}
        sx={props.sx}
        color={props.color}
      >
        {label}
      </Button>
      {injectModal}
    </>
  );
};
