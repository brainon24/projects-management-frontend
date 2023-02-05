import { useState, useEffect } from 'react';
import { Link as LinkRRD, } from 'react-router-dom';
import {MainLayout} from '../layouts/MainLayout';
import { useForm } from '../hooks/useForm';
import TextEditor from '../components/TextEditor';
import { TagsInputWithAutoComplete } from '../components/TagsInputWithAutoComplete';
import { TagsInput } from '../components/TagsInput';

import '../styles/createProject.css';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { findEmployeesByRole_thunk, findClientsByRole_thunk, findAllClients_thunk } from '../store/users/thunks';
import { TagsInputWithAutoCompleteClients } from '../components/TagsInputAutoCompleteClients';
import { Chip } from '@mui/material';
import { createProject_thunk } from '../store/projects/thunks';
import ModalError from '../components/ModalError';
import { TransitionModal } from '../components/TransitionModal';

export const CreateProject = () => {

    const { user } = useSelector((state: any) => state.auth);
    const { mEmployees = [], mClients = [], isLoadingUsers, mUsers } = useSelector((state: any) => state.users);
    const { lastUpdateProject } = useSelector((state: any) => state.projects);

    const dispatch = useDispatch();

    // console.log('lastUpdateProject: ', lastUpdateProject);

    const { formState, title, onInputChange, onResetForm, } = useForm({
        title: '',
    });

    const [ businessId, setBusinessId ] = useState('');
    const [ authorId, setAuthorId ] = useState('');
    const [ responsiblesId, setResponsiblesId ] = useState([]);
    const [ description, setDescription ] = useState('');
    const [ acceptanceCriteria, setAcceptanceCriteria ] = useState('');
    const [ showAcceptanceCriteria, setShowAcceptanceCriteria ] = useState<boolean>(false);
    
    // console.log({description, acceptanceCriteria})
    // console.log('title: ', title)

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

        await dispatch( createProject_thunk({
            businessId: businessId ? businessId : user.business.businessId,
            authorId: authorId ? authorId : user._id,
            title,
            responsiblesId,
            description,
            acceptanceCriteria
        }) );
    }

    const fetchEmployee = async (role: string): Promise<any> => {
        if( mEmployees.length > 0 ) return; //TODO: Change this conditional
        await dispatch( findEmployeesByRole_thunk(role) );
    }

    const fetchClients = async (role: string): Promise<any> => {
        if( mClients.length > 0 ) return; //TODO: Change this conditional
        await dispatch( findClientsByRole_thunk(role) );
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


    return (
        <>
            {
                lastUpdateProject && lastUpdateProject.code === 'ERROR' ? (
                    <ModalError
                        title='Ocurrio un error al crear el proyecto'
                        descriptionError={ lastUpdateProject.message }
                    />
                ) : null
            }

            {
                lastUpdateProject && lastUpdateProject.code === 'SUCCESS' ? (
                    <TransitionModal title={ lastUpdateProject.message } data={ lastUpdateProject.data } />
                ) : null
            }

            <MainLayout>

                <form className='container-form-cp' onSubmit={ onSubmit }>
                    <h1>Crear Proyecto</h1>
                    {/* <input type="date" />
                    <input type="date" />
                    <br /> */}
                    
                    {
                        user.role === 'ADMIN' ? (
                            <div className='container-input-form'>
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', margin: '20px 0 10px 0' }}>
                                    <Chip
                                        label='Only Admin'
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

                    <div className='container-input-form'>
                        <label>Responsables del proyecto:</label>
                        {/* <TagsInput selectedTags={selectedTags} tags={[]} /> */}
                        <TagsInputWithAutoComplete employees={mEmployees} selectedTags={selectedTags} tags={[]} responsiblesId={responsiblesId} />
                    </div>

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

                    <div className='container-btns-cp'>
                        <LinkRRD to='/private'>
                            <button 
                                type='button'
                                className='btn-cancel-cp'
                            >
                                Cancelar
                            </button>
                        </LinkRRD>
                        <button
                            type='submit'
                            className='btn-confirm-cp'
                        >
                            Crear Proyecto
                        </button>
                    </div>
                </form>
            </MainLayout>
        </>
    );
}
