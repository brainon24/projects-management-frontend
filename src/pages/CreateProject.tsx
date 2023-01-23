import { useState } from 'react';
import {MainLayout} from '../layouts/MainLayout';
import TextEditor from '../components/TextEditor';
import { useForm } from '../hooks/useForm';
import { TagsInput } from '../components/TagsInput';

import '../styles/createProject.css';
import { FiMaximize2 } from 'react-icons/fi';
import { VscChromeMinimize } from 'react-icons/vsc';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';

export const CreateProject = () => {

    const [description, setDescription] = useState('');
    const [acceptanceCriteria, setAcceptanceCriteria] = useState('');
    const [ showAcceptanceCriteria, setShowAcceptanceCriteria ] = useState<boolean>(false);

    const { formState, title, onInputChange, onResetForm, } = useForm({
        title: '',
    });
    
    console.log({description, acceptanceCriteria})

    const selectedTags = (tags: any) => {
        console.log(tags)
    }

    console.log('title: ', title)

    const changeVisibilityCA = () => {
        setShowAcceptanceCriteria( !showAcceptanceCriteria );
    }

    return (
        <MainLayout>

            <form className='container-form-cp'>
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
                    <TagsInput selectedTags={selectedTags} tags={[]} />
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
            </form>
        </MainLayout>
    );
}
