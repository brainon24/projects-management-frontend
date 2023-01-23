import { useState, useEffect } from 'react';

import './styles/tagsInput.css';

export const TagsInput = (props: any) => {

    const [ tags, setTags ] = useState(props.tags);
    // console.log(tags)

    const removeTags = (indexToRemove: any) => {
        setTags([...tags.filter((_: any, index: any) => index !== indexToRemove)]);
        props.selectedTags([tags])
    }

    const addTags = ({target}: any) => {
        if( target.value.length <= 1 ) return;

        setTags([ ...tags, target.value ]);
        props.selectedTags([ ...tags, target.value ])

        target.value = '';
    }

    useEffect(() => {
        props.selectedTags([...tags])
    }, [ tags ]);

    return (
        <div className='tags-input'>
            <ul id='tags'>
                {
                    tags.map((tag: any, index: any) => (
                        <li key={index} className='tag'>
                            <span className='tag-title'>{tag}</span>
                            <span 
                                className='tag-close-icon'
                                onClick={ () => removeTags(index) }
                            >
                                x
                            </span>
                        </li>
                    ))
                }
            </ul>

            <input 
                placeholder='Agrega los responsables del proyecto'
                type="text"
                onKeyUp={event => event.key === 'Enter' ? addTags(event) : null}
                className='form-input-tags'
            />
        </div>
    );
}
