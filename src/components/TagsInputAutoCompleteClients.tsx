import { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { FiSearch } from 'react-icons/fi';

import './styles/tagsInput.css';

export const TagsInputWithAutoCompleteClients = (props: any) => {
    
    const { clients = [] } = props;

    let { formState, userInput, onInputChange, onResetForm } = useForm({
        userInput: '',
    });

    const [ focus, setFocus ] = useState<boolean>(false);
    const [ blur, setBlur ] = useState<boolean>(false);

    const [ tag, setTag ] = useState(props.tag);
    // console.log('tag: ', tag)

    // console.log('users: ', users)

    const handleOnFocus = () => {

        setBlur(false);
        setFocus(true);
    }

    const handleOnBlur = () => {
        
        setBlur(true);
    }

    const removeTag = () => {
        setTag({});
        props.selectedTagAuthorId({});
    }

    const addTagById = (user: any) => {
        // console.log('DENTRO DE ADD TAGS BY ID: ', user)
        setTag({fullName: user.fullName, _id: user._id, businessId: user.businessId} );
        props.selectedTagAuthorId({fullName: user.fullName, _id: user._id, businessId: user.businessId});

        userInput = '';
    }

    const onSubmitSearch = (event: any) => {
        event?.preventDefault();

    }

    useEffect(() => {
        props.selectedTagAuthorId(tag);
    }, [ tag ]);

    return (
        <div>
            <div className='tags-input'>
                {
                    tag.fullName && (
                        <ul id='tags'>
                            <div key={tag._id} className='tag'>
                                <span className='tag-title'>{tag.fullName}</span>
                                <span 
                                    className='tag-close-icon'
                                    onClick={ () => removeTag() }
                                >
                                    x
                                </span>
                            </div>
                        </ul>
                    )
                }


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
                        placeholder='Agrega el dueño del proyecto'
                        type="text"
                        // onKeyUp={event => event.key === 'Enter' ? addTags(event) : null}
                        className='form-input-tags'
                        name='userInput'
                        onChange={ onInputChange }
                        onFocus={(e) => handleOnFocus() }
                        autoComplete="off"
                        disabled={ tag.fullName }
                    />
                    

                    <div 
                        className={ blur === false && focus === true ? 'autocomplete' : 'autocomplete-off' }
                        // onClick={ () => console.log('click') }
                    >
                        {
                            clients && clients?.filter((user: any) => user.fullName?.toLowerCase().includes(userInput.toLowerCase())).slice(0, 5).map( (user: any) => (
                                <button 
                                    key={ user?._id } 
                                    className="autocomplete-element"
                                    onClick={ (e) => {
                                        e.preventDefault();
                                        addTagById({fullName: user.fullName, _id: user._id, businessId: user.businessId.id })
                                        handleOnBlur();
                                    } }
                                >
                                    <span style={{ color: '#cecece', paddingRight: 10, paddingTop: 3 }}><FiSearch /></span>
                                    <p className='text-autocomplete'>{user?.fullName?.length > 30 ? user?.fullName?.substring(0, 30) + '...' : user?.fullName?.substring(0, 30)}</p>
                                </button>
                            ))
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}
