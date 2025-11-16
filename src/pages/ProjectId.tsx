import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { findProjectById_thunk, updateProject_thunk } from '../store/projects/thunks';

import '../styles/projectId.css';
import { findALLYsByRole_thunk, findAllClients_thunk } from '../store/users/thunks';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import TextEditor from '../components/TextEditor';
import { AiOutlineZoomOut, AiOutlineZoomIn, AiOutlineExclamationCircle } from 'react-icons/ai';
import { findAllCommentariesByProjectID_thunk } from '../store/commentaries/thunks';
import { Loading100p } from '../components/Loading100p';
import useFormatDate from '../hooks/useFormatDate';
import { getComplementHours } from '../helpers/dates';
import { closeSidemenu, openModal } from '../store/ui/uiSlice';
import { FormCommentModal } from '../components/FormCommentModal';
import { SuccessModal } from '../components/SuccessModal';
import Loading from '../components/Loading';
import { ProjectStatus } from '../components/ProjectStatus';
import { Button } from '../components/Button';
import { Icon } from '../components/Icons';
import { Role } from '../enums/user-role.enum';
import { toast } from 'react-toastify';
import projectsManagement from '../api/api';

export const ProjectId = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const dispatch: any = useDispatch();
    const { user } = useSelector((state: any) => state.auth);
    const { projectById, isLoadingProjects } = useSelector((state: any) => state.projects);
    const { commentariesByProjectID, isLoadingCommentaries, isRequestSuccess, textRequestSuccess, } = useSelector((state: any) => state.commentaries);
    const { mALLYs = [], mClients = [] } = useSelector((state: any) => state.users);
    const { isOpenModal } = useSelector((state: any) => state.ui);

    const [ projectId, setProjectId ] = useState(projectById?._id);
    const [ status, setStatus ] = useState(projectById?.status);
    const [ title, setTitle ] = useState(projectById?.title);

    const [ description, setDescription ] = useState(projectById?.description);
    const [ acceptanceCriteria, setAcceptanceCriteria ] = useState(projectById?.acceptanceCriteria);
    const [ showAcceptanceCriteria, setShowAcceptanceCriteria ] = useState<boolean>(false);
    const [ isLoadingDelete, setIsLoadingDelete ] = useState<boolean>(false);

    const { formatDate } = useFormatDate();

    const changeVisibilityCA = () => {
        setShowAcceptanceCriteria( !showAcceptanceCriteria );
    }

    const onStatusChanged = async (event: any) => { 
        setStatus(event?.target?.value);
    };

    const onTitleChanged = async (event: any) => { 
        setTitle(event?.target?.value);
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();

        dispatch(
            updateProject_thunk({
                _id: projectById?._id,
                authorId: projectById?.authorId,
                businessId: projectById?.businessId,
                responsiblesId: projectById?.responsiblesId,
                title,
                description,
                acceptanceCriteria,
                status,
            })
        );
    }

    const onDeleteProject = async() => {
        if (!projectById?._id) return;
        
        // Confirmar eliminación
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se puede deshacer.');
        if (!confirmed) return;
        
        try {
            setIsLoadingDelete(true);
            const { status } = await projectsManagement.delete(`/project/remove/${projectById._id}`);

            if( status === 200 ){
                navigate(`/private/projects`, { 
                    state: { 
                        showSuccessToast: true, 
                        message: 'Proyecto eliminado exitosamente' 
                    } 
                });
            } else {
                toast.error('Error al eliminar el proyecto');
            }

        } catch (error) {
            console.log({error});
            toast.error('Error al eliminar el proyecto');
        } finally {
            setIsLoadingDelete(false);
        }
    }

    const fetchALLY = async (role: string): Promise<any> => {
        if( mALLYs.length > 0 ) return; //TODO: Change this conditional
        await dispatch( findALLYsByRole_thunk(role) );
    }

    const fetchAllUsers = async (): Promise<any> => {
        if( mClients.length > 0 ) return; //TODO: Change this conditional
        await dispatch( findAllClients_thunk() );
    }

    const handleComment = () => {
        dispatch(openModal())
        
        dispatch( closeSidemenu() )
    }

    const statusAll = [
        "Pendiente",
        "En progreso",
        "Completado",
    ];

    useEffect(() => {
        fetchALLY('ALLY');

        user.role === 'ADMIN' ? fetchAllUsers() : null
    }, []);

    useEffect(() => {
        const projectId = location.pathname.split('/')[3];

        dispatch( findProjectById_thunk( projectId ) );
    }, []);

    useEffect(() => {
        setProjectId(projectById?._id);
        setTitle(projectById?.title || '');
        setDescription(projectById?.description);
        setStatus(projectById?.status || '');
        setAcceptanceCriteria(projectById?.acceptanceCriteria);
    }, [ projectById ]);

    useEffect(() => {
        if( !projectId ) return;
        dispatch( findAllCommentariesByProjectID_thunk(projectId) );
    }, [ projectId ]);

    if( isLoadingCommentaries ) return <Loading />
    if( isLoadingProjects ) return <Loading />

    return (
       <MainLayout>
            { isOpenModal && <FormCommentModal projectId={ projectId } /> }
            { isRequestSuccess && <SuccessModal textRequestSuccess={ textRequestSuccess } /> }
            {/* { isRequestSuccessProjects && <SuccessModal textRequestSuccess={ textRequestSuccessProjects } /> } */}

            <div className='container-form-cp'>
                <Box 
                    sx={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <h1>Detalle del Proyecto o Editar</h1>
                    <FormControl sx={{ width: 180 }} variant="outlined">
                        <InputLabel id="demo-simple-select-label"><ProjectStatus status={projectById?.status} /></InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Estado del proyecto"
                            onChange={onStatusChanged}
                            color='info'
                            // onBlur={ updateStatusOnServer }
                        >
                            {
                                statusAll.map(status => (
                                    <MenuItem
                                        key={status}
                                        value={status}
                                    >
                                        {status}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>

                <div className='container-input-form'>
                    <label>Titulo del proyecto:</label>
                    <input 
                        placeholder="Escribe un titulo para tu proyecto"
                        type="text"
                        name='title'
                        value={title}
                        onChange={ onTitleChanged }
                        className='input-form-cp'
                    />
                </div>

                {/* <div className='container-input-form'>
                    <label>Responsables del proyecto:</label>
                    <TagsInputWithAutoComplete ALLYs={mALLYs} selectedTags={selectedTags} tags={projectById?.responsiblesId || []} responsiblesId={responsiblesId} />
                </div> */}

                <div className='container-input-form'>
                    <label>Descripción:</label>
                    <TextEditor value={ description } setValue={ setDescription } /> 
                </div>

                {
                    showAcceptanceCriteria ? (
                        <div className='container-input-form'>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label>Agregar criterios al proyecto:</label>
                                <div 
                                    onClick={ changeVisibilityCA }
                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', }}
                                >
                                    <p>Minimizar</p>
                                    <span>
                                        <AiOutlineZoomOut style={{ fontSize: 16, marginLeft: 10 }} />
                                    </span>
                                </div>
                            </div>
                            <TextEditor value={ acceptanceCriteria } setValue={ setAcceptanceCriteria } />
                        </div>
                    ) : (
                        <div>
                            <label>Criterios al proyecto:</label>
                            <div 
                                onClick={ changeVisibilityCA }
                                className='container-show-ca'
                            >
                                <span className='icon-show-ca'>
                                    <AiOutlineZoomIn />
                                </span>
                                <p className='pharagraph-show-ca'>Maximizar</p>
                            </div>
                        </div>
                    )
                }

                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: 20 }}>
                    <Button 
                        onClick={ onSubmit }
                        style={{
                            flex: 1,
                        }}
                    >
                        Actualizar Proyecto
                    </Button>

                    {user?.role === Role.ADMIN && (
                        <button
                            onClick={onDeleteProject}
                            disabled={isLoadingDelete}
                            style={{
                                padding: '12px 20px',
                                borderRadius: 6,
                                border: 'none',
                                backgroundColor: isLoadingDelete ? '#ccc' : 'var(--red)',
                                color: 'var(--white)',
                                cursor: isLoadingDelete ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: 14,
                                fontWeight: 500,
                                transition: 'background-color 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoadingDelete) {
                                    e.currentTarget.style.backgroundColor = '#dc2626';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isLoadingDelete) {
                                    e.currentTarget.style.backgroundColor = 'var(--red)';
                                }
                            }}
                        >
                            <Icon name='basura' color='var(--white)' size={16} />
                            {isLoadingDelete ? 'Eliminando...' : 'Eliminar Proyecto'}
                        </button>
                    )}
                </div>

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
                    : <div>
                        <div
                            style={{
                                paddingTop: 20,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <p 
                                style={{
                                    textAlign: 'left',
                                    fontSize: 20,
                                    fontWeight: 500,
                                    color: '#000',
                                    paddingTop: 20
                                }}
                            >
                                Actualizaciones:
                            </p>
                            <button
                                style={{
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: 20,
                                    cursor: 'pointer',
                                    backgroundColor: 'var(--orange)',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 10
                                }}
                                onClick={ handleComment }
                            >
                                Nueva actualización
                            </button>
                        </div>
                        {
                            commentariesByProjectID?.length > 0 ? (
                                <div
                                    style={{ 
                                        margin: '0px 10px',
                                        overflow: 'scroll'
                                    }}
                                >
                                    {
                                        commentariesByProjectID?.map(({user, commentary}: any) => (
                                            <div 
                                                style={{
                                                    padding: '12px 0'
                                                }}
                                                className='comment'
                                                key={ commentary._id }
                                            >
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
                                                <div
                                                    style={{
                                                        fontWeight: 300,
                                                        marginTop: 5
                                                    }} 
                                                    dangerouslySetInnerHTML={{ __html: commentary.comment }} 
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <Box>
                                    <span style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        padding: '15px 0'
                                    }}>
                                        <AiOutlineExclamationCircle />
                                    </span>
                                    <Typography sx={{ textAlign: 'center', fontSize: 14, paddingBottom: 0.4 }}>Aún no hay actualizaciones en este proyecto.</Typography>
                                    <p
                                        style={{
                                            border: 'none',
                                            padding: '2px 0',
                                            borderRadius: 6,
                                            cursor: 'pointer',
                                            backgroundColor: 'transparent',
                                            color: '#000',
                                            textDecoration: 'underline',
                                            textAlign: 'center',
                                            textUnderlineOffset: 5,
                                            fontSize: 14.5,
                                        }}
                                        onClick={ handleComment }
                                    >
                                        ¡Crea una!
                                    </p>
                                </Box>
                            )
                        }
                    </div>
                }
            </div>
       </MainLayout>
    );
}
