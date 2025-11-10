import * as React from 'react';
import { Suspense } from 'react';
import { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, IconButton, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { clearProjectOneReducer } from '../store/projects/projectsSlice';
import { useNavigate, Link as LinkRRD } from 'react-router-dom';
import { RiCloseFill } from 'react-icons/ri';
import { DialogTitleProps } from './ModalError';
import useFormatDate from '../hooks/useFormatDate';
import { findAllCommentariesByProjectID_thunk } from '../store/commentaries/thunks';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

import '../styles/createProject.css';
import './projectModal.css';
import { ProjectStatus } from './ProjectStatus';
import { Loading100p } from './Loading100p';
import { getComplementHours } from '../helpers/dates';
import projectsManagement from '../api/api';
import { toast } from 'react-toastify';
import { Icon } from './Icons';
import { Role } from '../enums/user-role.enum';
import { findProjectsByUserId_thunk } from '../store/projects/thunks';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, status, onClose, ...other } = props;
  
    return (
    <>
        <div style={{
            marginTop: 9,
        }}>
            <ProjectStatus status={props.status} />
        </div>
        <DialogTitle sx={{ mt: 2, p: 0,  }} {...other}>
            {children}
            {onClose ? (
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                position: 'absolute',
                right: 0,
                top: 10,
                color: (theme) => theme.palette.grey[500],
                }}
            >
                <RiCloseFill />
            </IconButton>
            ) : null}
        </DialogTitle>
    </>
    );
}

export const ProjectModal = ({ project }: any) => {

    const [isLoading, setIsLoading] = React.useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { commentariesByProjectID, isLoadingCommentaries } = useSelector((state: any) => state.commentaries);
    const { user } = useSelector((state: any) => state.auth);
    const [open, setOpen] = React.useState(true);

    const { formatDate } = useFormatDate();
    
    const handleClose = () => {
        setOpen(false);

        dispatch( clearProjectOneReducer() );
    };

    const handleRemoveProject = async () => {
        setIsLoading(true);
        const { status } = await projectsManagement.delete(`/project/remove/${ project._id }`);
        if (status === 200) {
            dispatch( clearProjectOneReducer() );
            dispatch( findProjectsByUserId_thunk( user._id ) );
            toast('Proyecto eliminado con éxito', { type: 'success' });
        } else {
            toast('Error al eliminar el proyecto', { type: 'error' });
        }
        setOpen(false);
        setIsLoading(false);
    }

    const openProject = () => {
        setOpen(false);
        dispatch( clearProjectOneReducer() );

        navigate(`/private/project/${ project._id }`)
    }

    useEffect(() => {
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
                    className='container-modal'
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} status={project.status}>
                        { project.title }
                    </BootstrapDialogTitle>
                    <div
                        style={{
                            fontWeight: 400,
                            fontSize: 13,
                            color: 'var(--grayDark)',
                            paddingTop: 0,
                            textAlign: 'left',
                            margin: '0',
                            textDecoration: 'underline',
                            textUnderlineOffset: 2,
                            textDecorationThickness: '0.6px',
                            textDecorationColor: '#ccc',

                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <LinkRRD to={`/private/project/${ project._id }`}>
                            <span>Creado el { formatDate(project.createdAt) }</span>
                        </LinkRRD>

                        {
                            user?.role === Role.ADMIN && (
                                <button 
                                    onClick={() => handleRemoveProject()} 
                                    style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                                    disabled={ isLoading }
                                >
                                    <Icon name='basura' color='var(--red)' size={19} />
                                </button>
                            )
                        }
                    </div>

                    <div 
                        style={{ 
                            margin: '0px',
                            maxHeight: 320,
                            overflow: 'scroll',
                            paddingTop: 15
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
                        <Suspense fallback={ <Loading100p /> }>
                            <DialogContentText 
                                id="alert-dialog-slide-description"
                                style={{
                                    textAlign: 'left',
                                    fontSize: 13,
                                }}
                            >
                                <div dangerouslySetInnerHTML={{ __html: project.description }} />
                            </DialogContentText>
                        </Suspense>
                    </div>

                    <div>
                        <Suspense fallback={ <Loading100p /> }>
                            {
                                isLoadingCommentaries 
                                ? (
                                    <Box 
                                        sx={{
                                            marginY: 4
                                        }}
                                    >
                                        <Loading100p />
                                    </Box>
                                )
                                : <DialogContentText 
                                    id="alert-dialog-slide-description"
                                    style={{
                                        textAlign: 'left',
                                        fontSize: 17,
                                        fontWeight: 500,
                                        color: '#000',
                                        paddingTop: 25
                                    }}
                                >
                                    Actualizaciones:
                                    {
                                        commentariesByProjectID?.length > 0 ? (
                                            <Box
                                                sx={{ 
                                                    margin: '0px 10px',
                                                    // height: 200,
                                                    maxHeight: 200,
                                                    overflow: 'scroll'
                                                }}
                                            >
                                                {
                                                    commentariesByProjectID?.map(({user, commentary}: any) => (
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
                                                            }}>{ formatDate(commentary.createdAt) } · { getComplementHours(new Date(commentary.createdAt)) }</p>
                                                            {/* }}>{ formatDate(commentary.createdAt) }</p> */}
                                                            <div 
                                                                style={{
                                                                    fontWeight: 300
                                                                }} 
                                                                dangerouslySetInnerHTML={{ __html: commentary.comment }} 
                                                            />
                                                        </div>
                                                    ))
                                                }
                                            </Box>
                                        ) : (
                                            <Box>
                                                <span style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    padding: '15px 0'
                                                }}>
                                                    <AiOutlineExclamationCircle />
                                                </span>
                                                <Typography sx={{ textAlign: 'center', fontSize: 14, paddingBottom: 1 }}>Aún no hay actualizaciones en este proyecto.</Typography>
                                            </Box>
                                        )
                                    }
                                </DialogContentText>
                            }
                        </Suspense>
                    </div>

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
                            Cerrar
                        </button>
                        <button 
                            onClick={openProject}
                            style={{
                                padding: '8px 20px',
                                borderRadius: 6,
                                border: 'none',
                                backgroundColor: 'var(--blue-dark)',
                                color: 'var(--white)',
                                cursor: 'pointer',
                            }}
                        >
                            Editar
                        </button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}