import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { findProjectById_thunk, patchStatusProject_thunk } from '../store/projects/thunks';

import '../styles/projectId.css';
import { useForm } from '../hooks/useForm';
import { findEmployeesByRole_thunk, findAllClients_thunk } from '../store/users/thunks';
import { Box, Chip, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { TagsInputWithAutoCompleteClients } from '../components/TagsInputAutoCompleteClients';
import TextEditor from '../components/TextEditor';
import { AiOutlineZoomOut, AiOutlineZoomIn, AiOutlineExclamationCircle } from 'react-icons/ai';
import { findAllCommentariesByProjectID_thunk } from '../store/commentaries/thunks';
import { Loading100p } from '../components/Loading100p';
import useFormatDate from '../hooks/useFormatDate';
import { getFormattedTime, getComplementHours } from '../helpers/dates';
import { IoAddCircleOutline } from 'react-icons/io5';
import { closeSidemenu, openModal } from '../store/ui/uiSlice';
import { FormCommentModal } from '../components/FormCommentModal';
import { SuccessModal } from '../components/SuccessModal';
import Loading from '../components/Loading';
import { ProjectStatus } from '../components/ProjectStatus';

export const ProjectId = () => {

    const location = useLocation();

    const dispatch: any = useDispatch();
    const { user } = useSelector((state: any) => state.auth);
    const { projectById, errorNotFoundProject } = useSelector((state: any) => state.projects);
    const { commentariesByProjectID, isLoadingCommentaries, isRequestSuccess, textRequestSuccess, } = useSelector((state: any) => state.commentaries);
    const { mEmployees = [], mClients = [], isLoadingUsers, mUsers } = useSelector((state: any) => state.users);
    const { isOpenModal } = useSelector((state: any) => state.ui);

    const { formState, title, status, onInputChange, onChange } = useForm({
        title: projectById?.title,
        status: projectById?.status,
    });

    const [ projectId, setProjectId ] = useState(projectById?.businessId);
    const [ businessId, setBusinessId ] = useState(projectById?.businessId);
    const [ authorId, setAuthorId ] = useState(projectById?.authorId);
    const [ responsiblesId, setResponsiblesId ] = useState(projectById?.responsiblesId);
    const [ description, setDescription ] = useState(projectById?.description);
    const [ acceptanceCriteria, setAcceptanceCriteria ] = useState(projectById?.acceptanceCriteria);
    const [ showAcceptanceCriteria, setShowAcceptanceCriteria ] = useState<boolean>(false);

    const { formatDate } = useFormatDate();

    const selectedTags = (tags: any = []) => {
        // console.log('selectedTags: ', tags.map((tag: any) => tag._id))
        const tag = tags.map((tag: any) => tag._id)
        setResponsiblesId( tag );
        // console.log('responsiblesId: ', responsiblesId)
    }

    const selectedTagAuthorId = (tag: any = {}) => {
        console.log('selectedTagAuthorId: ', tag)
        const authorId = tag._id;
        setAuthorId( authorId );
        // console.log('authorId: ', authorId)
        
        setBusinessId( tag.businessId );
        console.log('businessId: ', businessId)
    }

    const changeVisibilityCA = () => {
        setShowAcceptanceCriteria( !showAcceptanceCriteria );
    }

    const onStatusChanged = async (event: any) => { 
        await onChange({
            name: 'status',
            value: event.target.value
        });
    };
    
    const updateStatusOnServer = () => {
        dispatch( patchStatusProject_thunk({
            projectId,
            newStatus: status,
        }) );
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();

        if( responsiblesId.length < 0 || title.length < 5 || description.length < 5 ) return;

        //TODO: Complete it
    }

    const fetchEmployee = async (role: string): Promise<any> => {
        if( mEmployees.length > 0 ) return; //TODO: Change this conditional
        await dispatch( findEmployeesByRole_thunk(role) );
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
        fetchEmployee('EMPLOYEE');
        
        // user.role === 'ADMIN' ? fetchClients('CLIENT') : null
        user.role === 'ADMIN' ? fetchAllUsers() : null
    }, []);

    useEffect(() => {
        // if( projectById !== undefined ) return;
        // console.log('location.pathname.split(): ', location.pathname.split('/')[3])
        const projectId = location.pathname.split('/')[3];

        dispatch( findProjectById_thunk( projectId ) );
    }, []);

    useEffect(() => {
        setProjectId(projectById?._id);
        setBusinessId(projectById?.businessId);
        setAuthorId(projectById?.authorId);
        setResponsiblesId(projectById?.responsiblesId);
        setDescription(projectById?.description);
        setAcceptanceCriteria(projectById?.acceptanceCriteria);
        onChange({
            name: 'title',
            value: projectById?.title,
        });
        // onChange({
        //     name: 'status',
        //     value: projectById?.status,
        // });
    }, [ projectById ]);

    useEffect(() => {
        if( !projectId ) return;
        dispatch( findAllCommentariesByProjectID_thunk(projectId) );
    }, [ projectId ]);

    if( isLoadingCommentaries ) return <Loading />

    return (
       <MainLayout>
            { isOpenModal && <FormCommentModal projectId={ projectId } /> }
            { isRequestSuccess && <SuccessModal textRequestSuccess={ textRequestSuccess } /> }

            <form className='container-form-cp' onSubmit={ onSubmit }>
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
                            onBlur={ updateStatusOnServer }
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

                {/* <input type="date" />
                <input type="date" />
                <br /> */}
                
                {
                    user.role === 'ADMIN' ? (
                        <div className='container-input-form'>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', margin: '20px 0 10px 0' }}>
                                <Chip
                                    label='Solo Admin'
                                    className='fadeIn'
                                    style={{ color: '#3483fa', backgroundColor: '#4189e626', marginRight: 10, width: 93, height: 22 }}
                                />
                                <label>Dueño del proyecto:</label>
                            </div>
                            {/* <TagsInput selectedTags={selectedTags} tags={[]} /> */}
                            <TagsInputWithAutoCompleteClients clients={mUsers} selectedTagAuthorId={selectedTagAuthorId} tag={{}} authorId={authorId} />
                        </div>
                    ) : null
                }

                <div className='container-input-form'>
                    <label>Titulo del proyecto:</label>
                    <input 
                        placeholder="Escribe un titulo para tu proyecto"
                        type="text"
                        name='title'
                        value={title}
                        onChange={ onInputChange }
                        className='input-form-cp'
                    />
                </div>

                {/* <div className='container-input-form'>
                    <label>Responsables del proyecto:</label>
                    <TagsInputWithAutoComplete employees={mEmployees} selectedTags={selectedTags} tags={projectById?.responsiblesId || []} responsiblesId={responsiblesId} />
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
                                    borderRadius: 6,
                                    cursor: 'pointer',
                                    backgroundColor: '#1259c3',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 10
                                }}
                                onClick={ handleComment }
                            >
                                Nueva actualización
                                <IoAddCircleOutline size={17} />
                            </button>
                        </div>
                        {
                            commentariesByProjectID?.length > 0 ? (
                                <div
                                    style={{ 
                                        margin: '0px 10px',
                                        // height: 200,
                                        // maxHeight: 340,
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
                                                }}>{ formatDate(commentary.createdAt) } · { getFormattedTime(commentary.createdAt) } { getComplementHours(new Date(commentary.createdAt).getHours()) }</p>
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
            </form>
       </MainLayout>
    );
}
