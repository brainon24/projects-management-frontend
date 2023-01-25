import { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { FiSearch } from 'react-icons/fi';

import './styles/tagsInput.css';
import { Box } from '@mui/material';

export const TagsInputWithAutoComplete = (props: any) => {
    console.log('entro al componente')
    const { users } = props;

    let { formState, userInput, onInputChange, onResetForm } = useForm({
        userInput: '',
    });

    const [ focus, setFocus ] = useState<boolean>(false);
    const [ blur, setBlur ] = useState<boolean>(false);

    const [ tags, setTags ] = useState(props.tags);
    // console.log(tags)

    console.log('users: ', users)

    const handleOnFocus = () => {

        setBlur(false);
        setFocus(true);
    }

    const handleOnBlur = () => {
        
        setBlur(true);
    }

    const removeTags = (indexToRemove: any) => {
        setTags([...tags.filter((_: any, index: any) => index !== indexToRemove)]);
        props.selectedTags([tags])
    }

    const addTags = ({target}: any) => {
        target.value.trim();
        if( target.value.length <= 1 ) return;

        setTags([ ...tags, target.value ]);
        props.selectedTags([ ...tags, target.value ]);

        target.value = '';
    }

    const addTagsById = (user: any) => {
        // console.log('DENTRO DE ADD TAGS BY ID: ', user)
        setTags([ ...tags, {fullName: user.fullName, _id: user._id} ]);
        props.selectedTags([ ...tags, {fullName: user.fullName, _id: user._id} ]);

        userInput = '';
    }

    const onSubmitSearch = (event: any) => {
        event?.preventDefault();

    }

    useEffect(() => {
        props.selectedTags([...tags]);
    }, [ tags ]);

    return (
        <div>
            <div className='tags-input'>
                <ul id='tags'>
                    {
                        tags.map((tag: any, index: any) => (
                            <li key={index} className='tag'>
                                <span className='tag-title'>{tag.fullName}</span>
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

                <form 
                    className="search-header"
                    onSubmit={ onSubmitSearch }

                    onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                            handleOnBlur();
                        }
                    }}
                >
                    <input 
                        placeholder='Agrega los responsables del proyecto'
                        type="text"
                        // onKeyUp={event => event.key === 'Enter' ? addTags(event) : null}
                        className='form-input-tags'
                        name='userInput'
                        onChange={ onInputChange }
                        onFocus={(e) => handleOnFocus() }
                        autoComplete="off"
                    />
                    
                    <div 
                        className={ blur === false && focus === true ? 'autocomplete' : 'autocomplete-off' }
                        // onClick={ () => console.log('click') }
                    >
                        {
                            users && users?.filter((user: any) => user.fullName?.toLowerCase().includes(userInput.toLowerCase())).slice(0, 5).map( (user: any) => (
                                <button 
                                    key={ user?._id } 
                                    className="autocomplete-element"
                                    onClick={ (e) => {
                                        e.preventDefault();
                                        addTagsById({fullName: user.fullName, _id: user._id})
                                    } }
                                >
                                    <span style={{ color: '#cecece', paddingRight: 10, paddingTop: 3 }}><FiSearch /></span>
                                    <p className='text-autocomplete'>{user?.fullName?.substring(0, 25) + '...'}</p>
                                </button>
                            ))
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}
