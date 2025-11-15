import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, Slide, MenuItem } from '@mui/material';
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import React from "react";
import { RiUser6Line } from 'react-icons/ri';
import { useDispatch } from "react-redux";
import { clearUserReducer } from "../store/users/usersSlice";
import { updateRole_thunk } from '../store/users/thunks';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});
  
export const UserModal = ({ user }: any) => {
  
    const [open, setOpen] = React.useState(true);
    const [typeDoc, setTypeDoc] = React.useState(user.role);

    const navigate = useNavigate();

    const typeDocuments = [
        "USER",
        "CLIENT",
        "ALLY",
        "ADMIN",
    ];

    const onTypeDocumentChanged = (event: any) => { 
        setTypeDoc(event.target.value);
    };
        
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        
        dispatch( clearUserReducer() );
    };

    const updateRole = () => {
        dispatch( updateRole_thunk({
            userId: user._id,
            role: typeDoc
        }) );

        setOpen(false);
        dispatch( clearUserReducer() );
        
        navigate('/private');
    }
  
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
                <DialogTitle
                    sx={{
                        color: 'var(--dark)',
                        fontWeight: 600,
                        textAlign: 'left'
                    }}
                >
                    Actualizar Rol del Usuario
                </DialogTitle>
                <Box
                    sx={{ 
                        textAlign: 'center', 
                        margin: '10px 30px',
                    }}
                >
                    <Box style={{
                        backgroundColor: 'var(--gray)',
                        borderRadius: '100%',
                        width: 35,
                        height: 35,
                        margin: '20px auto -10px',
                        display: 'flex',
                    }}>
                        <Box style={{
                            margin: '8.5px auto',
                        }}>
                            <RiUser6Line style={{
                                color: '#000',
                            }} />
                        </Box>
                    </Box>
                    <DialogTitle
                        sx={{
                            color: 'var(--dark)',
                            fontWeight: 600,
                        }}
                    >
                        { user.fullName } · { user.businessName }
                    </DialogTitle>
                    <DialogContentText
                        id="alert-dialog-slide-description"
                        style={{
                            textAlign: 'center',
                            fontSize: 13,
                            marginTop: -15
                        }}
                    >
                        <span style={{
                        fontWeight: 500
                        }}>Registro en la plataforma:</span> { user.createdAt }
                    </DialogContentText>


                    <DialogContent
                        sx={{ 
                            margin: '20px 0', 
                        }}
                    >
                        <DialogContentText
                            id="alert-dialog-slide-description"
                            style={{
                                textAlign: 'left',
                                fontSize: 13,
                                paddingBottom: 15
                            }}
                        >
                            Rol Actual.
                        </DialogContentText>
                            <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                                <InputLabel id="demo-simple-select-label">{ user.role }</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={typeDoc}
                                label="Tipo documento"
                                onChange={onTypeDocumentChanged}
                                color='info'
                            >
                                {
                                    typeDocuments.map(typeDocument => (
                                        <MenuItem
                                            key={typeDocument}
                                            value={typeDocument}
                                        >
                                            {typeDocument}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>

                        <DialogContentText
                            id="alert-dialog-slide-description"
                            style={{
                                textAlign: 'center',
                                fontSize: 13,
                                marginTop: 15
                            }}
                        >
                            <span style={{
                                fontWeight: 500
                            }}>ID del Usuario:</span> { user._id }
                        </DialogContentText>

                        <DialogContentText
                            id="alert-dialog-slide-description"
                            style={{
                                textAlign: 'center',
                                fontSize: 13,
                                marginTop: 15
                            }}
                        >
                            <span style={{
                                fontWeight: 500
                            }}>ID del Negocio:</span> { user.businessId }
                        </DialogContentText>

                    </DialogContent>

                    <DialogActions>
                        <button 
                            onClick={handleClose}
                            style={{
                                padding: '8px 20px',
                                borderRadius: 6,
                                border: 'none',
                                backgroundColor: 'var(--red)',
                                color: 'var(--white)',
                                cursor: 'pointer',
                            }}
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={updateRole}
                            style={{
                                padding: '8px 20px',
                                borderRadius: 6,
                                border: 'none',
                                backgroundColor: 'var(--orange)',
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