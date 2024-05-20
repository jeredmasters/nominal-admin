import { MouseEventHandler, isValidElement, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Box, Typography, Modal, Grid } from "@mui/material";
import { IModal, ModalContext } from "../context/modal.provider";
import { ACTION, RESOURCE } from "../const/resources";

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
interface SimpleButtonProps_Base {
  label: string;
  icon?: any;
  color?: Color;
  variant?: SimpleButtonVariant;
  state?: any;
  sx?: any;
}
export interface SimpleButtonProps_Modal extends SimpleButtonProps_Base {
  modal: (onClose: () => void, meta?: any) => IModal;
}
export interface SimpleButtonProps_Link extends SimpleButtonProps_Base {
  href: string;
  target?: string;
}
export interface SimpleButtonProps_Func extends SimpleButtonProps_Base {
  func: (meta?: any) => void;
  confirm?: boolean | string;
}
export interface SimpleButtonProps_Resource extends SimpleButtonProps_Base {
  resource: RESOURCE;
  action: ACTION;
  id?: string;
}
export const SimpleButton = (props: SimpleButtonProps) => {
  const { label, icon, variant, state } = props;
  const navigate = useNavigate();
  const { setModal, closeModal } = useContext(ModalContext);

  const handleClick: MouseEventHandler = (e) => {
    e.stopPropagation();

    if ("func" in props) {
      const { func, confirm } = props;
      if (!confirm) {
        func(state);
      } else {
        const text = typeof confirm === "string" ? confirm : label + "?";
        const handleConfirm = () => {
          func(state);
        };
        setModal({
          title: "Confirm",
          text: text,
          onConfim: handleConfirm,
        });
      }
    }
    if ("modal" in props) {
      const { modal } = props;
      const render = modal(closeModal, state);
      setModal(render);
    }
    if ("href" in props) {
      let { href } = props;

      if (href.startsWith("http")) {
        (window as any).open(href, "_blank").focus();
      } else {
        navigate(href, { state });
      }
    }
    if ("resource" in props) {
      console.log("TODO resource actions", props);
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
    </>
  );
};
