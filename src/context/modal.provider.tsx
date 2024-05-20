import React, {
  createContext,
  useState,
  PropsWithChildren,
  useMemo,
} from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { SimpleButtonProps } from "../components/simple-button";

export interface IModal {
  onConfim?: () => void;
  onCancel?: () => void;
  content?: JSX.Element;
  text?: string;
  title?: string;
  buttons?: Array<SimpleButtonProps>;
}

export interface IModalContext {
  setModal: (key: IModal) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<IModalContext>({
  setModal: (key: IModal) => null,
  closeModal: () => null,
});
export const ModalProvider: React.FC<PropsWithChildren> = (props) => {
  const [modal, setModal] = useState<IModal | null>(null);

  const closeModal = () => setModal(null);

  const modelElement = useMemo(() => {
    if (modal) {
      const { onCancel, onConfim } = modal;
      const handleCancel = () => {
        closeModal();
        if (onCancel) onCancel();
      };
      const handleConfirm = () => {
        closeModal();
        if (onConfim) onConfim();
      };
      return (
        <SimpleDialog
          {...modal}
          onCancel={handleCancel}
          onConfim={handleConfirm}
        ></SimpleDialog>
      );
    } else {
      return null;
    }
  }, [modal]);
  return (
    <ModalContext.Provider value={{ setModal, closeModal }}>
      {modelElement}
      {props.children}
    </ModalContext.Provider>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SimpleDialogProps extends IModal, PropsWithChildren {}
export const SimpleDialog = ({
  onConfim,
  onCancel,
  title,
  text,
  children,
  content,
}: SimpleDialogProps) => {
  return (
    <React.Fragment>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={onCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {text ? (
            <DialogContentText id="alert-dialog-slide-description">
              {text}
            </DialogContentText>
          ) : null}
          {content}
          {children}
        </DialogContent>
        <DialogActions>
          {onConfim ? (
            <Button variant="contained" onClick={onConfim}>
              Confirm
            </Button>
          ) : null}
          <Button onClick={onCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
