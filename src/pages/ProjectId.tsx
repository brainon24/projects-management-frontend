import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { findProjectById_thunk } from '../store/projects/thunks';

import '../styles/projectId.css';
import { useForm } from '../hooks/useForm';
import { findEmployeesByRole_thunk, findAllClients_thunk } from '../store/users/thunks';
import { Box, Chip, Typography } from '@mui/material';
import { TagsInputWithAutoCompleteClients } from '../components/TagsInputAutoCompleteClients';
import { TagsInputWithAutoComplete } from '../components/TagsInputWithAutoComplete';
import TextEditor from '../components/TextEditor';
import { AiOutlineZoomOut, AiOutlineZoomIn, AiOutlineExclamationCircle } from 'react-icons/ai';
import { findAllCommentariesByProjectID_thunk } from '../store/commentaries/thunks';
import { Loading100p } from '../components/Loading100p';
import useFormatDate from '../hooks/useFormatDate';
import { getFormattedTime, getComplementHours } from '../helpers/dates';
import { useCounter } from '../hooks/useCounter';

export const ProjectId = () => {

    const location = useLocation();

    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth);
    const { projectById, errorNotFoundProject } = useSelector((state: any) => state.projects);
    const { commentariesByProjectID, isLoadingCommentaries } = useSelector((state: any) => state.commentaries);
    const { mEmployees = [], mClients = [], isLoadingUsers, mUsers } = useSelector((state: any) => state.users);

    const { formState, title, onInputChange, onResetForm, } = useForm({
        title: projectById?.title,
    });

    const [ projectId, setProjectId ] = useState(projectById?.businessId);
    const [ businessId, setBusinessId ] = useState(projectById?.businessId);
    const [ authorId, setAuthorId ] = useState(projectById?.authorId);
    const [ responsiblesId, setResponsiblesId ] = useState(projectById?.responsiblesId);
    const [ description, setDescription ] = useState(projectById?.description);
    const [ acceptanceCriteria, setAcceptanceCriteria ] = useState(projectById?.acceptanceCriteria);
    const [ showAcceptanceCriteria, setShowAcceptanceCriteria ] = useState<boolean>(false);

    const commentsRef = useRef<any>(null);

    const { formatDate } = useFormatDate();
    const { counter, incrementCounter } = useCounter();

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
    }, [ projectById ]);

    useEffect(() => {
        if( !projectId ) return;
        dispatch( findAllCommentariesByProjectID_thunk(projectId, 'limit=3') );
    }, [ projectId ]);

    return (
       <MainLayout>
            <form className='container-form-cp' onSubmit={ onSubmit }>
                <h1>Detalle del Proyecto o Editar</h1>
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
                    <label>Añade una descripción:</label>
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
                            <label>Agregar criterios al proyecto:</label>
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
                    : <div
                        style={{
                            textAlign: 'left',
                            fontSize: 17,
                            fontWeight: 500,
                            color: '#000',
                            paddingTop: 20
                        }}
                    >
                        Comentarios:
                        {
                            commentariesByProjectID?.length > 0 ? (
                                <Box
                                    sx={{ 
                                        margin: '0px 10px',
                                        // height: 200,
                                        maxHeight: 200,
                                        overflow: 'scroll'
                                    }}
                                    ref={ commentsRef }
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
                                                }}>{ formatDate(commentary.createdAt) } · { getFormattedTime(commentary.createdAt) } { getComplementHours(new Date(commentary.createdAt).getHours()) }</p>
                                                <p style={{
                                                    fontWeight: 300
                                                }}>{ commentary.comment }</p>
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
                                    <Typography sx={{ textAlign: 'center', fontSize: 14, paddingBottom: 1 }}>Aún no hay comentarios en este proyecto.</Typography>
                                </Box>
                            )
                        }
                    </div>
                }
            </form>
       </MainLayout>
    );
}
