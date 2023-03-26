import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  Slide,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);

    // dispatch( clearUserReducer() );
  };

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
            sx={{
                width: 600,
                padding: '10px 20px'
            }}
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
                    id="name"
                    label="Nombre del negocio"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>

            <DialogActions>
                <button
                onClick={handleClose}
                style={{
                    padding: "8px 20px",
                    borderRadius: 6,
                    border: "none",
                    backgroundColor: "var(--red)",
                    color: "var(--white)",
                    cursor: "pointer",
                }}
                >
                Cancelar
                </button>
                <button
                // onClick={updateRole}
                style={{
                    padding: "8px 20px",
                    borderRadius: 6,
                    border: "none",
                    backgroundColor: "var(--blue)",
                    color: "var(--white)",
                    cursor: "pointer",
                }}
                >
                Continuar
                </button>
            </DialogActions>
        </Box>
    </Dialog>
  );
};
