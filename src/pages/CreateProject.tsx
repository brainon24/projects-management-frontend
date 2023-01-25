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
import { findUsersByRole_thunk } from '../store/users/thunks';

export const CreateProject = () => {

    const { mUsers, isLoadingUsers } = useSelector((state: any) => state.users);
    const dispatch = useDispatch();

    const [description, setDescription] = useState('');
    const [acceptanceCriteria, setAcceptanceCriteria] = useState('');
    const [ showAcceptanceCriteria, setShowAcceptanceCriteria ] = useState<boolean>(false);

    const { formState, title, onInputChange, onResetForm, } = useForm({
        title: '',
    });
    
    console.log({description, acceptanceCriteria})

    const selectedTags = (tags: any) => {
        console.log('selectedTags: ', tags)
    }

    console.log('title: ', title)

    const changeVisibilityCA = () => {
        setShowAcceptanceCriteria( !showAcceptanceCriteria );
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
    }

    const fetchUsersByRole = async (): Promise<any> => {
        await dispatch( findUsersByRole_thunk('EMPLOYEE') );
    }

    useEffect(() => {
        fetchUsersByRole();
    }, []);

    // console.log('mUsers AFTER useEffect: ', mUsers)
    // console.log('isLoadingUsers AFTER useEffect: ', isLoadingUsers)

    return (
        <MainLayout>

            <form className='container-form-cp' onSubmit={ onSubmit }>
                <h1>Crear Proyecto</h1>

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
                    <TagsInputWithAutoComplete users={mUsers} selectedTags={selectedTags} tags={[]} />
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
