import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Box,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useDispatch } from "react-redux";
import { closeModal } from "../store/ui/uiSlice";
import { useForm } from '../hooks/useForm';
import { createBussines_thunk } from '../store/business/thunks';
import './projectModal.css';
import { Button } from "./Button";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FormModal = () => {
  const [open, setOpen] = React.useState(true);

  const { onInputChange, bussinesName } = useForm({
    bussinesName: '',
  });

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);

    dispatch( closeModal() );
  };

  const handleSubmit = () => {
    if( bussinesName.length <= 1 ) return;

    dispatch( createBussines_thunk(bussinesName) );
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ backdropFilter: "blur(3px)", bgcolor: "rgba(0,0,0, 0.2)"}}
    >
        <Box
            className='container-modal'
        >
            <DialogTitle
                sx={{
                color: "var(--dark)",
                fontWeight: 600,
                textAlign: "left",
                }}
            >
                Crear Negocio
            </DialogTitle>
            <DialogContentText
                id="alert-dialog-slide-description"
                style={{
                    textAlign: "left",
                    fontSize: 15,
                    marginTop: -10,
                    padding: '0 25px'
                }}
            >
                <span
                style={{
                    fontWeight: 500,
                }}
                >
                Registra un negocio en la plataforma:
                </span>
            </DialogContentText>

            <DialogContent 
                style={{
                    marginTop: -20,
                }}
            >
                <TextField
                    autoFocus
                    margin="dense"
                    id="bussinesName"
                    label="Nombre del negocio"
                    type="text"
                    fullWidth
                    variant="standard"
                    name="bussinesName"
                    onChange={ onInputChange }
                    value={ bussinesName }
                />
            </DialogContent>

            <DialogActions>
                <button
                    onClick={handleClose}
                    style={{
                        padding: "8px 20px",
                        borderRadius: 20,
                        border: "none",
                        backgroundColor: "var(--red)",
                        color: "var(--white)",
                        cursor: "pointer",
                    }}
                >
                    Cancelar
                </button>
                <Button
                  onClick={handleSubmit}
                >
                  Continuar
                </Button>
            </DialogActions>
        </Box>
    </Dialog>
  );
};
