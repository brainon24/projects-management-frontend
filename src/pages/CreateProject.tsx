import { useState, useEffect } from 'react';
import { Link as LinkRRD } from 'react-router-dom';
import {MainLayout} from '../layouts/MainLayout';
import { useForm } from '../hooks/useForm';
import TextEditor from '../components/TextEditor';
import { TagsInputWithAutoComplete } from '../components/TagsInputWithAutoComplete';
import { TagsInput } from '../components/TagsInput';

import '../styles/createProject.css';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { findEmployeesByRole_thunk, findClientsByRole_thunk } from '../store/users/thunks';
import { TagsInputWithAutoCompleteClients } from '../components/TagsInputAutoCompleteClients';
import { Chip } from '@mui/material';

export const CreateProject = () => {

    const { user } = useSelector((state: any) => state.auth);
    const { mEmployees, mClients, isLoadingUsers } = useSelector((state: any) => state.users);
    const dispatch = useDispatch();

    const [ authorId, setAuthorId ] = useState('');
    const [ responsiblesId, setResponsiblesId ] = useState([]);
    const [ description, setDescription ] = useState('');
    const [ acceptanceCriteria, setAcceptanceCriteria ] = useState('');
    const [ showAcceptanceCriteria, setShowAcceptanceCriteria ] = useState<boolean>(false);

    const { formState, title, onInputChange, onResetForm, } = useForm({
        title: '',
    });
    
    // console.log({description, acceptanceCriteria})

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
        console.log('authorId: ', authorId)
    }

    // console.log('title: ', title)

    const changeVisibilityCA = () => {
        setShowAcceptanceCriteria( !showAcceptanceCriteria );
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
    }

    const fetchEmployee = async (role: string): Promise<any> => {
        await dispatch( findEmployeesByRole_thunk(role) );
    }

    const fetchClients = async (role: string): Promise<any> => {
        await dispatch( findClientsByRole_thunk(role) );
    }

    useEffect(() => {
        fetchEmployee('EMPLOYEE');
        
        user.role === 'ADMIN' ? fetchClients('CLIENT') : null
    }, []);


    return (
        <MainLayout>

            <form className='container-form-cp' onSubmit={ onSubmit }>
                <h1>Crear Proyecto</h1>

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
                            <TagsInputWithAutoCompleteClients clients={mClients} selectedTagAuthorId={selectedTagAuthorId} tag={{}} authorId={authorId} />
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
                                <label>Agregar criterios de aceptación:</label>
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
                            <label>Agregar criterios de aceptación:</label>
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
                            type='submit'
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
    );
}
