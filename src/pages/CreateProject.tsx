import { useState } from 'react';
import {MainLayout} from '../layouts/MainLayout';
import TextEditor from '../components/TextEditor';
import { useForm } from '../hooks/useForm';
import { TagsInput } from '../components/TagsInput';

export const CreateProject = () => {

    const [value, setValue] = useState('');
    // const {} = useForm({
    //     title: '',
    // });
    
    console.log(value)

    const selectedTags = (tags: any) => {
        console.log(tags)
    }

    return (
        <MainLayout>
            <h1>Crear Proyecto</h1>
            {/* <input 
                placeholder="Escribe un titulo para tu proyecto"
                type="text"
                name='title'
                value={title}
                onChange={}
            /> */}

            <TagsInput selectedTags={selectedTags} tags={[]} />

            <TextEditor value={ value } setValue={ setValue } /> 
        </MainLayout>
    );
}
