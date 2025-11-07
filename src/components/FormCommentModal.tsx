import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Box,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from "../store/ui/uiSlice";
import './projectModal.css';
import TextEditor from "./TextEditor";
import { useState } from 'react';
import { createCommentByProjectID_thunk } from '../store/commentaries/thunks';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FormCommentModal = ({ projectId }: any) => {
  const [open, setOpen] = React.useState(true);

  const [ comment, setComment ] = useState<any>('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);

  const handleClose = () => {
    setOpen(false);

    dispatch( closeModal() );
  };

  const handleSubmit = () => {
    if( comment?.length <= 1 ) return;

    dispatch( createCommentByProjectID_thunk({projectId, authorId: user._id, commentary: comment}) );
    dispatch( closeModal() );
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
                Agregar Actualización al Proyecto
            </DialogTitle>
            <DialogContentText
                id="alert-dialog-slide-description"
                style={{
                    textAlign: "left",
                    fontSize: 15,
                    marginTop: -10,
                    padding: '0 25px 25px 25px'
                }}
            >
                <span
                    style={{
                        fontWeight: 500,
                    }}
                >
                    Registra una actualización al proyecto:
                </span>
            </DialogContentText>

            <DialogContent 
                style={{
                    marginTop: -20,
                }}
            >
                <TextEditor value={ comment } setValue={ setComment } /> 
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
                    onClick={handleSubmit}
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
