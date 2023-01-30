import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box } from '@mui/material';
import { AiOutlineCheck } from 'react-icons/ai';

import '../styles/createProject.css';
import { FiCheck } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { clearlastUpdateProjectsReducer } from '../store/projects/projectsSlice';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const TransitionModal = ({ title, data, }: any) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);

        dispatch( clearlastUpdateProjectsReducer() );

        navigate('/private');
    };

    const eventDate = (year: any, month: any, day: any) => new Date(Date.UTC(year, month - 1, day));
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    // console.log(eventDate(2022, 12, 21).toLocaleDateString('es-ES', options).slice(0, 1).toUpperCase() + eventDate(2022, 12, 21).toLocaleDateString('es-ES', options).slice(1));

    const { createdAt } = data;
    const year = new Date(createdAt).getFullYear();
    const month = new Date(createdAt).getMonth() + 1;
    const day = new Date(createdAt).getDate();
    // console.log(day + ' ' + month + ' ' + year)

    // console.log(eventDate(year, month, day).toLocaleDateString('es-ES', options).slice(0, 1).toUpperCase() + eventDate(year, month, day).toLocaleDateString('es-ES', options).slice(1));

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{ backdropFilter: 'blur(3px)', bgcolor: 'rgba(0,0,0, 0.2)' }}
            >
                <Box 
                    sx={{ 
                        textAlign: 'center', 
                        margin: '10px 30px' 
                    }}
                >
                    <Box style={{
                        backgroundColor: 'var(--green)',
                        borderRadius: '100%',
                        width: 35,
                        height: 35,
                        margin: '30px auto 10px',
                        display: 'flex',                        
                    }}>
                        <Box style={{
                            margin: '8.5px auto',
                        }}>
                            <FiCheck style={{
                                color: '#fff',
                            }} />
                        </Box>
                    </Box>
                    <DialogTitle
                        sx={{
                            color: 'var(--dark)',
                            fontWeight: 600
                        }}
                    >
                        { title }
                    </DialogTitle>

                    <DialogContent 
                        sx={{ 
                            margin: '20px 0', 
                        }}
                    >
                        <DialogContentText 
                            id="alert-dialog-slide-description"
                            style={{
                                textAlign: 'center',
                                fontSize: 13,
                            }}
                        >
                            Comprobante No.
                        </DialogContentText>
                        <DialogContentText 
                            id="alert-dialog-slide-description"
                            style={{
                                textAlign: 'center',
                                fontSize: 15,
                                fontWeight: 500,
                                color: '#59585a'
                            }}
                        >
                            { data._id }
                        </DialogContentText>

                        {/* <DialogContentText 
                            id="alert-dialog-slide-description"
                            style={{
                                textAlign: 'center',
                                marginTop: 30,
                                fontSize: 15
                            }}
                        >
                            { eventDate(year, month, day).toLocaleDateString('es-ES', options).slice(0, 1).toUpperCase() + eventDate(year, month, day).toLocaleDateString('es-ES', options).slice(1) }
                        </DialogContentText> */}
                    </DialogContent>

                    <DialogActions>
                        <button 
                            onClick={handleClose}
                            style={{
                                padding: '8px 20px',
                                borderRadius: 6,
                                border: 'none',
                                backgroundColor: 'var(--blue)',
                                color: 'var(--white)',
                                cursor: 'pointer',
                            }}
                        >
                            Continuar
                        </button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}