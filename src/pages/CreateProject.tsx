import { useState, useEffect } from 'react';
import { Link as LinkRRD, } from 'react-router-dom';
import {MainLayout} from '../layouts/MainLayout';
import { useForm } from '../hooks/useForm';
import TextEditor from '../components/TextEditor';
import { TagsInputWithAutoComplete } from '../components/TagsInputWithAutoComplete';

import '../styles/createProject.css';
import { useDispatch, useSelector } from 'react-redux';
import { findALLYsByRole_thunk, findAllClients_thunk } from '../store/users/thunks';
import { TagsInputWithAutoCompleteClients } from '../components/TagsInputAutoCompleteClients';
import { Chip } from '@mui/material';
import { createProject_thunk } from '../store/projects/thunks';
import ModalError from '../components/ModalError';
import { TransitionModal } from '../components/TransitionModal';
import Loading from '../components/Loading';

export const CreateProject = () => {

    const { user } = useSelector((state: any) => state.auth);
    const { mALLYs = [], mClients = [], mUsers } = useSelector((state: any) => state.users);
    const { lastUpdateProject, isLoadingProjects } = useSelector((state: any) => state.projects);

    const dispatch = useDispatch();

    const { title, onInputChange, } = useForm({
        title: '',
    });

    const [ businessId, setBusinessId ] = useState('');
    const [ authorId, setAuthorId ] = useState('');
    const [ responsiblesId, setResponsiblesId ] = useState([]);
    const [ description, setDescription ] = useState('');

    const selectedTags = (tags: any = []) => {
        const tag = tags.map((tag: any) => tag._id)
        setResponsiblesId( tag );
    }

    const selectedTagAuthorId = (tag: any = {}) => { 
        const authorId = tag._id;
        setAuthorId( authorId );
        
        setBusinessId( tag.businessId );
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
            acceptanceCriteria: '',
        }) );
    }

    const fetchALLY = async (role: string): Promise<any> => {
        if( mALLYs.length > 0 ) return;
        await dispatch( findALLYsByRole_thunk(role) );
    }

    const fetchAllUsers = async (): Promise<any> => {
        if( mClients.length > 0 ) return;
        await dispatch( findAllClients_thunk() );
    }

    useEffect(() => {
        fetchALLY('ALLY');
        
        user.role === 'ADMIN' ? fetchAllUsers() : null
    }, []);

    if( isLoadingProjects ) return <Loading />

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

                <div className='container-form-cp'>
                    <h1>Crear Proyecto</h1>
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

                    <div className='container-input-form'>
                        <label>Responsables del proyecto:</label>
                        {/* <TagsInput selectedTags={selectedTags} tags={[]} /> */}
                        <TagsInputWithAutoComplete ALLYs={mALLYs} selectedTags={selectedTags} tags={[]} responsiblesId={responsiblesId} />
                    </div>

                    <div className='container-input-form'>
                        <label>Añade una descripción:</label>
                        <TextEditor value={ description } setValue={ setDescription } /> 
                    </div>

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
                            className='btn-confirm-cp'
                            onClick={ onSubmit }
                        >
                            Crear Proyecto
                        </button>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}
