import { useState } from 'react';
import {MainLayout} from '../layouts/MainLayout';
import TextEditor from '../components/TextEditor';

export const CreateProject = () => {

    const [value, setValue] = useState('')
    
    console.log(value)

    return (
        <MainLayout>
            <h1>Crear Proyecto</h1>

            <TextEditor value={ value } setValue={ setValue } />
        </MainLayout>
    );
}
