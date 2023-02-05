import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, IconButton } from '@mui/material';

import '../styles/createProject.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearProjectByIdReducer } from '../store/projects/projectsSlice';
import { useNavigate } from 'react-router-dom';
import { RiCloseFill } from 'react-icons/ri';
import { DialogTitleProps } from './ModalError';
import useFormatDate from '../hooks/useFormatDate';
import { findAllCommentariesByProjectID_thunk } from '../store/commentaries/thunks';
import { useEffect } from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ mt: 6, p: 0 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 7,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <RiCloseFill />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
}

export const ProjectModal = ({ project }: any) => {
    console.log('project: ', project)

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { commentariesByProjectID, isLoadingCommentaries } = useSelector((state: any) => state.commentaries);
    const [open, setOpen] = React.useState(true);

    const { formatDate } = useFormatDate();

    const handleClose = () => {
        setOpen(false);

        dispatch( clearProjectByIdReducer() );

        // navigate('/private');
    };

    useEffect(() => {
        // if( allProjectsByUserId.length > 0 ) return;
    
        dispatch( findAllCommentariesByProjectID_thunk(project._id) );
      }, []);

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
                    sx={{ 
                        textAlign: 'center', 
                        margin: 0,
                    }}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        { project.title }
                    </BootstrapDialogTitle>
                    <p
                        style={{
                            fontWeight: 400,
                            fontSize: 13,
                            color: 'var(--grayDark)',
                            paddingTop: 0,
                            textAlign: 'left',
                            margin: '5px 30px',
                            textDecoration: 'underline',
                            textUnderlineOffset: 3,
                            textDecorationColor: '#ccc'
                        }}
                    >
                        <span style={{ fontWeight: 500 }}>Fecha de creación:</span> {''}
                        {
                            formatDate(project.createdAt)
                        }
                    </p>

                    <DialogContent 
                        sx={{ 
                            margin: '0px 10px',
                            height: 310,
                            overflow: 'scroll'
                        }}
                    >
                        <DialogContentText 
                            id="alert-dialog-slide-description"
                            style={{
                                textAlign: 'left',
                                fontSize: 13,
                                fontWeight: 600
                            }}
                        >
                            Descripción
                        </DialogContentText>
                        <DialogContentText 
                            id="alert-dialog-slide-description"
                            style={{
                                textAlign: 'left',
                                fontSize: 13,
                            }}
                        >
                            <div dangerouslySetInnerHTML={{ __html: project.description }} />
                        </DialogContentText>
                        {/* <DialogContentText 
                            id="alert-dialog-slide-description"
                            style={{
                                textAlign: 'center',
                                fontSize: 13,
                                marginTop: 25
                            }}
                        >
                            Comprobante No. (ID)
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
                            { project._id }
                        </DialogContentText> */}

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
                    <DialogContent>
                        <DialogContentText 
                            id="alert-dialog-slide-description"
                            style={{
                                textAlign: 'center',
                                fontSize: 13,
                                marginTop: 0
                            }}
                        >
                            Comprobante No. (ID)
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
                            { project._id }
                        </DialogContentText>

                        <DialogContentText 
                            id="alert-dialog-slide-description"
                            style={{
                                textAlign: 'left',
                                fontSize: 17,
                                fontWeight: 500,
                                color: '#000'
                            }}
                        >
                            Comentarios:
                            {
                                commentariesByProjectID ? (
                                    <Box
                                        sx={{ 
                                            margin: '0px 10px',
                                            height: 200,
                                            overflow: 'scroll'
                                        }}
                                    >
                                        {
                                            commentariesByProjectID.map(({user, commentary}: any) => (
                                                <div style={{
                                                    padding: '8px 0'
                                                }}>
                                                    <p style={{
                                                        fontWeight: 500,
                                                        margin: 0
                                                    }}>{ user.fullName }</p>
                                                    <p style={{
                                                        fontWeight: 300,
                                                        fontSize: 13,
                                                        marginTop: -5,
                                                        paddingBottom: 2
                                                    }}>{ formatDate(commentary.createdAt) }</p>
                                                    <p style={{
                                                        fontWeight: 300
                                                    }}>{ commentary.comment }</p>
                                                </div>
                                            ))
                                        }
                                    </Box>
                                ) : null //TODO: TERMINARLO
                            }
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
                                // margin: 20
                            }}
                        >
                            Cerrar
                        </button>
                        <button 
                            onClick={handleClose}
                            style={{
                                padding: '8px 20px',
                                borderRadius: 6,
                                border: 'none',
                                backgroundColor: 'var(--blue)',
                                color: 'var(--white)',
                                cursor: 'pointer',
                                // margin: 20
                            }}
                        >
                            Expandir o Editar
                        </button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}