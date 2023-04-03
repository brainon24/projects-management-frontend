import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    styled,
    IconButton,
    Box,
    Slide,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { RiCloseFill } from 'react-icons/ri';
import checkIcon from '../assets/check-icon.svg';
import { changeRequestSuccess } from '../store/business/businessSlice';
import { changeRequestSuccessReducerProjects } from '../store/projects/projectsSlice';

import './projectModal.css';
import { TransitionProps } from '@mui/material/transitions';
import { changeRequestSuccessReducer } from '../store/commentaries/commentarySlice';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;

  status?: any,
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <RiCloseFill />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export const SuccessModal = ({ textRequestSuccess = '' }) => {

    const [open, setOpen] = React.useState(true);

    const dispatch = useDispatch();

    const handleClose = () => {
      setOpen(false);

      dispatch( changeRequestSuccess({
        isRequestSuccess: false,
        textRequestSuccess: undefined,
      }) );

      dispatch( changeRequestSuccessReducer({
        isRequestSuccess: false,
        textRequestSuccess: undefined,
      }) );

      dispatch( changeRequestSuccessReducerProjects({
        isRequestSuccess: false,
        textRequestSuccess: undefined,
      }) );
    };

    return (
        <div>
          <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{ backdropFilter: 'blur(2px)', }}
            >
            <Box 
                className='container-modal'
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} />
                <DialogContent>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <div 
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }} 
                            >
                                <img
                                    className='logo' 
                                    src={checkIcon} 
                                    alt="Check Icon" 
                                    width={90} 
                                    height={90}
                                />

                            </div>
                            <p
                                style={{
                                fontSize: 30,
                                color: '#030038',
                                fontWeight: 600,
                                marginTop: 50,
                                textAlign: 'center'
                                }}
                            >
                                ¡Listo!
                            </p>
                            <p
                                style={{
                                fontSize: 20,
                                color: '#030038',
                                fontWeight: 400,
                                margin: '20px 0 25px 0',
                                textAlign: 'center'
                                }}
                            >
                                { textRequestSuccess }
                            </p>

                            <button 
                                style={{
                                    backgroundColor: '#030038',
                                    color: '#fff',
                                    padding: '10px 35px',
                                    borderRadius: 6,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: '0 auto',
                                    cursor: 'pointer',
                                    border: 'none'
                                }}
                                onClick={handleClose}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Box>
          </Dialog>
        </div>
    );
}
